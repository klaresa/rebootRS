import React, { useState, useEffect } from 'react';
import api from './services/api'

import './App.css'
import Header from './components/Header'

function App() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    api.get('/plants').then(response => {
      setPlants(response.data);
    });
  }, []);

  async function uAddPlant() {
    const response = await api.post('plants', {
      name: `Nova planta: ${Date.now()}`,
      category: "Sedum"
    });

    const plant = response.data; // pega a resposta do retorno do post

    setPlants([...plants, plant]); // cria uma nova var com valores antigos e novo
  }

  return (
      <>
        <Header title="Plantas" />

        <ul>
          {plants.map(plant => <li key={plant.id}>{ plant.name }</li>)}
          <button type="button" onClick={uAddPlant}>Adicionar</button>
        </ul>
      </>
  );
}

export default App;
