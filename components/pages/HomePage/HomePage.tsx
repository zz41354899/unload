import React from 'react';
import { HeroSection, HeroSectionProps } from './HeroSection';
import { PainPointSection } from './PainPointSection';
import { SolutionSection } from './SolutionSection';
import { HowItWorksSection } from './HowItWorksSection';
import { CTASection } from './CTASection';

export type HomePageProps = HeroSectionProps;

export const HomePage = ({ onNavigate }: HomePageProps) => (
  <>
    <HeroSection onNavigate={onNavigate} />
    <PainPointSection />
    <SolutionSection />
    <HowItWorksSection />
    <CTASection onNavigate={onNavigate} />
  </>
);
