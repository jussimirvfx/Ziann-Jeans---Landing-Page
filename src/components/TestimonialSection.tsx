import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export const TestimonialSection: React.FC = () => {
  return (
    <section id="depoimento" className="py-12 sm:py-16 bg-white text-neutral-900 relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Title */}
        <h2 id="testimonial-title" className="text-xl sm:text-2xl md:text-3xl font-black text-black tracking-widest uppercase mb-6">
          QUEM REVENDE, RECOMENDA
        </h2>

        {/* 5 Stars */}
        <div className="flex items-center justify-center gap-1.5 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Quote text */}
        <blockquote className="text-lg sm:text-xl md:text-2xl text-neutral-800 font-medium italic leading-relaxed mb-4 max-w-2xl mx-auto">
          "Loja sensacional, produtos de altíssima qualidade e puro estilo"
        </blockquote>

        {/* Author info */}
        <div className="text-sm font-bold text-black uppercase tracking-wider">
          Iara Kuhnen <span className="font-normal text-neutral-600 font-sans">• Avaliação de Lojista</span>
        </div>
      </motion.div>
    </section>
  );
};


