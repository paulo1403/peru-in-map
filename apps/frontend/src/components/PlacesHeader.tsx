import { useLanguageStore } from '../stores/languageStore';

export function PlacesHeader() {
  const { language } = useLanguageStore();

  const content = {
    es: {
      title: 'Explora Lugares',
      subtitle: 'Descubre experiencias auténticas recomendadas por locales'
    },
    en: {
      title: 'Explore Places',
      subtitle: 'Discover authentic experiences recommended by locals'
    }
  };

  const t = content[language];

  return (
    <div className="bg-gradient-to-br from-primary/5 via-transparent to-success/5 border-b border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-text mb-4">{t.title}</h1>
          <p className="text-xl text-secondary">{t.subtitle}</p>
        </div>
      </div>
    </div>
  );
}
