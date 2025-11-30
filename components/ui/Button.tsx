import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-8 py-3 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-accent disabled:opacity-50";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-light shadow-sm hover:shadow-md",
    outline: "border border-primary text-primary hover:bg-secondary-light",
    ghost: "text-primary hover:text-primary-light hover:bg-secondary-light/50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};