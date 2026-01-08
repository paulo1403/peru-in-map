import { IconMapPin } from '@tabler/icons-react';
import { Badge } from '../ui/Badge';
import { Card, CardContent } from '../ui/Card';
import { Rating } from '../ui/Rating';
import type { Place, PlaceCategory } from '@shared/types';

interface PlaceCardProps {
  place: Place;
  onClick?: () => void;
}

export function PlaceCard({ place, onClick }: PlaceCardProps) {
  const categoryLabels: Record<PlaceCategory, string> = {
    cafe: 'Café',
    restaurant: 'Restaurante',
    bar: 'Bar',
    park: 'Parque',
    museum: 'Museo',
    theater: 'Teatro',
    market: 'Mercado',
    shopping: 'Compras',
    sports: 'Deportes',
    other: 'Otro',
  };

  const categoryColors: Record<PlaceCategory, 'default' | 'secondary' | 'accent' | 'outline'> = {
    cafe: 'default',
    restaurant: 'secondary',
    bar: 'accent',
    park: 'secondary',
    museum: 'default',
    theater: 'default',
    market: 'accent',
    shopping: 'default',
    sports: 'secondary',
    other: 'outline',
  };

  return (
    <Card className={`overflow-hidden ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`} onClick={onClick}>
      {/* Placeholder para imagen */}
      <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
        <IconMapPin className="w-8 h-8 text-primary/60" />
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-text-primary text-lg leading-tight">
            {place.name}
          </h3>
          {place.isSponsored && (
            <Badge variant="accent">
              Patrocinado
            </Badge>
          )}
        </div>

        <Badge
          variant={categoryColors[place.category]}
          size="sm"
          className="mb-2"
        >
          {categoryLabels[place.category]}
        </Badge>

        <p className="text-text-secondary text-sm mb-3 line-clamp-2">
          {place.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {place.rating && place.reviewCount && (
              <>
                <Rating value={place.rating} />
                <span className="text-sm text-text-secondary">
                  ({place.reviewCount})
                </span>
              </>
            )}
          </div>

          <div className="text-xs text-text-secondary">
            {place.district}, {place.city}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}