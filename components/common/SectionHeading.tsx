import React from 'react';
import { FadeIn } from '../ui/FadeIn';

export type SectionHeadingProps = {
  title: string;
  subtitle?: string;
};

export const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => (
  <FadeIn className="text-center mb-20">
    <h2 className="text-3xl font-light text-primary mb-4">{title}</h2>
    {subtitle && (
      <p className="text-secondary-accent text-sm tracking-widest uppercase">{subtitle}</p>
    )}
    <div className="w-16 h-16 rounded-full bg-secondary-light/30 mx-auto mt-6 hidden" />
    <div className="w-16 h-[1px] bg-secondary-accent mx-auto mt-6" />
  </FadeIn>
);
