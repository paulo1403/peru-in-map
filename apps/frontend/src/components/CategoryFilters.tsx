import { useLanguageStore } from '../stores/languageStore';

export function CategoryFilters() {
  const { language } = useLanguageStore();

  const content = {
    es: {
      all: 'Todos',
      cafe: 'Cafés',
      restaurant: 'Restaurantes',
      bar: 'Bares',
      park: 'Parques'
    },
    en: {
      all: 'All',
      cafe: 'Cafes',
      restaurant: 'Restaurants',
      bar: 'Bars',
      park: 'Parks'
    }
  };

  const t = content[language];

  const categories = [
    { key: 'all', label: t.all, value: '' },
    { key: 'cafe', label: t.cafe, value: 'cafe' },
    { key: 'restaurant', label: t.restaurant, value: 'restaurant' },
    { key: 'bar', label: t.bar, value: 'bar' },
    { key: 'park', label: t.park, value: 'park' },
  ];

  return (
    <div className="sticky top-[73px] z-40 bg-surface/95 backdrop-blur-md border-b border-border py-4">
      <div className="container mx-auto px-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className="px-6 py-2.5 bg-white border-2 border-border rounded-xl font-semibold text-sm whitespace-nowrap hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
