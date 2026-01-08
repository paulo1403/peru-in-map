import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({
  title,
  description,
  image,
  children,
  className = '',
  onClick,
}: CardProps) {
  return (
    <div
      className={`bg-background/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {image && (
        <img src={image} alt={title || 'Card image'} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        {title && <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>}
        {description && <p className="text-secondary mb-4">{description}</p>}
        {children}
      </div>
    </div>
  );
}