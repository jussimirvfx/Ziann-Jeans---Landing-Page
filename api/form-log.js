export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method-not-allowed' });
  }

  let body = req.body || {};
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body || '{}');
    } catch {
      body = {};
    }
  }

  const logPayload = {
    level: 'info',
    msg: 'landing_form_backup',
    event: 'form-submit',
    project: process.env.VERCEL_PROJECT_NAME || 'ziann',
    route: '/api/form-log',
    dry_run: Boolean(body.dry_run || body.dryRun || body.__dry_run || body.vfx_dry_run),
    received_at: new Date().toISOString(),
    vercel_deployment: process.env.VERCEL_URL || null,
    user_agent: req.headers?.['user-agent'] || null,
    forwarded_for: req.headers?.['x-forwarded-for'] || null,
    payload_size: JSON.stringify(body).length,
    payload: body,
  };

  console.info(JSON.stringify(logPayload));
  return res.status(200).json({ ok: true });
}
