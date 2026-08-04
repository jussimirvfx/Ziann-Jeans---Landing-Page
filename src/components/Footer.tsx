import React from 'react';
import { Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="rodape" className="bg-black text-white py-8 border-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo - Alinhada à esquerda com a Navbar */}
        <div className="flex items-center justify-start">
          <a href="#" className="flex items-center">
            <img
              src="https://frwfcibbvbj5zog7.public.blob.vercel-storage.com/geral/logo-ziann-em-aberto-branca-1-1785183016766.webp"
              alt="Ziann Jeans"
              className="h-7 sm:h-9 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </a>
        </div>

        {/* Escrita no meio */}
        <div className="text-center text-neutral-400 text-xs sm:text-sm font-medium">
          <p id="footer-rights">
            © 2026 Mais Lojistas. Todos os direitos reservados.
          </p>
        </div>

        {/* Ícone do Instagram no lado direito - Alinhado com o botão da Navbar */}
        <div className="flex items-center justify-end">
          <a
            href="https://www.instagram.com/ziannjeans/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Ziann Jeans"
            className="p-2 text-white hover:text-neutral-300 transition-colors duration-200"
          >
            <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>

      </div>
    </footer>
  );
};
