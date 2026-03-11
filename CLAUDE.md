# Gatitos - Aplicación React sobre Felinos

## Descripción
Aplicación web creada con Create React App que muestra información sobre gatos y felinos, incluyendo galería de fotos, datos curiosos, razas populares y enlaces externos.

---

## Stack Tecnológico

- **React**: 19.2.4
- **react-dom**: 19.2.4
- **react-scripts**: 5.0.1 (CRA)
- **Testing**: Jest, React Testing Library

---

## Estructura del Proyecto

```
src/
├── App.jsx                 # Componente principal
├── index.js               # Entry point
├── components/
│   ├── Header.jsx         # Encabezado con título y navegación
│   ├── FotosGallery.jsx   # Galería de fotos de gatos
│   ├── DatosCuriosos.jsx  # Lista de datos curiosos sobre felinos
│   ├── Razas.jsx          # Catálogo de razas de gatos
│   └── EnlacesExternos.jsx# Links a sitios relacionados
├── data/
│   ├── datos.js           # Exportación de datos estructurados
│   └── felinos.json       # Fuente principal de datos (JSON)
└── App.css                # Estilos globales
```

---

## Datos

Los datos se cargan desde `src/data/felinos.json` que incluye:
- Información del header (título, descripción, logo)
- Galería de fotos con URLs de Unsplash
- 8 datos curiosos sobre gatos
- 8 razas populares (Siames, Persa, Maine Coon, Bengalí, Sphynx, Birman, Ragdoll, Abisinio)
- Enlaces a organizaciones felinas

---

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo en localhost:3000 |
| `npm test` | Ejecuta las pruebas |
| `npm run build` | Crea un build de producción en `/build` |
| `npm run eject` | Ejecta CRA (acción irreversible) |

---

## Componentes

### Header
- Recibe: `data` (objeto con título, descripción, logo, enlaces)
- Muestra el encabezado principal y navegación

### FotosGallery
- Recibe: `fotos` (array de objetos {url, descripcion})
- Renderiza una galería responsive de imágenes

### DatosCuriosos
- Recibe: `datos` (array de strings)
- Lista datos curiosos sobre felinos

### Razas
- Recibe: `razas` (array con nombre, origen, descripcion, caracteristicas, imagen)
- Muestra tarjetas informativas por raza

### EnlacesExternos
- Recibe: `enlaces` (array de {nombre, url})
- Lista enlaces a sitios externos sobre gatos

---

## Notas de Desarrollo

- Los datos están centralizados en `felinos.json` para fácil mantenimiento
- Las imágenes provienen de Unsplash (URLs externas)
- Estilos CSS por componente + estilos globales en App.css
