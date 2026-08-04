import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HighlightsSection } from './components/HighlightsSection';
import { DifferentialsSection } from './components/DifferentialsSection';
import { CollectionCarousel } from './components/CollectionCarousel';
import { AuthoritySection } from './components/AuthoritySection';
import { TestimonialSection } from './components/TestimonialSection';
import { FormSection } from './components/FormSection';
import { Footer } from './components/Footer';
import { BlueMotionModal } from './components/BlueMotionModal';

export default function App() {
  const [isBlueMotionModalOpen, setIsBlueMotionModalOpen] = useState(false);

  const scrollToForm = () => {
    const formElement = document.getElementById('formulario-captura');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-neutral-800 selection:text-white antialiased">
      {/* Top Navbar */}
      <Navbar onScrollToForm={scrollToForm} />

      <main className="flex-grow">
        {/* 1. HERO SECTION (Dobra Principal) */}
        <HeroSection
          onScrollToForm={scrollToForm}
          onOpenBlueMotionModal={() => setIsBlueMotionModalOpen(true)}
        />

        {/* 🌟 SEÇÃO DE HIGHLIGHTS DESTAQUES */}
        <HighlightsSection />

        {/* 💼 2. SEÇÃO DADOS E DIFERENCIAIS */}
        <DifferentialsSection />

        {/* 📸 SEÇÃO DA COLEÇÃO BLUE MOTION (CARROSSEL) */}
        <CollectionCarousel onScrollToForm={scrollToForm} />

        {/* 🏆 3. SEÇÃO DE AUTORIDADE DA MARCA */}
        <AuthoritySection onScrollToForm={scrollToForm} />

        {/* ⭐ 4. SEÇÃO PROVA SOCIAL (DEPOIMENTO) */}
        <TestimonialSection />

        {/* 📝 5. SEÇÃO FORMULÁRIO DE CAPTURA */}
        <FormSection />
      </main>

      {/* 🦶 6. RODAPÉ */}
      <Footer />

      {/* Blue Motion Collection Modal */}
      <BlueMotionModal
        isOpen={isBlueMotionModalOpen}
        onClose={() => setIsBlueMotionModalOpen(false)}
        onScrollToForm={scrollToForm}
      />
    </div>
  );
}
