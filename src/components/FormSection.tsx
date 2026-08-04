import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Sparkles, Send } from 'lucide-react';

export const FormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    nomeFantasia: '',
    whatsapp: '',
    emailCorporativo: '',
    cnpj: '',
    instagram: '',
    cidadeEstado: '',
    tempoCnpj: '',
    tipoLoja: '',
    possuiLojaFisica: '',
    principaisMarcas: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Fast, fluid transmission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <section id="formulario-captura" className="py-20 bg-black relative overflow-hidden">
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
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* 1. Nome Completo do Proprietário / Comprador */}
                  <div className="sm:col-span-2">
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
                      className="w-full px-4 py-3 rounded-none bg-white border-0 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm shadow-sm"
                    />
                  </div>

                  {/* 2. Nome Fantasia da Loja */}
                  <div>
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
                      className="w-full px-4 py-3 rounded-none bg-white border-0 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm shadow-sm"
                    />
                  </div>

                  {/* 3. WhatsApp da Loja (com DDD) */}
                  <div>
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
                      className="w-full px-4 py-3 rounded-none bg-white border-0 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm shadow-sm"
                    />
                  </div>

                  {/* 4. E-mail Corporativo */}
                  <div>
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
                      className="w-full px-4 py-3 rounded-none bg-white border-0 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm shadow-sm"
                    />
                  </div>

                  {/* 5. CNPJ da Loja */}
                  <div>
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
                      className="w-full px-4 py-3 rounded-none bg-white border-0 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm shadow-sm"
                    />
                  </div>

                  {/* 6. @ Instagram da Loja */}
                  <div>
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
                      className="w-full px-4 py-3 rounded-none bg-white border-0 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm shadow-sm"
                    />
                  </div>

                  {/* 7. Cidade / Estado */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                      Cidade / Estado
                    </label>
                    <input
                      type="text"
                      name="cidadeEstado"
                      required
                      value={formData.cidadeEstado}
                      onChange={handleChange}
                      placeholder="Ex: São Paulo / SP"
                      className="w-full px-4 py-3 rounded-none bg-white border-0 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm shadow-sm"
                    />
                  </div>

                  {/* 8. Tempo de CNPJ */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                      Tempo de CNPJ
                    </label>
                    <select
                      name="tempoCnpj"
                      required
                      value={formData.tempoCnpj}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-none bg-white border-0 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm shadow-sm"
                    >
                      <option value="" disabled>Selecione o tempo</option>
                      <option value="De 1 a 2 anos">De 1 a 2 anos</option>
                      <option value="De 2 a 5 anos">De 2 a 5 anos</option>
                      <option value="Mais de 5 anos">Mais de 5 anos</option>
                    </select>
                  </div>

                  {/* 9. Tipo de Loja */}
                  <div>
                    <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                      Tipo de Loja
                    </label>
                    <select
                      name="tipoLoja"
                      required
                      value={formData.tipoLoja}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-none bg-white border-0 text-neutral-900 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm shadow-sm"
                    >
                      <option value="" disabled>Selecione o tipo de loja</option>
                      <option value="Multimarcas">Multimarcas</option>
                      <option value="Loja de Shopping">Loja de Shopping</option>
                      <option value="Magazine">Magazine</option>
                      <option value="Loja Online">Loja Online</option>
                    </select>
                  </div>

                  {/* 10. Possui Loja Física? */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                      Possui Loja Física?
                    </label>
                    <div className="flex gap-6 items-center pt-1">
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
                  </div>

                  {/* 11. Principais marcas que sua loja revende atualmente */}
                  <div className="sm:col-span-2">
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
                      className="w-full px-4 py-3 rounded-none bg-white border-0 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-black transition-all text-sm resize-none shadow-sm"
                    />
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
                  <p className="text-neutral-800 text-sm max-w-lg mx-auto leading-relaxed font-sans">
                    Recebemos os dados de <strong className="text-black font-bold">{formData.nomeFantasia}</strong> ({formData.cidadeEstado}). Nossa equipe B2B verificará a disponibilidade de praça e enviará o catálogo da <strong className="text-black font-bold">Coleção Blue Motion</strong> diretamente para o seu WhatsApp e e-mail corporativo.
                  </p>
                </div>

                <div className="bg-white/80 p-4 rounded-none border border-black/10 max-w-md mx-auto text-left text-xs text-neutral-800 space-y-1.5 shadow-sm font-sans">
                  <div><strong className="text-black">Responsável:</strong> {formData.nomeCompleto}</div>
                  <div><strong className="text-black">WhatsApp:</strong> {formData.whatsapp}</div>
                  <div><strong className="text-black">E-mail:</strong> {formData.emailCorporativo}</div>
                  <div><strong className="text-black">CNPJ:</strong> {formData.cnpj}</div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white uppercase tracking-wider bg-black hover:bg-neutral-900 rounded-none transition-all cursor-pointer shadow-md active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>Enviar outro cadastro</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>

      </div>
    </section>
  );
};
