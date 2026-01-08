import { IconHeart } from '@tabler/icons-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} QueHacer.pe. Todos los derechos reservados.
        </p>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span>Hecho con</span>
          <IconHeart className="h-4 w-4 text-red-600 fill-red-600" />
          <span>en Perú</span>
        </div>
      </div>
    </footer>
  );
}
