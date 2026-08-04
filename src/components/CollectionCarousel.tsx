import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowDownRight, X } from 'lucide-react';

interface CollectionCarouselProps {
  onScrollToForm?: () => void;
}

// 11 official collection photographs from Vercel Blob
const baseImages = [
  { id: 1, src: 'https://frwfcibbvbj5zog7.public.blob.vercel-storage.com/geral/prancheta-1-copiar-2-1785243414775.webp', title: 'Look Blue Motion 01' },
  { id: 2, src: 'https://frwfcibbvbj5zog7.public.blob.vercel-storage.com/geral/prancheta-1-1785243414698.webp', title: 'Look Blue Motion 02' },
  { id: 3, src: 'https://frwfcibbvbj5zog7.public.blob.vercel-storage.com/geral/foto-1785266663881.webp', title: 'Look Blue Motion 03' },
  { id: 4, src: 'https://frwfcibbvbj5zog7.public.blob.vercel-storage.com/geral/prancheta-1-copiar-3-1785243414628.webp', title: 'Look Blue Motion 04' },
  { id: 5, src: 'https://frwfcibbvbj5zog7.public.blob.vercel-storage.com/geral/prancheta-1-copiar-4-1785243414594.webp', title: 'Look Blue Motion 05' },
  { id: 6, src: 'https://frwfcibbvbj5zog7.public.blob.vercel-storage.com/geral/prancheta-1-copiar-10-1785243414580.webp', title: 'Look Blue Motion 06' },
  { id: 7, src: 'https://frwfcibbvbj5zog7.public.blob.vercel-storage.com/geral/prancheta-1-copiar-9-1785243414458.webp', title: 'Look Blue Motion 07' },
  { id: 8, src: 'https://frwfcibbvbj5zog7.public.blob.vercel-storage.com/geral/prancheta-1-copiar-5-1785243414429.webp', title: 'Look Blue Motion 08' },
  { id: 9, src: 'https://frwfcibbvbj5zog7.public.blob.vercel-storage.com/geral/prancheta-1-copiar-6-1785243414365.webp', title: 'Look Blue Motion 09' },
  { id: 10, src: 'https://frwfcibbvbj5zog7.public.blob.vercel-storage.com/geral/prancheta-1-copiar-7-1785243414157.webp', title: 'Look Blue Motion 10' },
  { id: 11, src: 'https://frwfcibbvbj5zog7.public.blob.vercel-storage.com/geral/prancheta-1-copiar-8-1785243414035.webp', title: 'Look Blue Motion 11' },
];

// Triplicate for seamless infinite coverflow buffer
const extendedImages = [
  ...baseImages.map((img) => ({ ...img, uniqueKey: `copy1-${img.id}` })),
  ...baseImages.map((img) => ({ ...img, uniqueKey: `copy2-${img.id}` })),
  ...baseImages.map((img) => ({ ...img, uniqueKey: `copy3-${img.id}` })),
];

export const CollectionCarousel: React.FC<CollectionCarouselProps> = ({ onScrollToForm }) => {
  const [activeIndex, setActiveIndex] = useState(baseImages.length); // Start in middle buffer
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const handleUserInteraction = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  const handleNext = () => {
    handleUserInteraction();
    setActiveIndex((prev) => (prev + 1) % extendedImages.length);
  };

  const handlePrev = () => {
    handleUserInteraction();
    setActiveIndex((prev) => (prev - 1 + extendedImages.length) % extendedImages.length);
  };

  // Autoplay every 2 seconds
  useEffect(() => {
    if (isPaused || activeModalImage !== null) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % extendedImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused, activeModalImage]);

  // Swipe / Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    touchStartXRef.current = e.clientX;
    touchEndXRef.current = null;
    isDraggingRef.current = true;
    handleUserInteraction();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || touchStartXRef.current === null) return;
    touchEndXRef.current = e.clientX;
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current || touchStartXRef.current === null || touchEndXRef.current === null) {
      isDraggingRef.current = false;
      return;
    }
    const deltaX = touchEndXRef.current - touchStartXRef.current;
    if (deltaX > 40) {
      handlePrev();
    } else if (deltaX < -40) {
      handleNext();
    }
    isDraggingRef.current = false;
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = null;
    handleUserInteraction();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const deltaX = touchEndXRef.current - touchStartXRef.current;
    if (deltaX > 40) {
      handlePrev();
    } else if (deltaX < -40) {
      handleNext();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const handleImageClick = (diff: number, imgSrc: string) => {
    if (
      touchStartXRef.current !== null &&
      touchEndXRef.current !== null &&
      Math.abs(touchEndXRef.current - touchStartXRef.current) > 20
    ) {
      return;
    }

    handleUserInteraction();
    if (diff === 0) {
      setActiveModalImage(imgSrc);
    } else {
      setActiveIndex((prev) => (prev + diff + extendedImages.length) % extendedImages.length);
    }
  };

  // Calculate portrait dimensions and overlap spacing for 5 visible cards
  const getLayoutMetrics = () => {
    if (isMobile) {
      const width = Math.min(windowWidth * 0.56, 210);
      const height = Math.floor(width * 1.38);
      const step = width;
      return { width, height, step };
    } else if (isTablet) {
      const width = Math.min(Math.floor((windowWidth - 40) / 3.5), 260);
      const height = Math.floor(width * 1.38);
      const step = width;
      return { width, height, step };
    } else {
      const width = Math.min(Math.floor((windowWidth - 100) / 3.6), 330);
      const height = Math.floor(width * 1.38);
      const step = width;
      return { width, height, step };
    }
  };

  const metrics = getLayoutMetrics();

  const getButtonOffset = () => {
    if (isMobile) {
      return Math.min(metrics.width * 0.85, windowWidth / 2 - 24);
    }
    return Math.min(metrics.step * 1.65, windowWidth / 2 - 32);
  };

  const btnOffset = getButtonOffset();

  // 5 visible portrait cards with depth scaling and zero rotation (straight photos)
  const getItemStyles = (diff: number) => {
    const isMobileView = isMobile;
    switch (diff) {
      case 0:
        return {
          width: metrics.width,
          height: metrics.height,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1.06,
          opacity: 1,
          zIndex: 30,
        };
      case -1:
        return {
          width: metrics.width,
          height: metrics.height,
          x: -metrics.step * (isMobileView ? 0.78 : 0.68),
          y: 0,
          rotate: 0,
          scale: 0.88,
          opacity: 0.95,
          zIndex: 20,
        };
      case 1:
        return {
          width: metrics.width,
          height: metrics.height,
          x: metrics.step * (isMobileView ? 0.78 : 0.68),
          y: 0,
          rotate: 0,
          scale: 0.88,
          opacity: 0.95,
          zIndex: 20,
        };
      case -2:
        return {
          width: metrics.width,
          height: metrics.height,
          x: -metrics.step * (isMobileView ? 1.45 : 1.30),
          y: 0,
          rotate: 0,
          scale: 0.72,
          opacity: isMobileView ? 0.35 : 0.75,
          zIndex: 10,
        };
      case 2:
        return {
          width: metrics.width,
          height: metrics.height,
          x: metrics.step * (isMobileView ? 1.45 : 1.30),
          y: 0,
          rotate: 0,
          scale: 0.72,
          opacity: isMobileView ? 0.35 : 0.75,
          zIndex: 10,
        };
      default:
        return {
          width: metrics.width,
          height: metrics.height,
          x: diff < 0 ? -metrics.step * 2.1 : metrics.step * 2.1,
          y: 0,
          rotate: 0,
          scale: 0.6,
          opacity: 0,
          zIndex: 0,
        };
    }
  };

  return (
    <section 
      id="colecao-blue-motion" 
      className="py-16 lg:py-24 bg-white text-[#111111] relative overflow-x-clip select-none border-none"
      style={{ fontFamily: 'Arial, sans-serif' }}
      onMouseEnter={handleUserInteraction}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title "COMPRE A NOVA COLEÇÃO" - Larger title directly on the page without box container */}
        <div className="text-center mb-4 sm:mb-6 relative z-20">
          <h2 
            id="collection-title" 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight uppercase font-sans text-[#111111] m-0"
            style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontWeight: 900 }}
          >
            COMPRE A NOVA COLEÇÃO
          </h2>
        </div>

        {/* Editorial Title Level 2 "BLUE MOTION" */}
        <div className="w-[85%] max-w-6xl mx-auto text-center relative z-0 -mt-2 mb-2 pointer-events-none select-none">
          <span 
            className="text-[11vw] sm:text-[9.5vw] md:text-[8.5vw] lg:text-[7.5vw] xl:text-[110px] font-black tracking-wider uppercase whitespace-nowrap leading-none select-none font-sans block"
            style={{ 
              fontFamily: 'Arial Black, Arial, sans-serif',
              fontWeight: 900,
              WebkitTextStroke: '1.5px #111111',
              color: 'transparent',
              opacity: 0.12,
            }}
          >
            BLUE MOTION
          </span>
        </div>

        {/* Clean Portrait Carousel Stage Container */}
        <div 
          className="relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing mt-2 sm:mt-4 z-10"
          style={{ height: `${metrics.height + 24}px` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Minimalist Navigation Arrows centered on lateral edges of 1st and 3rd image */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute top-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-[#111111] text-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-white transition-all duration-300 shadow-md cursor-pointer active:scale-95"
            style={{
              left: `calc(50% - ${btnOffset}px)`,
              transform: 'translate(-50%, -50%)',
            }}
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute top-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-[#111111] text-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-white transition-all duration-300 shadow-md cursor-pointer active:scale-95"
            style={{
              left: `calc(50% + ${btnOffset}px)`,
              transform: 'translate(-50%, -50%)',
            }}
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* 3 Visible Portrait Cards + Buffer */}
          {extendedImages.map((item, index) => {
            const total = extendedImages.length;
            let diff = (index - activeIndex) % total;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const styles = getItemStyles(diff);
            const isVisible = Math.abs(diff) <= 2;

            return (
              <motion.div
                key={item.uniqueKey}
                animate={{
                  x: styles.x,
                  y: styles.y,
                  width: styles.width,
                  height: styles.height,
                  rotate: styles.rotate,
                  scale: styles.scale,
                  opacity: styles.opacity,
                  zIndex: styles.zIndex,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  position: 'absolute',
                  pointerEvents: isVisible ? 'auto' : 'none',
                  overflow: 'visible',
                }}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isVisible) {
                    handleImageClick(diff, item.src);
                  }
                }}
              >
                {/* Clean Portrait Card without white borders/padding */}
                <div className="w-full h-full absolute inset-0 overflow-hidden rounded-none shadow-[0_12px_28px_rgba(0,0,0,0.18)]">
                  <img
                    src={item.src}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center select-none pointer-events-none"
                    style={{
                      filter: 'brightness(1) contrast(1.02)',
                      transition: 'filter 0.7s ease',
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button - Minimalist, Black, Arial Bold Uppercase */}
        {onScrollToForm && (
          <div className="text-center mt-10 sm:mt-14 relative z-30">
            <button
              id="btn-carousel-cta"
              onClick={onScrollToForm}
              className="inline-flex items-center justify-center px-8 sm:px-10 py-4 text-sm sm:text-base font-bold tracking-wider text-white uppercase transition-all duration-300 rounded-none bg-[#111111] hover:bg-black shadow-none active:scale-95 cursor-pointer font-sans"
              style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700 }}
            >
              <span>QUERO ZIANN NA MINHA LOJA</span>
              <ArrowDownRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}

      </div>

      {/* Lightbox Modal when center image is clicked */}
      <AnimatePresence>
        {activeModalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveModalImage(null)}
          >
            <button
              onClick={() => setActiveModalImage(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 bg-[#111111] hover:bg-slate-900 text-white transition-all cursor-pointer z-50 border border-white/20"
              aria-label="Fechar"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-4xl max-h-[88vh] overflow-hidden bg-[#111111] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeModalImage}
                alt="Coleção Blue Motion Destaque"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[86vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

