import React from 'react';
import './Header.css';

function Header({ data }) {
  return (
    <header className="header">
      <div className="header-bg" aria-hidden="true" />

      <div className="header-content">
        <div className="header-eyebrow">
          <span>🐾</span>
          Revista Felina Digital
        </div>

        <h1 className="header-title">
          El Mundo de los <span className="accent">Felinos</span>
        </h1>

        <p className="header-subtitle">
          {data.descripcion}
        </p>

        <a href="#galeria" className="header-cta">
          Explorar ↓
        </a>
      </div>

      <nav className="header-nav" aria-label="Secciones">
        <a href="#galeria">Galería</a>
        <a href="#datos">Curiosidades</a>
        <a href="#juego">Juego</a>
        <a href="#razas">Razas</a>
        <a href="#recursos">Recursos</a>
      </nav>

      <div className="scroll-indicator" aria-hidden="true">
        Scroll
      </div>
    </header>
  );
}

export default Header;
