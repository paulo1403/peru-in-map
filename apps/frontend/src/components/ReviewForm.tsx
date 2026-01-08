import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useLanguageStore } from '../stores/languageStore';
import { AuthModal } from './AuthModal';
import { api } from '../services/api';

interface ReviewFormProps {
  placeId: string;
}

export function ReviewForm({ placeId }: ReviewFormProps) {
  const { isAuthenticated } = useAuthStore();
  const { language } = useLanguageStore();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const content = {
    es: {
      title: 'Deja tu reseña',
      loginRequired: 'Debes iniciar sesión para dejar una reseña',
      loginButton: 'Iniciar Sesión',
      rating: 'Calificación',
      comment: 'Comentario (opcional)',
      commentPlaceholder: 'Cuéntanos sobre tu experiencia...',
      submit: 'Publicar Reseña',
      submitting: 'Publicando...',
      success: '¡Reseña publicada con éxito!',
      error: 'Error al publicar la reseña',
      ratingRequired: 'Por favor selecciona una calificación'
    },
    en: {
      title: 'Leave a review',
      loginRequired: 'You must log in to leave a review',
      loginButton: 'Log In',
      rating: 'Rating',
      comment: 'Comment (optional)',
      commentPlaceholder: 'Tell us about your experience...',
      submit: 'Submit Review',
      submitting: 'Submitting...',
      success: 'Review published successfully!',
      error: 'Error publishing review',
      ratingRequired: 'Please select a rating'
    }
  };

  const t = content[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      setError(t.ratingRequired);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.createReview(placeId, {
        rating,
        comment: comment.trim() || undefined,
      });

      if (response.success) {
        setRating(0);
        setComment('');
        setSuccessMessage(t.success);
        
        // Reload page after 2 seconds to show new review
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setError(t.error);
      }
    } catch (err) {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <div className="bg-white border-2 border-border rounded-2xl p-8 text-center">
          <svg className="w-16 h-16 text-secondary/50 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h3 className="text-xl font-bold text-text mb-2">{t.loginRequired}</h3>
          <button
            onClick={() => setShowAuthModal(true)}
            className="mt-4 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            {t.loginButton}
          </button>
        </div>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </>
    );
  }

  if (successMessage) {
    return (
      <div className="bg-white border-2 border-success rounded-2xl p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mx-auto mb-4">
          <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-success">{successMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-text mb-6">{t.title}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-text mb-3">
            {t.rating}
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <svg
                  className={`w-10 h-10 ${
                    star <= (hoveredRating || rating)
                      ? 'text-accent fill-current'
                      : 'text-border'
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-semibold text-text mb-3">
            {t.comment}
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t.commentPlaceholder}
            rows={4}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading || rating === 0}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? t.submitting : t.submit}
        </button>
      </form>
    </div>
  );
}
