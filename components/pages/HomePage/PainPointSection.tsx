import React from 'react';
import { Activity, Waves, BatteryWarning } from 'lucide-react';
import { FadeIn } from '../../ui/FadeIn';
import { SectionHeading } from '../../common/SectionHeading';

export const PainPointSection = () => {
  const points = [
    {
      icon: <Activity className="w-8 h-8 text-secondary-accent" strokeWidth={1} />,
      title: '感官功能氾濫',
      desc: '外在刺激突破心理閾值，導致感覺功能（Sensation Function）運作超載。',
    },
    {
      icon: <Waves className="w-8 h-8 text-secondary-accent" strokeWidth={1} />,
      title: '無意識的心理感染',
      desc: '缺乏界線的同理，無意識地攝入環境中的集體情緒陰影（Shadow）。',
    },
    {
      icon: <BatteryWarning className="w-8 h-8 text-secondary-accent" strokeWidth={1} />,
      title: '自我邊界消融',
      desc: '為了適應職場人格面具（Persona），導致個體主體性逐漸喪失。',
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title="識別心理狀態" subtitle="State Recognition" />

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {points.map((p, idx) => (
            <FadeIn key={idx} delay={idx * 150} className="text-center group">
              <div className="w-20 h-20 mx-auto bg-secondary-light rounded-full flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-105">
                {p.icon}
              </div>
              <h3 className="text-xl font-medium text-primary mb-4">{p.title}</h3>
              <p className="text-primary-light font-light leading-loose text-sm md:text-base">{p.desc}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
