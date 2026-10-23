import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export function Lightbox({ images, index, onClose, onNavigate }) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((index + 1) % images.length);
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, images.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/95 p-4 sm:p-10"
          onClick={onClose}
          role="dialog" aria-modal="true" aria-label="Image viewer"
          data-testid="lightbox"
        >
          <button onClick={onClose} aria-label="Close image viewer" data-testid="lightbox-close"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center border border-white/20 text-white transition-colors hover:border-white">
            <X className="h-5 w-5" />
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onNavigate((index - 1 + images.length) % images.length); }}
                aria-label="Previous image" data-testid="lightbox-prev"
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/20 text-white transition-colors hover:border-white">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onNavigate((index + 1) % images.length); }}
                aria-label="Next image" data-testid="lightbox-next"
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/20 text-white transition-colors hover:border-white">
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
          <motion.figure
            key={index}
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}
          >
            <img src={images[index].src} alt={images[index].alt} className="max-h-[78vh] w-full bg-white object-contain" />
            <figcaption className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
              {images[index].caption}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
