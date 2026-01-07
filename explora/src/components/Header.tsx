import { IconMap2 } from '@tabler/icons-react';

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <IconMap2 className="h-6 w-6 text-red-600" />
          <span className="text-xl font-bold text-gray-900">Explora.pe</span>
        </div>
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <a href="/" className="text-sm font-medium text-gray-600 hover:text-red-600">
                Inicio
              </a>
            </li>
            <li>
              <a href="/mapa" className="text-sm font-medium text-gray-600 hover:text-red-600">
                Mapa
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
