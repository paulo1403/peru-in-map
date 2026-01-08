import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { useLanguageStore } from '../stores/languageStore';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
  bio?: string | null;
  location?: string | null;
  birthDate?: string | null;
  website?: string | null;
  instagram?: string | null;
  interests: string[];
  level: number;
  badges: string[];
  reviewCount: number;
  createdAt: string;
}

export function ProfileEditor() {
  const { token } = useAuthStore();
  const { language } = useLanguageStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const t = {
    es: {
      title: 'Mi Perfil',
      loading: 'Cargando perfil...',
      name: 'Nombre',
      email: 'Correo electrónico',
      avatar: 'URL de foto de perfil',
      bio: 'Biografía',
      bioPlaceholder: 'Cuéntanos sobre ti...',
      location: 'Ubicación',
      locationPlaceholder: 'Lima, Perú',
      website: 'Sitio web',
      websitePlaceholder: 'https://tu-sitio.com',
      instagram: 'Instagram',
      instagramPlaceholder: '@tu_usuario',
      interests: 'Intereses',
      interestsDesc: 'Selecciona tus categorías favoritas',
      level: 'Nivel',
      reviewCount: 'Reseñas',
      member: 'Miembro desde',
      save: 'Guardar Cambios',
      saving: 'Guardando...',
      success: '✅ Perfil actualizado correctamente',
      error: '❌ Error al actualizar perfil',
      stats: 'Estadísticas',
    },
    en: {
      title: 'My Profile',
      loading: 'Loading profile...',
      name: 'Name',
      email: 'Email',
      avatar: 'Profile picture URL',
      bio: 'Biography',
      bioPlaceholder: 'Tell us about yourself...',
      location: 'Location',
      locationPlaceholder: 'Lima, Peru',
      website: 'Website',
      websitePlaceholder: 'https://your-site.com',
      instagram: 'Instagram',
      instagramPlaceholder: '@your_username',
      interests: 'Interests',
      interestsDesc: 'Select your favorite categories',
      level: 'Level',
      reviewCount: 'Reviews',
      member: 'Member since',
      save: 'Save Changes',
      saving: 'Saving...',
      success: '✅ Profile updated successfully',
      error: '❌ Error updating profile',
      stats: 'Stats',
    },
  };

  const translations = t[language];

  const interestOptions = [
    { value: 'cafe', label: language === 'es' ? 'Cafés' : 'Cafes' },
    { value: 'restaurant', label: language === 'es' ? 'Restaurantes' : 'Restaurants' },
    { value: 'bar', label: 'Bares' },
    { value: 'park', label: language === 'es' ? 'Parques' : 'Parks' },
    { value: 'museum', label: language === 'es' ? 'Museos' : 'Museums' },
    { value: 'theater', label: language === 'es' ? 'Teatros' : 'Theaters' },
    { value: 'sports', label: language === 'es' ? 'Deportes' : 'Sports' },
    { value: 'shopping', label: 'Shopping' },
  ];

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/profile/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setProfile(data.data);
        setName(data.data.name);
        setAvatar(data.data.avatar || '');
        setBio(data.data.bio || '');
        setLocation(data.data.location || '');
        setWebsite(data.data.website || '');
        setInstagram(data.data.instagram || '');
        setSelectedInterests(data.data.interests || []);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/profile/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          avatar: avatar || null,
          bio: bio || null,
          location: location || null,
          website: website || null,
          instagram: instagram || null,
          interests: selectedInterests,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setProfile(data.data);
        setMessage(translations.success);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(translations.error);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setMessage(translations.error);
    } finally {
      setSaving(false);
    }
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary">{translations.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-text mb-8">{translations.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stats Card */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-border rounded-2xl p-6 sticky top-8">
            <div className="text-center mb-6">
              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl text-primary font-bold">
                    {name[0]?.toUpperCase()}
                  </span>
                </div>
              )}
              <h2 className="text-xl font-bold text-text">{profile?.name}</h2>
              <p className="text-sm text-secondary">{profile?.email}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-t border-border">
                <span className="text-secondary">{translations.level}</span>
                <span className="font-semibold text-primary text-lg">
                  {profile?.level}
                </span>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-border">
                <span className="text-secondary">{translations.reviewCount}</span>
                <span className="font-semibold text-text text-lg">
                  {profile?.reviewCount}
                </span>
              </div>
              <div className="py-3 border-t border-border">
                <span className="text-secondary text-sm">
                  {translations.member}
                </span>
                <p className="font-medium text-text">
                  {profile?.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString(
                        language === 'es' ? 'es-PE' : 'en-US',
                        { year: 'numeric', month: 'long' }
                      )
                    : ''}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-border rounded-2xl p-8">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  {translations.name}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Avatar */}
              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  {translations.avatar}
                </label>
                <input
                  type="url"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  {translations.bio}
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder={translations.bioPlaceholder}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  {translations.location}
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={translations.locationPlaceholder}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  {translations.website}
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder={translations.websitePlaceholder}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Instagram */}
              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  {translations.instagram}
                </label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder={translations.instagramPlaceholder}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  {translations.interests}
                </label>
                <p className="text-sm text-secondary mb-3">
                  {translations.interestsDesc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => toggleInterest(option.value)}
                      className={`px-4 py-2 rounded-full font-medium transition ${
                        selectedInterests.includes(option.value)
                          ? 'bg-primary text-white'
                          : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              {message && (
                <div
                  className={`p-4 rounded-lg ${
                    message.includes('✅')
                      ? 'bg-success/10 text-success'
                      : 'bg-red-500/10 text-red-500'
                  }`}
                >
                  {message}
                </div>
              )}

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? translations.saving : translations.save}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
