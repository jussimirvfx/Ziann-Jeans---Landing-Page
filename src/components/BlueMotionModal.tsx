import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import collectionImage from '../assets/images/ziann_collection_denim_1784918984056.jpg';

interface BlueMotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollToForm: () => void;
}

export const BlueMotionModal: React.FC<BlueMotionModalProps> = ({
  isOpen,
  onClose,
  onScrollToForm,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-none shadow-2xl overflow-hidden text-slate-100"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-none bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all z-10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="relative h-48 sm:h-auto">
              <img
                src={collectionImage}
                alt="Coleção Blue Motion"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 sm:bg-gradient-to-r sm:from-transparent sm:to-slate-900" />
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-neutral-800 border border-neutral-700 text-white text-[10px] font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3 h-3 text-white" />
                  <span>Destaque de Lançamento</span>
                </div>
                <h3 className="text-xl font-bold text-white uppercase mb-3">
                  Coleção Blue Motion
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  O mix perfeito entre o jeanswear contemporâneo e a alfaiataria em denim. Peças autorais com detalhes enriquecidos, broches removíveis e lavagens exclusivas de alto valor percebido.
                </p>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    <span>Alfaiataria estruturada em Denim</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    <span>Aplicações e broches removíveis</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    <span>Markup garantido de 2x a 3x</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onScrollToForm();
                }}
                className="w-full inline-flex items-center justify-center px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-[#111111] bg-white hover:bg-neutral-100 rounded-none transition-all shadow-lg cursor-pointer"
              >
                <span>Receber Catálogo Completo</span>
                <ArrowRight className="w-4 h-4 ml-2 text-[#111111]" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
