import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ShieldCheck, DollarSign, Users } from 'lucide-react';

export const DifferentialsSection: React.FC = () => {
  const cards = [
    {
      id: 'card-1',
      number: '01',
      title: 'ALTO GIRO NO PDV',
      text: 'Coleções desenvolvidas com base no equilíbrio entre o conceito de moda e produtos comerciais. Alfaiataria em denim e lavagens exclusivas que encantam no provador e não ficam paradas no estoque.',
      icon: TrendingUp,
    },
    {
      id: 'card-2',
      number: '02',
      title: 'EXCLUSIVIDADE REGIONAL',
      text: 'Protegemos a sua praça (respeitando o limite de 1 lojista a cada 20.000 habitantes) para garantir que sua loja tenha produtos únicos e sem concorrência direta na cidade.',
      icon: ShieldCheck,
    },
    {
      id: 'card-3',
      number: '03',
      title: 'EXCELENTE MARGEM (MARKUP 2X A 3X)',
      text: 'Produtos com alto valor percebido, detalhes enriquecidos (como broches e aplicações removíveis) e acabamento impecável que sustentam excelente rentabilidade para o seu caixa.',
      icon: DollarSign,
    },
    {
      id: 'card-4',
      number: '04',
      title: 'PARCERIA B2B DE VERDADE',
      text: 'Somos uma marca com foco 100% no mercado atacadista. Oferecemos kit de mídias pronto para suas redes sociais, fotos/vídeos de campanha, suporte comercial próximo e trocas facilitadas.',
      icon: Users,
    },
  ];

  return (
    <section id="diferenciais" className="py-20 lg:py-28 bg-white text-[#111111] relative border-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Title + 2x2 Cards Grid */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Section Header Aligned Left */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="text-left mb-8 lg:mb-10"
            >
              <h2 
                id="differentials-title" 
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-black text-[#111111] tracking-tight uppercase leading-snug font-sans"
              >
                POR QUE SER UM LOJISTA PARCEIRO <span className="italic font-black">ZIANN JEANS</span>?
              </h2>
            </motion.div>

            {/* 4 Differentials Cards in 2x2 Grid on Desktop, Compact Horizontal Rows on Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
              {cards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.id}
                    id={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex flex-row sm:flex-col items-center sm:items-stretch justify-between text-left bg-white border border-black/20 p-4 sm:p-6 hover:border-black hover:shadow-md transition-all duration-300 h-auto sm:h-full gap-3 sm:gap-0"
                  >
                    {/* Left side on mobile: Title & Description | Bottom on Desktop */}
                    <div className="flex-1 pr-2 sm:pr-0 order-1 sm:order-2">
                      <h3 
                        className="text-xs sm:text-base font-bold text-[#111111] mb-1 sm:mb-2 tracking-wide uppercase font-sans leading-tight"
                        style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700 }}
                      >
                        {card.title}
                      </h3>

                      <p 
                        className="text-[#111111]/75 text-[11px] sm:text-sm leading-snug sm:leading-relaxed font-normal font-sans"
                        style={{ fontFamily: 'Arial, sans-serif', fontWeight: 400 }}
                      >
                        {card.text}
                      </p>
                    </div>

                    {/* Right side on mobile: Number | Top on Desktop */}
                    <div className="relative shrink-0 flex items-center justify-end sm:block mb-0 sm:mb-3 select-none order-2 sm:order-1">
                      <div className="relative inline-flex items-end">
                        <span 
                          className="text-4xl sm:text-6xl font-normal text-[#111111]/20 tracking-tighter leading-none font-sans"
                          style={{ fontFamily: 'Arial, sans-serif', fontWeight: 400 }}
                        >
                          {card.number}
                        </span>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5] text-[#111111] absolute bottom-0.5 left-0.5 sm:bottom-1 sm:left-1" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Image without border */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex items-center justify-center pt-4 lg:pt-0"
          >
            <div className="relative w-full h-full min-h-[420px] max-h-[680px] overflow-hidden">
              <img
                src="https://frwfcibbvbj5zog7.public.blob.vercel-storage.com/geral/ses2-1785269265197.webp"
                alt="Lojista Parceiro Ziann Jeans"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
