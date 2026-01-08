import type * as React from 'react';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'caption';
  children: React.ReactNode;
  className?: string;
}

export default function Typography({
  variant = 'p',
  children,
  className = '',
}: TypographyProps) {
  const baseClasses = {
    h1: 'text-4xl font-bold text-text',
    h2: 'text-3xl font-semibold text-text',
    h3: 'text-2xl font-semibold text-text',
    h4: 'text-xl font-medium text-text',
    h5: 'text-lg font-medium text-text',
    h6: 'text-base font-medium text-text',
    p: 'text-base text-secondary',
    span: 'text-sm text-secondary',
    caption: 'text-xs text-secondary',
  };

  const Component = variant as keyof React.JSX.IntrinsicElements;

  return (
    <Component className={`${baseClasses[variant]} ${className}`}>
      {children}
    </Component>
  );
}