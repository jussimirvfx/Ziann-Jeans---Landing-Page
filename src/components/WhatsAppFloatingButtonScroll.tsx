import React, { useEffect, useState } from 'react';

type WhatsAppFloatingButtonScrollProps = {
  formId?: string;
  brandName?: string;
};

const WhatsAppIcon = ({ className = 'w-8 h-8' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.86 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.525 3.687" />
  </svg>
);

export const WhatsAppFloatingButtonScroll: React.FC<WhatsAppFloatingButtonScrollProps> = ({
  formId = 'cta-form',
  brandName = 'Ziann',
}) => {
  const [showCallout, setShowCallout] = useState(false);

  useEffect(() => {
    const showTimer = window.setTimeout(() => setShowCallout(true), 6000);
    return () => window.clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!showCallout) return undefined;

    const hideTimer = window.setTimeout(() => setShowCallout(false), 12000);
    return () => window.clearTimeout(hideTimer);
  }, [showCallout]);

  const handleScrollToForm = () => {
    setShowCallout(false);

    const formElement = document.getElementById(formId);
    formElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const firstInput = formElement?.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      'input, select, textarea',
    );
    window.setTimeout(() => firstInput?.focus({ preventScroll: true }), 700);
  };

  return (
    <>
      {showCallout && (
        <div className="fixed bottom-28 right-4 z-40 max-w-[18rem] bg-white text-neutral-900 border border-neutral-200 p-4 shadow-xl">
          <button
            type="button"
            onClick={() => setShowCallout(false)}
            className="absolute top-2 right-2 text-neutral-500 hover:text-black text-sm font-bold"
            aria-label="Fechar aviso"
          >
            x
          </button>
          <p className="pr-4 text-sm font-bold leading-snug">
            Seja um lojista parceiro {brandName}.
          </p>
          <span className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 bg-white border-b border-r border-neutral-200" />
        </div>
      )}

      <button
        type="button"
        onClick={handleScrollToForm}
        className="fixed bottom-4 right-4 z-30 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#1ebe5d] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
        aria-label="Ir para formulario de contato Ziann"
      >
        <WhatsAppIcon className="h-8 w-8" />
      </button>
    </>
  );
};
