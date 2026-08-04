import React from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight } from 'lucide-react';

interface HeroSectionProps {
  onScrollToForm: () => void;
  onOpenBlueMotionModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToForm,
}) => {
  return (
    <section className="relative overflow-hidden min-h-[620px] sm:min-h-[680px] lg:min-h-[750px] flex items-center pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Background Image with soft light overlay on mobile for title legibility */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://frwfcibbvbj5zog7.public.blob.vercel-storage.com/geral/hero-1-1785260473965.webp"
          alt="Ziann Jeans Hero"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[68%_top] sm:object-[68%_top] md:object-[65%_top] lg:object-top"
        />
        {/* Soft light overlay on mobile to enhance title readability without hiding models */}
        <div className="absolute inset-0 bg-white/35 sm:bg-transparent pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl flex flex-col items-start">
          {/* Text & Button Content with left-to-right entrance animation */}
          <div className="flex flex-col items-start">
            {/* Headline Principal */}
            <motion.h1 
              id="hero-headline" 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-black text-black uppercase leading-[1.12] tracking-tight mb-8"
            >
              LEVE A <span className="italic">ZIANN</span><br />
              PARA SUA<br />
              MULTIMARCAS
            </motion.h1>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.3, delay: 0.22, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                id="btn-quero-ziann"
                onClick={onScrollToForm}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-extrabold tracking-wider text-white uppercase transition-all duration-300 rounded-none bg-black hover:bg-neutral-800 shadow-none border-none active:scale-95 cursor-pointer text-center"
              >
                <span>QUERO AUMENTAR A LUCRATIVIDADE DA MINHA LOJA</span>
                <ArrowDownRight className="w-4 h-4 ml-2 text-white" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};


