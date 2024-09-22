// src/components/games/Counter.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'; // Componentes nativos de React Native
import { Button, FAB } from 'react-native-paper'; // Usamos los botones de 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Iconos de expo-vector-icons
import BackToMenuButton from '../common/BackToMenuButton'; // Importa el botón para volver al menú

const Counter: React.FC = () => {
  const [counter, setCounter] = useState(0); // Estado para el contador

  // Funciones para incrementar y decrementar el contador
  const incrementCounter = () => setCounter(counter + 1);
  const decrementCounter = () => setCounter(counter - 1);
  const incrementCounter10 = () => setCounter(counter + 10);
  const decrementCounter10 = () => setCounter(counter - 10);

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Contador: {counter}</Text>

      <View style={styles.buttonContainer}>
        <FAB color='white' icon="plus" onPress={incrementCounter} style={styles.fab} />
        <FAB color='white' icon="minus" onPress={decrementCounter} style={styles.fab} />
        <FAB color='white' icon="fast-forward-10" onPress={incrementCounter10} style={styles.fab} />
        <FAB color='white' icon="rewind-10" onPress={decrementCounter10} style={styles.fab} />
      </View>

      <Button mode="contained" onPress={() => setCounter(0)} style={styles.resetButton}>
        Resetear
      </Button>
      <BackToMenuButton />
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  counterText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginVertical: 20,
  },
  fab: {
    margin: 8,
    backgroundColor: '#4682B4',
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: "#4682B4" // 
  },
});
