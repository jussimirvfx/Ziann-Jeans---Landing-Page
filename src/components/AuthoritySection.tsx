import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface AuthoritySectionProps {
  onScrollToForm: () => void;
}

export const AuthoritySection: React.FC<AuthoritySectionProps> = ({ onScrollToForm }) => {
  return (
    <section id="autoridade" className="py-10 sm:py-12 lg:py-16 bg-black text-white relative overflow-visible z-20 border-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-visible z-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-8 lg:gap-12 items-center relative overflow-visible z-20">
          
          {/* Visual Column - Large Image Frame starting at screen left edge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative z-20 min-h-[260px] sm:min-h-[420px] lg:min-h-[460px] -ml-4 sm:-ml-6 lg:-ml-[calc((100vw-100%)/2+2rem)] xl:-ml-[calc((100vw-1280px)/2+2rem)]"
          >
            <div className="w-full h-[calc(100%+30px)] sm:h-[calc(100%+60px)] min-h-[260px] sm:min-h-[340px] lg:min-h-[480px] -mt-[30px] sm:-mt-[60px] lg:-mt-[80px] shadow-2xl relative overflow-hidden">
              <img
                src="https://frwfcibbvbj5zog7.public.blob.vercel-storage.com/geral/prancheta-1-copiar-1785325637836.webp"
                alt="Uma Marca Consolidada Ziann Jeans"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </motion.div>

          {/* Text & Right Column Content - Vertically Centered & Positioned Closer on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-center items-start pt-0 sm:pt-2 mt-1 sm:mt-0"
          >
            {/* Title on Right Column in Arial Bold */}
            <h2 
              id="authority-title" 
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-tight uppercase leading-[1.12] mb-4 sm:mb-5 font-sans"
              style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700 }}
            >
              UMA MARCA<br />
              CONSOLIDADA PARA<br />
              O SUCESSO DA<br />
              SUA MULTIMARCAS
            </h2>

            {/* Copy Paragraph Off-white */}
            <p className="text-[#EAE4DC] text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8 font-normal">
              Com mais de 25 anos de experiência no mercado de atacado B2B, a Ziann Jeans nasce da paixão por transformar movimento e comportamento em moda contemporânea que vende. Entendemos a fundo os desafios do chão de loja e desenvolvemos um jeanswear autoral, versátil e de alta aceitação do consumidor final.
            </p>

            {/* Off-white CTA Button (Without yellow emoji) */}
            <button
              id="btn-authority-cta"
              onClick={onScrollToForm}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-extrabold tracking-wider text-[#111111] uppercase transition-all duration-300 rounded-none bg-[#F7F3EE] hover:bg-white border-none shadow-none active:scale-95 cursor-pointer text-center"
            >
              <span>QUERO SER UM LOJISTA PARCEIRO ZIANN</span>
              <ArrowRight className="w-4 h-4 ml-2 text-[#111111]" />
            </button>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
