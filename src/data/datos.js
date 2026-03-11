// Datos de la aplicación Felis — Revista Felina Digital
// Imágenes de galería: Unsplash (verificadas como gatos)
// Imágenes de razas: TheCatAPI (breed-specific, 100% verificadas)

export const headerData = {
  logo: '🐱',
  titulo: 'El Mundo de los Felinos',
  descripcion: 'Descubre la belleza, la historia y los secretos de los felinos más fascinantes del mundo.'
};

// Galería — solo Unsplash IDs verificados como gatos + TheCatAPI garantizadas
export const fotos = [
  { url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=1000&fit=crop&q=80', descripcion: 'Mirada curiosa' },
  { url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&h=800&fit=crop&q=80',  descripcion: 'Siesta dorada al sol' },
  { url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&h=1067&fit=crop&q=80',   descripcion: 'Ojos como zafiros' },
  { url: 'https://images.unsplash.com/photo-1529778873920-4da4926a707e?w=800&h=600&fit=crop&q=80', descripcion: 'Gatito naranja tierno' },
  { url: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&h=1000&fit=crop&q=80', descripcion: 'Pelaje atigrado' },
  { url: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=800&h=800&fit=crop&q=80',   descripcion: 'Elegancia felina' },
  { url: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=800&h=1067&fit=crop&q=80',  descripcion: 'Rayas y personalidad' },
  { url: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8423?w=800&h=800&fit=crop&q=80', descripcion: 'Curioso e independiente' },
  { url: 'https://cdn2.thecatapi.com/images/gCEFbK7in.jpg', descripcion: 'Tiempo de mimos' },
  { url: 'https://cdn2.thecatapi.com/images/bz15V3Kvg.jpg', descripcion: 'Poses de realeza' },
  { url: 'https://cdn2.thecatapi.com/images/2LEN_GHmx.jpg', descripcion: 'Explorando el mundo' },
  { url: 'https://cdn2.thecatapi.com/images/JQMGbOP3q.jpg', descripcion: 'Noche de aventura' },
];

export const datosCuriosos = [
  'Los gatos duermen entre 12 y 16 horas al día — son los campeones del descanso del reino animal.',
  'Tienen más de 20 músculos en cada oreja y pueden rotarlas 180 grados de forma independiente.',
  'Un gato puede saltar hasta seis veces su propia altura en un solo impulso.',
  'El ronroneo de un gato oscila entre 25 y 50 Hz — una frecuencia que puede favorecer la curación ósea.',
  'La huella nasal de cada gato es única, como la huella dactilar humana.',
  'Los gatos tienen un tercer párpado llamado membrana nictitante, visible cuando están somnolientos.',
  'En el antiguo Egipto, matar a un gato era considerado un crimen capital.',
  'Los gatos no pueden saborear el dulce — carecen del receptor de gusto correspondiente.',
  'La primera gata en viajar al espacio fue Félicette, enviada por Francia en 1963.',
  'Un gato adulto maúlla casi exclusivamente para comunicarse con humanos, raramente con otros gatos.',
];

// Razas — imágenes de TheCatAPI, breed-specific y 100% verificadas
export const razas = [
  {
    nombre: 'Persa',
    origen: 'Irán',
    descripcion: 'Conocido por su pelaje largo y cara plana. Es tranquilo y perfecto para apartamentos.',
    imagen: 'https://cdn2.thecatapi.com/images/zFm4AbO-d.jpg',
    caracteristicas: ['Pelaje largo', 'Tranquilo', 'Afectuoso'],
    esperanzaVida: '10–15 años',
    peso: '3–6 kg'
  },
  {
    nombre: 'Siamés',
    origen: 'Tailandia',
    descripcion: 'Famoso por su coloración y personalidad vocal. Muy inteligente y social.',
    imagen: 'https://cdn2.thecatapi.com/images/Xwp-MBOtI.jpg',
    caracteristicas: ['Muy vocal', 'Inteligente', 'Social'],
    esperanzaVida: '12–20 años',
    peso: '2.5–5.5 kg'
  },
  {
    nombre: 'Maine Coon',
    origen: 'Estados Unidos',
    descripcion: 'Uno de los gatos más grandes del mundo. Amigable, robusto y con apariencia imponente.',
    imagen: 'https://cdn2.thecatapi.com/images/PoZIVJ124.jpg',
    caracteristicas: ['Grande', 'Amigable', 'Robusto'],
    esperanzaVida: '12–15 años',
    peso: '5–9 kg'
  },
  {
    nombre: 'Bengalí',
    origen: 'Estados Unidos',
    descripcion: 'Con patrón similar a un leopardo. Energético, juguetón y con un pelaje brillante único.',
    imagen: 'https://cdn2.thecatapi.com/images/byQhFO7iV.jpg',
    caracteristicas: ['Energético', 'Juguetón', 'Activo'],
    esperanzaVida: '12–16 años',
    peso: '3.5–5.5 kg'
  },
  {
    nombre: 'British Shorthair',
    origen: 'Reino Unido',
    descripcion: 'Pelaje denso y cara redonda. Independiente pero cariñoso, ideal para familias.',
    imagen: 'https://cdn2.thecatapi.com/images/N8bl5RjPG.jpg',
    caracteristicas: ['Independiente', 'Tranquilo', 'Adaptable'],
    esperanzaVida: '12–17 años',
    peso: '3.5–7 kg'
  },
  {
    nombre: 'Ragdoll',
    origen: 'Estados Unidos',
    descripcion: 'Se relaja completamente al ser sostenido. Ojos azules impresionantes y pelaje semilargo.',
    imagen: 'https://cdn2.thecatapi.com/images/QZYN75HxN.jpg',
    caracteristicas: ['Suave', 'Afectuoso', 'Gigante'],
    esperanzaVida: '12–15 años',
    peso: '4.5–9 kg'
  },
  {
    nombre: 'Abisinio',
    origen: 'Egipto',
    descripcion: 'Aparece en artefactos egipcios antiguos. Muy activo, curioso y de gran inteligencia.',
    imagen: 'https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg',
    caracteristicas: ['Curioso', 'Activo', 'Inteligente'],
    esperanzaVida: '12–15 años',
    peso: '2.5–5 kg'
  },
  {
    nombre: 'Sphynx',
    origen: 'Canadá',
    descripcion: 'Sin pelo y extremadamente cariñoso. Su piel cálida y personalidad extrovertida lo hacen único.',
    imagen: 'https://cdn2.thecatapi.com/images/Br8qCwbS9.jpg',
    caracteristicas: ['Sin pelo', 'Cariñoso', 'Energético'],
    esperanzaVida: '12–14 años',
    peso: '2.5–5.5 kg'
  },
  {
    nombre: 'Birman',
    origen: 'Birmania',
    descripcion: 'Conocido como el gato sagrado de Birma. Ojos azules profundos y patas de guantes blancos.',
    imagen: 'https://cdn2.thecatapi.com/images/ln1Ks7VIu.jpg',
    caracteristicas: ['Elegante', 'Suave', 'Leal'],
    esperanzaVida: '12–16 años',
    peso: '3.5–5.5 kg'
  },
  {
    nombre: 'Scottish Fold',
    origen: 'Escocia',
    descripcion: 'Sus orejas dobladas lo hacen inconfundible. Carácter dulce y muy adaptable al hogar.',
    imagen: 'https://cdn2.thecatapi.com/images/werXZVLvS.jpg',
    caracteristicas: ['Orejas dobladas', 'Dulce', 'Adaptable'],
    esperanzaVida: '11–15 años',
    peso: '2.5–6 kg'
  },
  {
    nombre: 'Naranja Doméstico',
    origen: 'Mundial',
    descripcion: 'El rey del internet. Amigable, juguetón, siempre con hambre y con una personalidad arrolladora.',
    imagen: 'https://images.unsplash.com/photo-1529778873920-4da4926a707e?w=600&h=500&fit=crop&q=80',
    caracteristicas: ['Amigable', 'Juguetón', 'Glotón'],
    esperanzaVida: '12–18 años',
    peso: '3.5–6 kg'
  },
  {
    nombre: 'Bosque de Noruega',
    origen: 'Noruega',
    descripcion: 'Nativo de los bosques escandinavos. Gran cazador con pelaje doble resistente al agua.',
    imagen: 'https://cdn2.thecatapi.com/images/tHKLZkKZG.jpg',
    caracteristicas: ['Pelaje doble', 'Trepador', 'Independiente'],
    esperanzaVida: '14–16 años',
    peso: '4–9 kg'
  },
];

export const enlaces = [
  { nombre: "Cat Fanciers' Association (CFA)", url: 'https://cfa.org' },
  { nombre: 'The International Cat Association (TICA)', url: 'https://tica.org' },
  { nombre: 'ASPCA — Cuidado Felino', url: 'https://www.aspca.org/pet-care/cat-care' },
  { nombre: 'Wikipedia — Gato doméstico', url: 'https://es.wikipedia.org/wiki/Gato_dom%C3%A9stico' },
  { nombre: 'World Animal Protection', url: 'https://www.worldanimalprotection.org' },
  { nombre: 'International Cat Care', url: 'https://icatcare.org' },
];
