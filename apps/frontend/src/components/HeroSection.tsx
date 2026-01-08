import { useLanguageStore } from '../stores/languageStore';

export function HeroSection() {
  const { language } = useLanguageStore();

  const content = {
    es: {
      badge: 'Descubre lugares locales en Perú',
      title: '¿Qué hacer',
      titleHighlight: 'hoy',
      subtitle: 'Encuentra cafés, restaurantes, parques y experiencias auténticas recomendadas por locales',
      ctaExplore: 'Explorar Lugares',
      ctaMap: 'Ver en Mapa'
    },
    en: {
      badge: 'Discover local places in Peru',
      title: 'What to do',
      titleHighlight: 'today',
      subtitle: 'Find cafes, restaurants, parks and authentic experiences recommended by locals',
      ctaExplore: 'Explore Places',
      ctaMap: 'View on Map'
    }
  };

  const t = content[language];

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-primary/10 rounded-full mb-4 md:mb-6">
            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            <span className="text-xs md:text-sm font-medium text-primary">{t.badge}</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text mb-4 md:mb-6 leading-tight">
            {t.title}<br/>
            <span className="text-primary">{t.titleHighlight}</span>?
          </h1>
          
          <p className="text-base md:text-xl lg:text-2xl text-secondary mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
            {t.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <a 
              href="/lugares" 
              className="group inline-flex items-center justify-center gap-2 bg-primary text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm md:text-base"
            >
              {t.ctaExplore}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a 
              href="/mapa" 
              className="inline-flex items-center justify-center gap-2 bg-white border-2 border-border text-text px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:border-primary hover:text-primary transition-all text-sm md:text-base"
            >
              {t.ctaMap}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
