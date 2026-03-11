import React from 'react';
import Header from './components/Header';
import FotosGallery from './components/FotosGallery';
import DatosCuriosos from './components/DatosCuriosos';
import Razas from './components/Razas';
import EnlacesExternos from './components/EnlacesExternos';
import JuegoPolilla from './components/JuegoPolilla';
import { headerData, fotos, datosCuriosos, razas, enlaces } from './data/datos';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header data={headerData} />
      <main>
        <FotosGallery fotos={fotos} />
        <DatosCuriosos datos={datosCuriosos} />
        <JuegoPolilla />
        <Razas razas={razas} />
        <EnlacesExternos enlaces={enlaces} />
      </main>
    </div>
  );
}

export default App;
