import React from 'react';
import './FotosGallery.css';

function FotosGallery({ fotos }) {
  return (
    <section className="fotos-gallery" id="galeria">
      <h2 className="section-title">
        <span className="icon">📷</span>
        Galería
      </h2>
      <div className="gallery-grid">
        {fotos.map((foto, index) => (
          <figure key={index} className="gallery-item">
            <img src={foto.url} alt={foto.descripcion} loading="lazy" />
            <span className="gallery-item-number">
              {String(index + 1).padStart(2, '0')}
            </span>
            <figcaption className="gallery-caption">{foto.descripcion}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default FotosGallery;
