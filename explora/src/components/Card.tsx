import { ReactNode } from 'react';

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
      className={`bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {image && (
        <img src={image} alt={title || 'Card image'} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        {title && <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>}
        {description && <p className="text-gray-600 mb-4">{description}</p>}
        {children}
      </div>
    </div>
  );
}