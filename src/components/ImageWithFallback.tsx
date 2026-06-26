import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '../lib/utils';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  /** Görsel yüklenemezse placeholder içinde gösterilecek kısa etiket. */
  label?: string;
  className?: string;
  draggable?: boolean;
  loading?: 'eager' | 'lazy';
}

/**
 * <img> sarmalayıcısı: kaynak yüklenemezse (kırık/404 link) tarayıcının bozuk
 * görsel ikonu yerine şık bir koyu gradyan + etiket gösterir.
 */
export default function ImageWithFallback({ src, alt, label, className, draggable, loading }: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn('flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#17171f] to-[#0a0a0c]', className)}
      >
        <ImageOff size={20} className="text-white/25" />
        {label && <span className="px-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">{label}</span>}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      draggable={draggable}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}
