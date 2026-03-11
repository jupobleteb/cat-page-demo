import React from 'react';
import './EnlacesExternos.css';

function EnlacesExternos({ enlaces }) {
  return (
    <section className="enlaces-externos" id="recursos">
      <h2 className="section-title">
        <span className="icon">🔗</span>
        Recursos
      </h2>
      <div className="enlaces-grid">
        {enlaces.map((enlace, index) => (
          <a
            key={index}
            href={enlace.url}
            target="_blank"
            rel="noopener noreferrer"
            className="enlace-card"
          >
            <span className="enlace-nombre">{enlace.nombre}</span>
            <span className="enlace-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      <p className="enlaces-footer-note">
        Hecho con <strong>amor felino</strong> · {new Date().getFullYear()}
      </p>
    </section>
  );
}

export default EnlacesExternos;
