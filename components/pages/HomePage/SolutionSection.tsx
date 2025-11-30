import React from 'react';
import { BrainCircuit } from 'lucide-react';
import { FadeIn } from '../../ui/FadeIn';

export const SolutionSection = () => {
  return (
    <section className="py-24 md:py-32 bg-secondary-light/30 relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent to-secondary-accent/20" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-4xl font-light text-primary leading-tight mb-8">
              走向個體化，
              <br />
              <span className="font-normal">而非防禦性退縮。</span>
            </h2>
            <p className="text-primary-light leading-loose mb-8 font-light">
              高敏特質並非病理，而是通往潛意識的通道。建立心理過濾機制，旨在於社會功能（職場角色）與內在真實（本我）之間取得平衡，完成自性（Self）的整合。
            </p>

            <ul className="space-y-6">
              {[
                '辨識並整合人格面具 (Persona)',
                '確立心理疆界 (Boundaries)',
                '轉化敏感為意識功能 (Consciousness)',
              ].map((item, i) => (
                <li key={i} className="flex items-center text-primary-light">
                  <span className="w-2 h-2 rounded-full bg-secondary-accent mr-4" />
                  <span className="font-light tracking-wide">{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={200} className="relative h-96 w-full hidden md:block">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 border border-secondary-accent/20 rounded-full animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
                <div className="absolute inset-8 border border-secondary-accent/30 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <BrainCircuit className="text-secondary-accent w-12 h-12 opacity-60" strokeWidth={1} />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
