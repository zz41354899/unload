import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '../../ui/FadeIn';
import { Button } from '../../ui/Button';
import { HeroProductMockup } from '../../common/HeroProductMockup';

export type HeroSectionProps = {
  onNavigate: (page: string) => void;
};

export const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary-light rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F1F5F9] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"
        style={{ animationDelay: '2s' }}
      />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10 mb-16">
        <FadeIn direction="up">
          <span className="inline-block py-1.5 px-4 border border-secondary-accent/20 rounded-full text-secondary-accent text-[10px] md:text-xs tracking-[0.3em] mb-10 uppercase bg-white/50 backdrop-blur-sm">
            Psychological Integration Mechanism
          </span>
          <h1 className="text-5xl md:text-7xl font-light leading-[1.2] text-primary mb-10 tracking-wider">
            調節職場的人格面具，
            <br />
            <span className="font-normal block mt-4 text-primary">整合內在的真實感知。</span>
          </h1>
          <p className="text-primary-light/80 text-lg md:text-xl font-light leading-loose tracking-wide max-w-2xl mx-auto mb-14">
            透過榮格心理學的個體化路徑。
            <br className="hidden md:block" />
            在集體場域中，守護自我的完整性與邊界。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button onClick={() => onNavigate('join')} className="px-10 py-4 text-base">
              啟動內在整合
            </Button>
            <Button variant="outline" onClick={() => onNavigate('about')} className="px-10 py-4 text-base">
              查看心理機制
            </Button>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={300} className="w-full relative z-10 px-4">
        <HeroProductMockup />
      </FadeIn>

      <div
        className="mt-20 text-primary-light/40 animate-bounce cursor-pointer hover:text-primary transition-colors duration-300"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <ArrowRight className="rotate-90 w-5 h-5" strokeWidth={1} />
      </div>
    </section>
  );
};
