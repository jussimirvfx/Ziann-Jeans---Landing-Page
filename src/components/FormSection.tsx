import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Send } from 'lucide-react';
import { useMetaPixel } from '@jussimirvfx/meta-pixel-tracking';
import {
  BRAZILIAN_STATES,
  CNPJ_TIME_OPTIONS,
  STORE_TYPE_OPTIONS,
  calculateLeadScoreDetails,
  cnpjMask,
  converterParaE164,
  getCnpjTimeLabel,
  getStateLabel,
  getStoreTypeLabel,
  phoneMask,
  type LeadFormData,
  validarCnpjCompleto,
  validarEmail,
  validarTelefoneCompleto,
} from '../leadScoring';

const WEBHOOK_URL = import.meta.env.VITE_FORM_WEBHOOK_URL || '';
const WEBHOOK_TOKEN = import.meta.env.VITE_WEBHOOK_TOKEN || '';

const FIELD_ORDER: (keyof LeadFormData)[] = [
  'nomeCompleto',
  'nomeFantasia',
  'whatsapp',
  'emailCorporativo',
  'cnpj',
  'instagram',
  'cidade',
  'estado',
  'tempoCnpj',
  'tipoLoja',
  'possuiLojaFisica',
  'principaisMarcas',
];

const FIELD_LABELS: Record<keyof LeadFormData, string> = {
  nomeCompleto: 'Nome completo',
  nomeFantasia: 'Nome fantasia da loja',
  whatsapp: 'WhatsApp da loja',
  emailCorporativo: 'E-mail corporativo',
  cnpj: 'CNPJ da loja',
  instagram: 'Instagram da loja',
  cidade: 'Cidade',
  estado: 'Estado',
  tempoCnpj: 'Tempo de CNPJ',
  tipoLoja: 'Tipo de loja',
  possuiLojaFisica: 'Loja fisica',
  principaisMarcas: 'Principais marcas',
};

type FormErrors = Partial<Record<keyof LeadFormData, string>>;

const registrarEnvioFormularioNoVercel = async (
  payload: unknown,
  context: Record<string, unknown> = {},
) => {
  try {
    await fetch('/api/form-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'form-submit',
        pageUrl: window.location.href,
        loggedAt: new Date().toISOString(),
        context,
        payload,
      }),
    });
  } catch (error) {
    console.warn('Falha ao registrar backup do formulario na Vercel:', error);
  }
};

const enviarParaWebhook = async (payload: unknown) => {
  if (!WEBHOOK_URL) {
    console.warn('VITE_FORM_WEBHOOK_URL nao configurada; payload ficou registrado apenas no backup local.');
    return;
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (WEBHOOK_TOKEN) {
    headers.Authorization = `Bearer ${WEBHOOK_TOKEN}`;
  }

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook error: ${response.status}`);
  }
};

export const FormSection: React.FC = () => {
  const { trackLead, trackLeadQualificado } = useMetaPixel();
  const [formData, setFormData] = useState<LeadFormData>({
    nomeCompleto: '',
    nomeFantasia: '',
    whatsapp: '',
    emailCorporativo: '',
    cnpj: '',
    instagram: '',
    cidade: '',
    estado: '',
    tempoCnpj: '',
    tipoLoja: '',
    possuiLojaFisica: '',
    principaisMarcas: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof LeadFormData;
    const maskedValue =
      fieldName === 'whatsapp' ? phoneMask(value) : fieldName === 'cnpj' ? cnpjMask(value) : value;

    setFormData((prev) => ({ ...prev, [fieldName]: maskedValue }));
    setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    FIELD_ORDER.forEach((field) => {
      if (!formData[field].trim()) {
        nextErrors[field] = `${FIELD_LABELS[field]} e obrigatorio.`;
      }
    });

    if (formData.nomeCompleto.trim() && formData.nomeCompleto.trim().split(/\s+/).length < 2) {
      nextErrors.nomeCompleto = 'Informe nome e sobrenome.';
    }

    if (formData.emailCorporativo.trim() && !validarEmail(formData.emailCorporativo)) {
      nextErrors.emailCorporativo = 'Informe um e-mail valido.';
    }

    if (formData.whatsapp.trim()) {
      const phoneValidation = validarTelefoneCompleto(formData.whatsapp);
      if (!phoneValidation.valido) {
        nextErrors.whatsapp = phoneValidation.erro;
      }
    }

    if (formData.cnpj.trim() && !validarCnpjCompleto(formData.cnpj)) {
      nextErrors.cnpj = 'Informe um CNPJ com 14 digitos no formato 00.000.000/0000-00.';
    }

    return nextErrors;
  };

  const focusFirstError = (nextErrors: FormErrors) => {
    const firstInvalidField = FIELD_ORDER.find((field) => nextErrors[field]);
    if (!firstInvalidField) return;

    window.setTimeout(() => {
      const wrapper = document.getElementById(`field-${firstInvalidField}`);
      const control = wrapper?.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
        'input, select, textarea',
      );

      wrapper?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      control?.focus({ preventScroll: true });
    }, 50);
  };

  const buildPayload = () => {
    const scoreDetails = calculateLeadScoreDetails(formData);
    const timestamp = new Date().toISOString();

    return {
      name: formData.nomeCompleto.trim(),
      nome: formData.nomeCompleto.trim(),
      store_name: formData.nomeFantasia.trim(),
      nome_fantasia: formData.nomeFantasia.trim(),
      email: formData.emailCorporativo.trim(),
      email_corporativo: formData.emailCorporativo.trim(),
      phone: converterParaE164(formData.whatsapp),
      whatsapp: formData.whatsapp,
      cnpj: formData.cnpj,
      instagram: formData.instagram.trim(),
      city: formData.cidade.trim(),
      cidade: formData.cidade.trim(),
      state: formData.estado,
      estado: formData.estado,
      estado_nome: getStateLabel(formData.estado),
      city_state: `${formData.cidade.trim()} / ${formData.estado}`,
      cidade_estado: `${formData.cidade.trim()} / ${formData.estado}`,
      tempo_cnpj: getCnpjTimeLabel(formData.tempoCnpj),
      tempo_cnpj_value: formData.tempoCnpj,
      tipo_loja: getStoreTypeLabel(formData.tipoLoja),
      tipo_loja_value: formData.tipoLoja,
      possui_loja_fisica: formData.possuiLojaFisica,
      principais_marcas: formData.principaisMarcas.trim(),
      value: scoreDetails.value,
      currency: 'BRL',
      content_name: 'Formulario de Contato Ziann',
      content_category: 'Lead Generation',
      lead_score: scoreDetails.score,
      lead_score_details: scoreDetails.score_breakdown,
      lead_score_config_version: scoreDetails.lead_score_config_version,
      qualified: scoreDetails.qualified,
      qualification_status: scoreDetails.qualification_status,
      qualification_threshold: scoreDetails.qualification_threshold,
      disqualification_reasons: scoreDetails.disqualification_reasons,
      score_summary: {
        total: scoreDetails.score,
        value: scoreDetails.value,
        qualified: scoreDetails.qualified,
        status: scoreDetails.qualification_status,
        reasons: scoreDetails.disqualification_reasons,
      },
      timestamp,
      source: 'landing-page',
      user_agent: navigator.userAgent,
      page_url: window.location.href,
      referrer: document.referrer || 'direct',
    };
  };

  const logLeadScoreNoConsole = (payload: ReturnType<typeof buildPayload>) => {
    console.groupCollapsed('[Ziann] Lead score calculado');
    console.info('Nota final:', payload.lead_score);
    console.info('Value enviado:', payload.value);
    console.info('Status:', payload.qualification_status);
    console.info('Qualificado:', payload.qualified ? 'Sim' : 'Nao');
    console.info('Motivos de desqualificacao:', payload.disqualification_reasons.length ? payload.disqualification_reasons : 'Nenhum');
    console.table(payload.lead_score_details);
    console.info('Payload completo:', payload);
    console.groupEnd();
  };

  const enviarEventosMetaPixel = async (payload: ReturnType<typeof buildPayload>) => {
    try {
      await trackLead(payload);

      if (payload.qualified) {
        await trackLeadQualificado({
          ...payload,
          value: 100,
          event_type: 'LeadQualificado',
          content_name: 'Lead Qualificado Ziann',
        });
      }
    } catch (error) {
      console.warn('Falha ao enviar eventos para Meta Pixel:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors);
      return;
    }

    setIsSubmitting(true);

    const payload = buildPayload();
    logLeadScoreNoConsole(payload);

    await registrarEnvioFormularioNoVercel(payload, {
      webhookUrl: WEBHOOK_URL || null,
      leadScore: payload.lead_score,
      qualified: payload.qualified,
      qualificationStatus: payload.qualification_status,
    });

    await enviarEventosMetaPixel(payload);

    try {
      await enviarParaWebhook(payload);
    } catch (error) {
      console.error('Erro ao enviar para webhook:', error);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const fieldClassName = (field: keyof LeadFormData, baseClassName: string) =>
    `${baseClassName} ${errors[field] ? 'ring-2 ring-red-700 focus:ring-red-700' : ''}`;

  const fieldErrorProps = (field: keyof LeadFormData) => ({
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? `error-${field}` : undefined,
  });

  const renderFieldError = (field: keyof LeadFormData) =>
    errors[field] ? (
      <p id={`error-${field}`} className="mt-2 text-xs font-bold text-red-800" role="alert">
        {errors[field]}
      </p>
    ) : null;

  return (
    <section id="cta-form" className="py-20 bg-black relative overflow-hidden">
      <span id="formulario-captura" className="absolute top-0" aria-hidden="true" />
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://frwfcibbvbj5zog7.public.blob.vercel-storage.com/geral/form-1785266046683.webp"
          alt="Background Formulário Ziann"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 id="form-title" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black tracking-tight uppercase mb-4 leading-tight">
            LEVE ZIANN JEANS<br />PARA A SUA LOJA
          </h2>
          <p id="form-instruction" className="text-black text-sm sm:text-base leading-relaxed font-semibold">
            Preencha seus dados no formulário abaixo para verificar a disponibilidade da sua região e receber o catálogo da Coleção Blue Motion.
          </p>
        </motion.div>

        {/* Main Card - Semi-transparent with blur, no border, no shadow */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-none bg-white/45 backdrop-blur-md p-6 sm:p-10 text-neutral-900"
        >
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form-fields"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15, scale: 0.98, filter: 'blur(4px)' }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* 1. Nome Completo do Proprietário / Comprador */}
                  <div id="field-nomeCompleto" className="sm:col-span-2">
                    <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                      Nome Completo do Proprietário / Comprador
                    </label>
                    <input
                      type="text"
                      name="nomeCompleto"
                      required
                      value={formData.nomeCompleto}
                      onChange={handleChange}
                      placeholder="Ex: Roberto Silva"
                      className={fieldClassName('nomeCompleto', 'w-full px-4 py-3 rounded-none bg-white border-0 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm shadow-sm')}
                      {...fieldErrorProps('nomeCompleto')}
                    />
                    {renderFieldError('nomeCompleto')}
                  </div>

                  {/* 2. Nome Fantasia da Loja */}
                  <div id="field-nomeFantasia">
                    <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                      Nome Fantasia da Loja
                    </label>
                    <input
                      type="text"
                      name="nomeFantasia"
                      required
                      value={formData.nomeFantasia}
                      onChange={handleChange}
                      placeholder="Ex: Boutique Elegance"
                      className={fieldClassName('nomeFantasia', 'w-full px-4 py-3 rounded-none bg-white border-0 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm shadow-sm')}
                      {...fieldErrorProps('nomeFantasia')}
                    />
                    {renderFieldError('nomeFantasia')}
                  </div>

                  {/* 3. WhatsApp da Loja (com DDD) */}
                  <div id="field-whatsapp">
                    <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                      WhatsApp da Loja (com DDD)
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      required
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="Ex: (11) 99999-8888"
                      inputMode="numeric"
                      maxLength={15}
                      className={fieldClassName('whatsapp', 'w-full px-4 py-3 rounded-none bg-white border-0 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm shadow-sm')}
                      {...fieldErrorProps('whatsapp')}
                    />
                    {renderFieldError('whatsapp')}
                  </div>

                  {/* 4. E-mail Corporativo */}
                  <div id="field-emailCorporativo">
                    <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                      E-mail Corporativo
                    </label>
                    <input
                      type="email"
                      name="emailCorporativo"
                      required
                      value={formData.emailCorporativo}
                      onChange={handleChange}
                      placeholder="comercial@sualoja.com.br"
                      className={fieldClassName('emailCorporativo', 'w-full px-4 py-3 rounded-none bg-white border-0 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm shadow-sm')}
                      {...fieldErrorProps('emailCorporativo')}
                    />
                    {renderFieldError('emailCorporativo')}
                  </div>

                  {/* 5. CNPJ da Loja */}
                  <div id="field-cnpj">
                    <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                      CNPJ da Loja
                    </label>
                    <input
                      type="text"
                      name="cnpj"
                      required
                      value={formData.cnpj}
                      onChange={handleChange}
                      placeholder="00.000.000/0001-00"
                      inputMode="numeric"
                      maxLength={18}
                      className={fieldClassName('cnpj', 'w-full px-4 py-3 rounded-none bg-white border-0 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm shadow-sm')}
                      {...fieldErrorProps('cnpj')}
                    />
                    {renderFieldError('cnpj')}
                  </div>

                  {/* 6. @ Instagram da Loja */}
                  <div id="field-instagram">
                    <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                      @ Instagram da Loja
                    </label>
                    <input
                      type="text"
                      name="instagram"
                      required
                      value={formData.instagram}
                      onChange={handleChange}
                      placeholder="@sualoja.oficial"
                      className={fieldClassName('instagram', 'w-full px-4 py-3 rounded-none bg-white border-0 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm shadow-sm')}
                      {...fieldErrorProps('instagram')}
                    />
                    {renderFieldError('instagram')}
                  </div>

                  {/* 7. Cidade */}
                  <div id="field-cidade">
                    <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                      Cidade
                    </label>
                    <input
                      type="text"
                      name="cidade"
                      required
                      value={formData.cidade}
                      onChange={handleChange}
                      placeholder="Ex: Sao Paulo"
                      className={fieldClassName('cidade', 'w-full px-4 py-3 rounded-none bg-white border-0 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm shadow-sm')}
                      {...fieldErrorProps('cidade')}
                    />
                    {renderFieldError('cidade')}
                  </div>

                  {/* 8. Estado */}
                  <div id="field-estado">
                    <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                      Estado
                    </label>
                    <select
                      name="estado"
                      required
                      value={formData.estado}
                      onChange={handleChange}
                      className={fieldClassName('estado', 'w-full px-4 py-3 rounded-none bg-white border-0 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm shadow-sm')}
                      {...fieldErrorProps('estado')}
                    >
                      <option value="" disabled>Selecione</option>
                      {BRAZILIAN_STATES.map((state) => (
                        <option key={state.value} value={state.value}>
                          {state.label}
                        </option>
                      ))}
                    </select>
                    {renderFieldError('estado')}
                  </div>

                  {/* 8. Tempo de CNPJ */}
                  <div id="field-tempoCnpj">
                    <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                      Tempo de CNPJ
                    </label>
                    <select
                      name="tempoCnpj"
                      required
                      value={formData.tempoCnpj}
                      onChange={handleChange}
                      className={fieldClassName('tempoCnpj', 'w-full px-4 py-3 rounded-none bg-white border-0 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm shadow-sm')}
                      {...fieldErrorProps('tempoCnpj')}
                    >
                      <option value="" disabled>Selecione</option>
                      {CNPJ_TIME_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {renderFieldError('tempoCnpj')}
                  </div>

                  {/* 9. Tipo de Loja */}
                  <div id="field-tipoLoja">
                    <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                      Tipo de Loja
                    </label>
                    <select
                      name="tipoLoja"
                      required
                      value={formData.tipoLoja}
                      onChange={handleChange}
                      className={fieldClassName('tipoLoja', 'w-full px-4 py-3 rounded-none bg-white border-0 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm shadow-sm')}
                      {...fieldErrorProps('tipoLoja')}
                    >
                      <option value="" disabled>Selecione</option>
                      {STORE_TYPE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {renderFieldError('tipoLoja')}
                  </div>

                  {/* 10. Possui Loja Física? */}
                  <div id="field-possuiLojaFisica" className="sm:col-span-2">
                    <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                      Possui Loja Física?
                    </label>
                    <div
                      className="flex gap-6 items-center pt-1"
                      role="radiogroup"
                      {...fieldErrorProps('possuiLojaFisica')}
                    >
                      <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-neutral-900">
                        <input
                          type="radio"
                          name="possuiLojaFisica"
                          value="Sim"
                          required
                          checked={formData.possuiLojaFisica === 'Sim'}
                          onChange={handleChange}
                          className="w-4 h-4 text-black focus:ring-black bg-white border-0 accent-black"
                        />
                        <span>Sim</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-neutral-900">
                        <input
                          type="radio"
                          name="possuiLojaFisica"
                          value="Não"
                          required
                          checked={formData.possuiLojaFisica === 'Não'}
                          onChange={handleChange}
                          className="w-4 h-4 text-black focus:ring-black bg-white border-0 accent-black"
                        />
                        <span>Não</span>
                      </label>
                    </div>
                    {renderFieldError('possuiLojaFisica')}
                  </div>

                  {/* 11. Principais marcas que sua loja revende atualmente */}
                  <div id="field-principaisMarcas" className="sm:col-span-2">
                    <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                      Principais marcas que sua loja revende atualmente
                    </label>
                    <textarea
                      name="principaisMarcas"
                      required
                      rows={3}
                      value={formData.principaisMarcas}
                      onChange={handleChange}
                      placeholder="Ex: Marca A, Marca B, Marca C..."
                      className={fieldClassName('principaisMarcas', 'w-full px-4 py-3 rounded-none bg-white border-0 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm resize-none shadow-sm')}
                      {...fieldErrorProps('principaisMarcas')}
                    />
                    {renderFieldError('principaisMarcas')}
                  </div>

                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    id="btn-submit-form"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center px-8 py-5 text-sm sm:text-base font-extrabold tracking-wider text-white uppercase transition-all duration-300 rounded-none bg-black hover:bg-neutral-900 shadow-xl border border-black active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2 text-white">
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>VERIFICANDO DISPONIBILIDADE...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2 text-white">
                        <Send className="w-5 h-5 text-white" />
                        <span>VERIFICAR DISPONIBILIDADE E ENVIAR CADASTRO</span>
                      </span>
                    )}
                  </button>
                </div>

              </motion.form>
            ) : (
              <motion.div
                key="form-success"
                initial={{ opacity: 0, y: 20, scale: 0.96, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22, mass: 0.8 }}
                className="text-center py-8 space-y-6"
              >
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 18, delay: 0.1 }}
                  className="w-20 h-20 bg-black text-white rounded-none flex items-center justify-center mx-auto shadow-xl relative"
                >
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5] text-white" />
                </motion.div>

                <div>
                  <h3 className="text-2xl font-black text-neutral-900 mb-2 uppercase tracking-tight font-sans">
                    Cadastro Enviado com Sucesso!
                  </h3>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>

      </div>
    </section>
  );
};
