import { useEffect, useMemo, useRef, useState } from 'react';
import { useStore } from '@nanostores/react';
import { overlayStore } from '../stores/overlayStore';
import works from '../data/works.json';
import Lightbox from './Lightbox';

export default function DetailOverlay() {
  const overlay = useStore(overlayStore);
  const overlayRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const work = useMemo(() => {
    if (!overlay.isOpen || !overlay.workId) return null;
    return works.find((w) => w.id === overlay.workId) ?? null;
  }, [overlay.isOpen, overlay.workId]);

  // Estrae gli URL delle immagini per il Lightbox (supporta sia string che object)
  const galleryUrls = useMemo(() => {
    if (!work) return [];
    return work.gallery.map(item => typeof item === 'string' ? item : item.url);
  }, [work]);

  useEffect(() => {
    if (overlay.isOpen && window.lenis) {
      window.lenis.stop();
    } else if (!overlay.isOpen && window.lenis) {
      window.lenis.start();
    }

    if (overlay.isOpen && overlayRef.current) {
      overlayRef.current.scrollTo(0, 0);
    }

    // Animate masonry images when opened
    if (overlay.isOpen && work && window.gsap) {
      setTimeout(() => {
        window.gsap.to('.masonry-img', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.5,
          ease: 'power2.out'
        });
      }, 100);
    }
  }, [overlay.isOpen, work]);

  const handleClose = () => {
    overlayStore.set({ isOpen: false, workId: null });
  };

  const handleLightboxOpen = (index) => {
    setLightboxIndex(index);
    if (window.lenis) window.lenis.stop();
  };

  const handleLightboxClose = () => {
    setLightboxIndex(null);
    if (window.lenis && overlay.isOpen) window.lenis.stop();
  };

  const handleLightboxNext = () => {
    if (lightboxIndex < galleryUrls.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  };

  const handleLightboxPrev = () => {
    if (lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  };

  return (
    <div
      id="detail-overlay"
      data-lenis-prevent
      ref={overlayRef}
      className={overlay.isOpen ? 'open' : ''}
    >
      {work && (
        <>
          {/* HEADER */}
          <div
            className="do-header"
            style={{ backgroundImage: `url('${work.mainImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
        <div style={{ zIndex: 2 }}>
          <span className="text-small">{work.category}</span>
          <h1 className="font-serif" style={{ fontSize: '4rem', lineHeight: 1 }}>
            {work.title}
          </h1>
        </div>
        
        {/* CLOSE BUTTON - posizionato qui per essere vicino al titolo */}
        <button
          onClick={handleClose}
          className="do-close cursor-hover"
        >
          CHIUDI SCHEDA X
        </button>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, #050505, transparent)', zIndex: 1 }}></div>
      </div>

      {/* CONTENT */}
      <div className="do-content">
        <div className="do-intro-grid">
          {/* LEFT COLUMN */}
          <div>
            <p id="do-desc" style={{ fontSize: '1.2rem', color: '#ddd' }}>
              {work.description}
            </p>
            
            <div style={{ marginTop: '3rem', borderTop: '1px solid #333', paddingTop: '2rem' }}>
              <span className="text-small">PROVENIENZA</span>
              <p id="do-prov" style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: '1.1rem', color: '#fff', marginBottom: '2rem' }}>
                {work.provenance}
              </p>
              
              <span className="text-small">SPECIFICHE</span>
              <ul id="do-specs" style={{ marginTop: '1rem', lineHeight: 2, fontSize: '0.9rem', color: '#999' }}>
                {work.specifications.map((spec, idx) => (
                  <li key={idx}>{spec.label}: {spec.value}</li>
                ))}
              </ul>
            </div>
            
            <div style={{ marginTop: '3rem' }}>
              <button className="btn-solid">Richiedi Disponibilità</button>
            </div>
          </div>

          {/* RIGHT COLUMN - VIDEO */}
          <div>
            <span className="text-small">VIDEO DI PRESENTAZIONE</span>
            <div className="video-box-improved cursor-hover" style={{ backgroundImage: `url('${work.videoCover}')` }}>
              <div className="play-btn"></div>
            </div>
          </div>
        </div>

        {/* GALLERY */}
        <div>
          <span className="text-small" style={{ display: 'block', marginBottom: '2rem', textAlign: 'center' }}>
            DETTAGLI OPERA
          </span>
          <div className="masonry-gallery" id="masonry-container">
            {work.gallery.map((item, idx) => {
              // Supporta sia il formato vecchio (string) che nuovo (object con orientation)
              const imageUrl = typeof item === 'string' ? item : item.url;
              const orientation = typeof item === 'object' && item.orientation ? item.orientation : 'landscape';
              
              return (
                <div
                  key={idx}
                  className="masonry-img cursor-hover"
                  data-orientation={orientation}
                  style={{
                    backgroundImage: `url('${imageUrl}')`,
                    cursor: 'pointer'
                  }}
                  onClick={() => handleLightboxOpen(idx)}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
        </>
      )}

      {/* LIGHTBOX */}
      {work && lightboxIndex !== null && (
        <Lightbox
          images={galleryUrls}
          currentIndex={lightboxIndex}
          onClose={handleLightboxClose}
          onNext={handleLightboxNext}
          onPrev={handleLightboxPrev}
        />
      )}
    </div>
  );
}

