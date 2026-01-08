import { IconStar, IconStarFilled } from '@tabler/icons-react';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

export function Rating({
  value,
  max = 5,
  size = 'md',
  showValue = false,
  className = ''
}: RatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const stars = Array.from({ length: max }, (_, i) => {
    const starValue = i + 1;
    const isFilled = starValue <= value;
    const isPartial = starValue > value && starValue - 1 < value;

    return (
      <div key={i} className="relative">
        <IconStar
          className={`${sizeClasses[size]} text-border`}
          fill="currentColor"
        />
        {(isFilled || isPartial) && (
          <IconStarFilled
            className={`${sizeClasses[size]} text-accent absolute top-0 left-0`}
            fill="currentColor"
            style={{
              clipPath: isPartial
                ? `inset(0 ${100 - ((value - Math.floor(value)) * 100)}% 0 0)`
                : undefined
            }}
          />
        )}
      </div>
    );
  });

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {stars}
      {showValue && (
        <span className="ml-1 text-sm font-medium text-text-primary">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}