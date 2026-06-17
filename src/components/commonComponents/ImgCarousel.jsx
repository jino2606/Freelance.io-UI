import React, { useState } from 'react';
import { BASE_URL } from '../../services/baseUrl';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function ImgCarousel({ jobPostData, height = '300px' }) {
  const [current, setCurrent] = useState(0);
  const images = jobPostData?.jobImages || [];

  if (!images.length) return null;

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div style={{
      position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      background: 'var(--bg-tertiary)', height
    }}>
      <img
        src={`${BASE_URL}/uploads/job/posts/${images[current]?.filename}`}
        alt={`Job image ${current + 1}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        loading="lazy"
      />
      {images.length > 1 && (
        <>
          <button onClick={prev} aria-label="Previous" style={{
            position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)',
            width: '32px', height: '32px', borderRadius: '50%', border: 'none',
            background: 'rgba(0,0,0,0.5)', color: '#fff', display: 'flex',
            alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
          }}><ChevronLeft size={16} /></button>
          <button onClick={next} aria-label="Next" style={{
            position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
            width: '32px', height: '32px', borderRadius: '50%', border: 'none',
            background: 'rgba(0,0,0,0.5)', color: '#fff', display: 'flex',
            alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
          }}><ChevronRight size={16} /></button>
          <div style={{
            position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: '4px'
          }}>
            {images.map((_, i) => (
              <div key={i} style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: i === current ? '#fff' : 'rgba(255,255,255,0.5)',
                transition: 'background 0.2s'
              }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ImgCarousel;
