# 🐱 Cat Page Demo

Revista felina digital hecha con React. Información, galería, curiosidades y un juego interactivo de polilla para entretener a tu gato.

🌐 **[Ver en vivo](https://jupobleteb.github.io/cat-page-demo)**

---

## ✨ Características

- **Galería de fotos** — imágenes verificadas de gatos en layout masonry
- **Curiosidades felinas** — 10 datos sobre el mundo de los gatos
- **Catálogo de razas** — 12 razas con descripción, origen, características, peso y esperanza de vida
- **Juego para gatos** — polilla animada sobre pared estucada, con movimientos aleatorios y pantalla completa
- **Recursos externos** — links a organizaciones felinas internacionales

---

## 🦋 Juego para gatos

Una polilla dibujada en canvas con comportamiento realista:

- Se queda quieta **2.8 a 4.6 segundos** y luego vuela a una posición aleatoria
- Movimientos en **tres rangos de distancia**: corto, medio y largo (cruzando toda la pantalla)
- Velocidad proporcional a la distancia recorrida
- Aleteo lento cuando está posada, rápido al volar
- **Pantalla completa** compatible con Android y desktop (el botón se oculta si el dispositivo no lo soporta)

---

## 🛠 Stack

| Tecnología | Versión |
|---|---|
| React | 19.2.4 |
| Create React App | 5.0.1 |
| gh-pages | 6.x |

---

## 📁 Estructura

```
src/
├── App.jsx
├── App.css                     # Tema oscuro global + variables CSS
├── data/
│   └── datos.js                # Fotos, razas, curiosidades y enlaces
└── components/
    ├── Header.jsx / .css       # Hero a pantalla completa
    ├── FotosGallery.jsx / .css
    ├── DatosCuriosos.jsx / .css
    ├── JuegoPolilla.jsx / .css  # Juego canvas
    ├── Razas.jsx / .css
    └── EnlacesExternos.jsx / .css
```

---

## 🚀 Uso local

```bash
npm install
npm start        # http://localhost:3000
```

## 📦 Deploy a GitHub Pages

```bash
npm run deploy   # hace build + sube a la rama gh-pages automáticamente
```

> Primera vez: ir a **Settings → Pages → Source → gh-pages → / (root)**

---

## 🖼 Imágenes

- **Galería**: Unsplash (IDs verificados como gatos)
- **Razas**: [TheCatAPI](https://thecatapi.com) con `breed_ids` específicos — 100% verificadas por raza
