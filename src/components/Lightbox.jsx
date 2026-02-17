import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Lightbox({ images, currentIndex, onClose, onNext, onPrev }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    // Stop body scroll when lightbox is open
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  if (currentIndex === null || !images[currentIndex]) return null;

  const lightboxContent = (
    <div className="lightbox-overlay">
      {/* Close button */}
      <button
        className="lightbox-close cursor-hover"
        onClick={onClose}
      >
        CHIUDI X
      </button>

      {/* Previous arrow */}
      {currentIndex > 0 && (
        <button
          className="lightbox-arrow lightbox-arrow-left cursor-hover"
          onClick={onPrev}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M25 10 L15 20 L25 30" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Next arrow */}
      {currentIndex < images.length - 1 && (
        <button
          className="lightbox-arrow lightbox-arrow-right cursor-hover"
          onClick={onNext}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M15 10 L25 20 L15 30" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Image container */}
      <div className="lightbox-content" onClick={onClose}>
        <img
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className="lightbox-image"
          loading="eager"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Counter */}
      <div className="lightbox-counter">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );

  return createPortal(lightboxContent, document.body);
}

