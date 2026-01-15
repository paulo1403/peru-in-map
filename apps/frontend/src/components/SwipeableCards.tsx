import { useState, useRef, useEffect } from 'react';
import { IconHeart, IconX, IconStar, IconMapPin, IconHeartFilled } from '@tabler/icons-react';

interface Place {
  id: string;
  name: string;
  description: string;
  category: string;
  district: string;
  rating?: number;
  latitude?: number;
  longitude?: number;
}

interface SwipeableCardsProps {
  places: Place[];
  onLike?: (place: Place) => void;
  onPass?: (place: Place) => void;
}

export default function SwipeableCards({ places, onLike, onPass }: SwipeableCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentPlace = places[currentIndex];
  const SWIPE_THRESHOLD = 100;

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const offsetX = e.touches[0].clientX - dragStart.x;
    const offsetY = e.touches[0].clientY - dragStart.y;
    
    setDragOffset({ x: offsetX, y: offsetY });

    // Indicador visual de dirección
    if (Math.abs(offsetX) > 30) {
      setSwipeDirection(offsetX > 0 ? 'right' : 'left');
    } else {
      setSwipeDirection(null);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    if (Math.abs(dragOffset.x) > SWIPE_THRESHOLD) {
      // Swipe completo
      if (dragOffset.x > 0) {
        handleLike();
      } else {
        handlePass();
      }
    } else {
      // Regresar a posición original
      setDragOffset({ x: 0, y: 0 });
      setSwipeDirection(null);
    }
  };

  const handleLike = () => {
    if (currentPlace && onLike) {
      onLike(currentPlace);
    }
    nextCard();
  };

  const handlePass = () => {
    if (currentPlace && onPass) {
      onPass(currentPlace);
    }
    nextCard();
  };

  const nextCard = () => {
    setDragOffset({ x: 0, y: 0 });
    setSwipeDirection(null);
    
    setTimeout(() => {
      if (currentIndex < places.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0); // Reiniciar
      }
    }, 300);
  };

  if (!currentPlace) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No hay más lugares para explorar</p>
      </div>
    );
  }

  const rotation = dragOffset.x * 0.1;
  const opacity = 1 - Math.abs(dragOffset.x) / 300;

  return (
    <div className="relative w-full max-w-md mx-auto px-4 py-6">
      {/* Indicadores de acción */}
      <div className="absolute top-24 left-8 z-20">
        <div
          className={`px-6 py-3 rounded-2xl border-4 border-red-500 bg-white/90 text-red-500 font-bold text-2xl transform -rotate-12 transition-opacity ${
            swipeDirection === 'left' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          NOPE
        </div>
      </div>
      <div className="absolute top-24 right-8 z-20">
        <div
          className={`px-6 py-3 rounded-2xl border-4 border-green-500 bg-white/90 text-green-500 font-bold text-2xl transform rotate-12 transition-opacity ${
            swipeDirection === 'right' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          LIKE
        </div>
      </div>

      {/* Card Stack */}
      <div className="relative h-[500px]">
        {/* Next card (preview) */}
        {places[currentIndex + 1] && (
          <div className="absolute inset-0 bg-white rounded-3xl shadow-lg scale-95 opacity-50" />
        )}

        {/* Current card */}
        <div
          ref={cardRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y * 0.3}px) rotate(${rotation}deg)`,
            opacity: opacity,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
          }}
          className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
        >
          {/* Image placeholder */}
          <div className="h-64 bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 flex items-center justify-center">
            <IconMapPin className="w-20 h-20 text-white/30" />
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-2xl font-bold text-gray-900 flex-1">
                {currentPlace.name}
              </h2>
              {currentPlace.rating && (
                <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                  <IconStar className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                  <span className="font-bold text-yellow-700">{currentPlace.rating.toFixed(1)}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <IconMapPin className="w-4 h-4" />
              <span className="text-sm">{currentPlace.district}</span>
              <span className="text-sm text-gray-400">• {currentPlace.category}</span>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              {currentPlace.description}
            </p>

            <a
              href={`/lugares/${currentPlace.id}`}
              className="text-purple-600 font-semibold hover:text-purple-700 text-sm"
            >
              Ver más detalles →
            </a>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={handlePass}
          className="w-16 h-16 rounded-full bg-white border-2 border-red-500 text-red-500 flex items-center justify-center hover:bg-red-50 active:scale-95 transition-all shadow-lg"
        >
          <IconX className="w-8 h-8" strokeWidth={2.5} />
        </button>

        <button
          onClick={handleLike}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center hover:from-green-600 hover:to-emerald-700 active:scale-95 transition-all shadow-xl"
        >
          <IconHeart className="w-10 h-10" strokeWidth={2.5} />
        </button>
      </div>

      {/* Progress indicator */}
      <div className="text-center mt-6 text-sm text-gray-500">
        {currentIndex + 1} / {places.length}
      </div>
    </div>
  );
}
