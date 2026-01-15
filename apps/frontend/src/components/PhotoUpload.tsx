import { useState, useRef } from 'react';
import { IconCamera, IconPhoto, IconX, IconUpload, IconCheck } from '@tabler/icons-react';

interface PhotoUploadProps {
  placeId: string;
  onUploadSuccess?: (url: string) => void;
}

export default function PhotoUpload({ placeId, onUploadSuccess }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen');
      return;
    }

    // Validar tamaño (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen es muy grande. Máximo 5MB');
      return;
    }

    // Crear preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!preview) return;

    setUploading(true);
    
    try {
      // Simular upload (reemplazar con tu API real)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Aquí iría la lógica real de upload
      // const formData = new FormData();
      // formData.append('photo', file);
      // formData.append('placeId', placeId);
      // const response = await fetch('/api/upload', { method: 'POST', body: formData });
      
      setSuccess(true);
      if (onUploadSuccess) {
        onUploadSuccess(preview);
      }
      
      setTimeout(() => {
        setPreview(null);
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error al subir:', error);
      alert('Error al subir la foto');
    } finally {
      setUploading(false);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <div>
      {!preview ? (
        <div className="flex gap-3">
          {/* Botón cámara */}
          <button
            onClick={() => cameraInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-lg min-h-[48px]"
          >
            <IconCamera className="w-5 h-5" />
            <span>Tomar Foto</span>
          </button>
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Botón galería */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 active:scale-95 transition-all shadow-lg min-w-[48px] min-h-[48px]"
            aria-label="Seleccionar de galería"
          >
            <IconPhoto className="w-6 h-6" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Preview */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover"
            />
            <button
              onClick={clearPreview}
              disabled={uploading}
              className="absolute top-3 right-3 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 active:scale-95 transition-all shadow-lg disabled:opacity-50"
            >
              <IconX className="w-5 h-5" />
            </button>
          </div>

          {/* Upload button */}
          <button
            onClick={handleUpload}
            disabled={uploading || success}
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-700 active:scale-95 transition-all shadow-lg min-h-[48px] disabled:opacity-50"
          >
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Subiendo...</span>
              </>
            ) : success ? (
              <>
                <IconCheck className="w-5 h-5" />
                <span>¡Subida exitosa!</span>
              </>
            ) : (
              <>
                <IconUpload className="w-5 h-5" />
                <span>Subir Foto</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
