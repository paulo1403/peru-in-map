import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import type { PlaceCategory } from '@shared/types';

interface PlaceFiltersProps {
  selectedCategory: PlaceCategory | 'all';
  onCategoryChange: (category: PlaceCategory | 'all') => void;
}

export function PlaceFilters({ selectedCategory, onCategoryChange }: PlaceFiltersProps) {
  const categories: Array<{ id: PlaceCategory | 'all'; label: string; color: 'default' | 'secondary' | 'accent' }> = [
    { id: 'all', label: 'Todos', color: 'default' },
    { id: 'cafe', label: 'Cafés', color: 'default' },
    { id: 'restaurant', label: 'Restaurantes', color: 'secondary' },
    { id: 'bar', label: 'Bares', color: 'accent' },
    { id: 'park', label: 'Parques', color: 'secondary' },
    { id: 'museum', label: 'Museos', color: 'default' },
    { id: 'theater', label: 'Teatros', color: 'default' },
    { id: 'market', label: 'Mercados', color: 'accent' },
    { id: 'shopping', label: 'Compras', color: 'default' },
    { id: 'sports', label: 'Deportes', color: 'secondary' },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const isActive = selectedCategory === category.id;
        return (
          <Button
            key={category.id}
            variant={isActive ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className="whitespace-nowrap"
          >
            {category.label}
          </Button>
        );
      })}
    </div>
  );
}