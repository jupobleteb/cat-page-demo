import React from 'react';
import './DatosCuriosos.css';

function DatosCuriosos({ datos }) {
  return (
    <section className="datos-curiosos" id="datos">
      <h2 className="section-title">
        <span className="icon">🧠</span>
        Curiosidades Felinas
      </h2>
      <div className="curiosidades-grid">
        {datos.map((dato, index) => (
          <div key={index} className="dato-card">
            <span className="dato-number">{String(index + 1).padStart(2, '0')}</span>
            <p className="dato-text">{dato}</p>
          </div>
        ))}
      </div>
      <div className="datos-curiosos-decor" aria-hidden="true">
        🐾 🐾 🐾
      </div>
    </section>
  );
}

export default DatosCuriosos;
