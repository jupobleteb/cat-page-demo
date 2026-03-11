import React from 'react';
import './Razas.css';

function Razas({ razas }) {
  return (
    <section className="razas" id="razas">
      <h2 className="section-title">
        <span className="icon">🐈</span>
        Razas del Mundo
      </h2>
      <div className="razas-grid">
        {razas.map((raza, index) => (
          <article key={index} className="raza-card">
            <div className="raza-card-img">
              <img src={raza.imagen} alt={raza.nombre} loading="lazy" />
              <span className="raza-origen-badge">{raza.origen}</span>
            </div>
            <div className="raza-info">
              <h3 className="raza-nombre">{raza.nombre}</h3>
              <p className="raza-descripcion">{raza.descripcion}</p>
              <div className="raza-tags">
                {raza.caracteristicas.map((char, i) => (
                  <span key={i} className="raza-tag">{char}</span>
                ))}
              </div>
              {(raza.esperanzaVida || raza.peso) && (
                <div className="raza-meta">
                  {raza.esperanzaVida && (
                    <div className="raza-meta-item">
                      <span className="raza-meta-label">Vida</span>
                      <span className="raza-meta-value">{raza.esperanzaVida}</span>
                    </div>
                  )}
                  {raza.peso && (
                    <div className="raza-meta-item">
                      <span className="raza-meta-label">Peso</span>
                      <span className="raza-meta-value">{raza.peso}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Razas;
