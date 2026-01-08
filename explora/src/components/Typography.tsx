import { ReactNode } from 'react';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'caption';
  children: ReactNode;
  className?: string;
}

export default function Typography({
  variant = 'p',
  children,
  className = '',
}: TypographyProps) {
  const baseClasses = {
    h1: 'text-4xl font-bold text-gray-900',
    h2: 'text-3xl font-semibold text-gray-900',
    h3: 'text-2xl font-semibold text-gray-900',
    h4: 'text-xl font-medium text-gray-900',
    p: 'text-base text-gray-700',
    span: 'text-sm text-gray-600',
    caption: 'text-xs text-gray-500',
  };

  const Component = variant as keyof JSX.IntrinsicElements;

  return (
    <Component className={`${baseClasses[variant]} ${className}`}>
      {children}
    </Component>
  );
}