import { IconShare, IconBrandWhatsapp, IconCheck, IconAlertCircle } from '@tabler/icons-react';
import { useState } from 'react';

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
  className?: string;
}

export default function ShareButton({ title, text, url, className = '' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  const handleShare = async () => {
    // Web Share API (nativo en mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Error al compartir:', err);
          fallbackShare();
        }
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    // Copiar al portapapeles
    navigator.clipboard.writeText(`${text}\n${url}`).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
    );
  };

  const shareWhatsApp = () => {
    const message = encodeURIComponent(`${text}\n${url}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {/* Botón principal compartir */}
      <button
        onClick={handleShare}
        className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-purple-700 active:scale-95 transition-all shadow-lg min-h-[48px]"
      >
        {copied ? (
          <>
            <IconCheck className="w-5 h-5" />
            <span>¡Copiado!</span>
          </>
        ) : error ? (
          <>
            <IconAlertCircle className="w-5 h-5" />
            <span>Error</span>
          </>
        ) : (
          <>
            <IconShare className="w-5 h-5" />
            <span>Compartir</span>
          </>
        )}
      </button>

      {/* Botón WhatsApp directo */}
      <button
        onClick={shareWhatsApp}
        className="flex items-center justify-center bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 active:scale-95 transition-all shadow-lg min-w-[48px] min-h-[48px]"
        aria-label="Compartir en WhatsApp"
      >
        <IconBrandWhatsapp className="w-6 h-6" />
      </button>
    </div>
  );
}
