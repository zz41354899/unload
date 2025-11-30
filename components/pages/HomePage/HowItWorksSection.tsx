import React from 'react';
import { FadeIn } from '../../ui/FadeIn';
import { SectionHeading } from '../../common/SectionHeading';

export const HowItWorksSection = () => {
  const steps = [
    { title: '覺察', desc: '觀測「人格面具」在職場中的運作狀態，識別非我（Not-Self）的成分。' },
    { title: '反思', desc: '辨識潛意識的情緒投射，覺知何處產生了心理共振。' },
    { title: '分離與洞察', desc: '區分「集體意識期待」與「本我需求」，劃定清晰的心理疆界。' },
    { title: '內化', desc: '將敏銳感知整合為意識功能，穩固個體化（Individuation）的核心。' },
  ];

  return (
    <section className="py-24 md:py-32 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title="整合流程" subtitle="Integration Process" />

        <div className="relative">
          <div className="hidden md:block absolute top-8 left-0 w-full h-[1px] bg-secondary-light/60" />

          <div className="md:flex md:justify-between md:items-start space-y-16 md:space-y-0 relative">
            {steps.map((step, idx) => (
              <FadeIn key={idx} delay={idx * 200} className="relative pl-8 md:pl-0 md:w-1/4 md:text-center md:px-4 group">
                <div className="absolute left-[3px] top-3 bottom-[-64px] w-[1px] bg-secondary-light/60 md:hidden last:hidden" />

                <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-secondary-accent ring-4 ring-white md:hidden" />

                <div className="hidden md:flex justify-center mb-10 relative">
                  <div className="w-16 h-16 rounded-full bg-white border-[1px] border-secondary-light flex items-center justify-center relative z-10 transition-all duration-500 group-hover:border-secondary-accent group-hover:shadow-lg group-hover:scale-105">
                    <span className="text-xl font-light text-secondary-accent group-hover:text-primary transition-colors duration-300">
                      0{idx + 1}
                    </span>
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-secondary-light/30 rounded-full scale-50 opacity-0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:opacity-100" />
                </div>

                <h3 className="text-lg font-medium text-primary mb-4 tracking-wide group-hover:text-primary-light transition-colors">
                  {step.title}
                </h3>
                <p className="text-primary-light font-light text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                  {step.desc}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
