import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

export type AccordionItemProps = {
  question: string;
  answer: string;
  key?: React.Key;
};

export const AccordionItem = ({ question, answer }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-secondary-light/60 last:border-0">
      <button
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`text-base md:text-lg font-light transition-colors duration-300 pr-4 ${
            isOpen ? 'text-primary' : 'text-primary/80 group-hover:text-primary'
          }`}
        >
          {question}
        </span>
        <span
          className={`transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          {isOpen ? (
            <Minus className="w-4 h-4 text-secondary-accent" />
          ) : (
            <Plus className="w-4 h-4 text-secondary-accent" />
          )}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-primary-light font-light leading-loose text-sm md:text-base pr-4">
          {answer}
        </p>
      </div>
    </div>
  );
};
