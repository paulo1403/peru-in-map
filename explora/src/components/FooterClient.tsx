import { IconHeart } from '@tabler/icons-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200/50 bg-background/80 backdrop-blur-md py-6 mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-sm text-secondary">
          © {new Date().getFullYear()} QueHacer.pe. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-1 text-sm text-secondary">
          <span>Hecho con</span>
          <IconHeart className="h-4 w-4 text-brand fill-brand animate-pulse" />
          <span>en Perú</span>
        </div>
      </div>
    </footer>
  );
}