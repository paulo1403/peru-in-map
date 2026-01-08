import { IconHeart } from '@tabler/icons-react';
import { useLanguageStore } from '../stores/languageStore';

export default function Footer() {
  const { t } = useLanguageStore();

  return (
    <footer className="w-full border-t border-gray-200/50 bg-background/80 backdrop-blur-md py-6 mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-sm text-secondary">
          © {new Date().getFullYear()} QueHacer.pe. {t('footer.copyright')}
        </p>
        <div className="flex items-center gap-1 text-sm text-secondary">
          <span>{t('footer.madeWith')}</span>
          <IconHeart className="h-4 w-4 text-brand fill-brand animate-pulse" />
          <span>{t('footer.inPeru')}</span>
        </div>
      </div>
    </footer>
  );
}
