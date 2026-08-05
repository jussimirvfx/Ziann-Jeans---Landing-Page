const META_GRAPH_VERSION = 'v23.0';
const ROUTE = '/api/meta/conversions';

const getHeader = (req, name) => {
  const headers = req.headers || {};
  return headers[name] || headers[name.toLowerCase()] || null;
};

const parseBody = (req) => {
  if (!req.body) return {};
  if (typeof req.body !== 'string') return req.body;

  try {
    return JSON.parse(req.body || '{}');
  } catch {
    return {};
  }
};

const isTruthyFlag = (value) =>
  value === true || value === 1 || value === '1' || String(value).toLowerCase() === 'true';

const isDryRunRequest = (req, body) =>
  isTruthyFlag(getHeader(req, 'x-vfx-dry-run')) ||
  isTruthyFlag(body.dry_run) ||
  isTruthyFlag(body.dryRun) ||
  isTruthyFlag(body.vfx_dry_run) ||
  isTruthyFlag(body.skip_webhook);

const getClientIp = (req) => {
  const forwardedFor = getHeader(req, 'x-forwarded-for');
  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim();
  }

  return (
    getHeader(req, 'x-real-ip') ||
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress ||
    null
  );
};

const cleanUserData = (userData = {}, req) => {
  const nextUserData = { ...userData };
  const clientIp = getClientIp(req);
  const userAgent = getHeader(req, 'user-agent');

  if (String(nextUserData.client_ip_address || '').startsWith('SER')) {
    delete nextUserData.client_ip_address;
  }

  if (!nextUserData.client_ip_address && clientIp) {
    nextUserData.client_ip_address = clientIp;
  }

  if (!nextUserData.client_user_agent && userAgent) {
    nextUserData.client_user_agent = userAgent;
  }

  return nextUserData;
};

const buildPreparedMetaPayload = (req, body) => {
  const eventName = body.event_name || null;
  const eventId = body.event_id || null;
  const pixelId = process.env.META_PIXEL_ID || process.env.VITE_META_PIXEL_ID;
  const testEventCode = process.env.META_TEST_EVENT_CODE || process.env.VITE_META_TEST_EVENT_CODE;

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: body.event_time || Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: body.event_source_url || getHeader(req, 'referer') || null,
        action_source: body.action_source || 'website',
        user_data: cleanUserData(body.user_data || {}, req),
        custom_data: body.custom_data || {},
      },
    ],
  };

  if (testEventCode) {
    payload.test_event_code = testEventCode;
  }

  return { payload, pixelId, eventName, eventId };
};

const getUserDataPresence = (userData = {}) => ({
  has_email: Boolean(userData.em),
  has_phone: Boolean(userData.ph),
  has_name: Boolean(userData.fn || userData.ln),
  has_location: Boolean(userData.ct || userData.st || userData.zp || userData.country),
  has_fbp: Boolean(userData.fbp),
  has_fbc: Boolean(userData.fbc),
  has_client_ip: Boolean(userData.client_ip_address),
  has_user_agent: Boolean(userData.client_user_agent),
});

const logConversionEventBackup = ({ req, body, preparedMetaPayload, eventName, eventId, dryRun }) => {
  const preparedEvent = preparedMetaPayload?.data?.[0] || {};

  console.info(JSON.stringify({
    level: 'info',
    msg: 'conversion_api_event_backup',
    event: 'conversion_api_event_backup',
    project: process.env.VERCEL_PROJECT_NAME || 'ziann',
    route: ROUTE,
    received_at: new Date().toISOString(),
    request_id: getHeader(req, 'x-vercel-id') || getHeader(req, 'x-request-id') || null,
    dry_run: dryRun,
    event_name: eventName || body.event_name || null,
    event_id: eventId || body.event_id || null,
    custom_data: body.custom_data || null,
    user_data_presence: getUserDataPresence(preparedEvent.user_data),
  }));
};

const logConversionEventError = ({
  req,
  msg,
  eventName,
  eventId,
  requestPayload,
  preparedMetaPayload,
  metaStatus,
  metaError,
  error,
}) => {
  console.error(JSON.stringify({
    level: 'error',
    msg,
    event: 'conversion_api_event_error',
    project: process.env.VERCEL_PROJECT_NAME || 'ziann',
    route: ROUTE,
    received_at: new Date().toISOString(),
    request_id: getHeader(req, 'x-vercel-id') || getHeader(req, 'x-request-id') || null,
    event_name: eventName || requestPayload?.event_name || null,
    event_id: eventId || requestPayload?.event_id || null,
    meta_status: metaStatus || null,
    meta_error: metaError || null,
    error_message: error?.message || null,
    request_payload: requestPayload || null,
    prepared_meta_payload: preparedMetaPayload || null,
  }));
};

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method-not-allowed' });
  }

  const body = parseBody(req);
  const dryRun = isDryRunRequest(req, body);
  const { payload: preparedMetaPayload, pixelId, eventName, eventId } = buildPreparedMetaPayload(req, body);

  logConversionEventBackup({
    req,
    body,
    preparedMetaPayload,
    eventName,
    eventId,
    dryRun,
  });

  if (dryRun) {
    return res.status(200).json({
      ok: true,
      dry_run: true,
      skipped_meta: true,
      event_name: eventName,
      event_id: eventId,
    });
  }

  const accessToken = process.env.META_API_ACCESS_TOKEN || process.env.VITE_META_API_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    logConversionEventError({
      req,
      msg: 'conversion_api_missing_meta_config',
      eventName,
      eventId,
      requestPayload: body,
      preparedMetaPayload,
    });

    return res.status(202).json({
      ok: false,
      accepted: true,
      skipped_meta: true,
      error: 'missing-meta-config',
    });
  }

  try {
    const metaResponse = await fetch(
      `https://graph.facebook.com/${META_GRAPH_VERSION}/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preparedMetaPayload),
      },
    );

    const responseText = await metaResponse.text();
    let responseBody = null;

    try {
      responseBody = responseText ? JSON.parse(responseText) : null;
    } catch {
      responseBody = responseText;
    }

    if (!metaResponse.ok) {
      logConversionEventError({
        req,
        msg: 'conversion_api_meta_error',
        eventName,
        eventId,
        requestPayload: body,
        preparedMetaPayload,
        metaStatus: metaResponse.status,
        metaError: responseBody,
      });

      return res.status(202).json({
        ok: false,
        accepted: true,
        meta_status: metaResponse.status,
        meta_response: responseBody,
      });
    }

    return res.status(200).json({
      ok: true,
      accepted: true,
      event_name: eventName,
      event_id: eventId,
      meta_response: responseBody,
      clientIP: preparedMetaPayload.data[0].user_data.client_ip_address || null,
    });
  } catch (error) {
    logConversionEventError({
      req,
      msg: 'conversion_api_internal_error',
      eventName,
      eventId,
      requestPayload: body,
      preparedMetaPayload,
      error,
    });

    return res.status(202).json({
      ok: false,
      accepted: true,
      error: 'conversion-api-internal-error',
    });
  }
}
