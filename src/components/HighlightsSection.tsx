import React from 'react';
import { motion } from 'motion/react';
import { Award, Target, Layers } from 'lucide-react';

export const HighlightsSection: React.FC = () => {
  const highlights = [
    {
      icon: Award,
      text: '+25 ANOS DE MERCADO B2B DE MODA',
    },
    {
      icon: Target,
      text: '100% FOCO NO ATACADO E LOJISTA MULTIMARCAS',
    },
    {
      icon: Layers,
      text: '3 COLEÇÕES AUTORAIS LANÇADAS POR ANO',
    },
  ];

  return (
    <section id="destaques-hero" className="bg-black text-white py-8 sm:py-10 border-b border-neutral-800 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.3, delay: idx * 0.12, ease: "easeOut" }}
                className="py-5 md:py-0 md:px-6 first:pl-0 last:pr-0 flex items-center justify-center md:justify-start gap-4 text-center md:text-left"
              >
                <Icon className="w-6 h-6 text-white shrink-0" />
                <span 
                  className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase leading-tight font-sans"
                  style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700 }}
                >
                  {item.text}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
