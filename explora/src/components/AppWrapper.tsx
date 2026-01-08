import { LanguageProvider } from '../contexts/LanguageContext';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}