import React, {useState, useEffect} from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    api.get('plants').then(response => {
      console.log(response.data);
      setPlants(response.data);
    });
  }, []);

  async function handleAddPlant() {
    const response = await api.post('plants', {
      name: `Nova planta: ${Date.now()}`,
      category: "Cotyledon"
    });

    const plant = response.data;
    setPlants([...plants, plant]);
  }

  return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#333"/>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={plants}
            keyExtractor={plant => plant.id}
            renderItem={({ item: plant }) => (
                <Text style={styles.plants}>{plant.name}</Text>
            )}
          />
          <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={handleAddPlant}>
            <Text style={styles.buttonText}>Adicionar planta</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </>
  );
}

const styles = StyleSheet.create({
  container: { // qualquer nome
    flex: 1, // todos os componentes display:flex por padrao
    backgroundColor: '#333333',
  },
  title: {
    color: '#FFF',
    fontSize: 20, // numeros podem passar sem aspas
    fontWeight: 'bold',
  },
  plants: {
    color: '#FFF',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
