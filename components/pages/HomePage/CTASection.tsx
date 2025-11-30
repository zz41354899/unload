import React from 'react';
import { FadeIn } from '../../ui/FadeIn';
import { Button } from '../../ui/Button';

export type CTASectionProps = {
  onNavigate: (page: string) => void;
};

export const CTASection = ({ onNavigate }: CTASectionProps) => {
  return (
    <section className="py-32 bg-secondary-light/20 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-50" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-30" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-light text-primary mb-8 tracking-wide">展開內在的整合對話。</h2>
          <p className="text-primary-light text-lg mb-12 font-light">
            每日五分鐘，依序實踐覺察、反思、分離與洞察、內化的循環。
          </p>
          <Button className="px-12 py-4 text-base" onClick={() => onNavigate('join')}>
            進行意識與潛意識的覺察練習
          </Button>
        </FadeIn>
      </div>
    </section>
  );
};
