// src/components/games/Dice.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import BackToMenuButton from '../common/BackToMenuButton'; // Botón para volver al menú

const Dice: React.FC = () => {
  const [diceNumber, setDiceNumber] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    let rollCount = 0;

    // Cambiar los números rápidamente para simular la animación de giro
    const interval = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      setDiceNumber(randomNumber);
      rollCount++;

      // Detener el giro después de 10 cambios
      if (rollCount > 10) {
        clearInterval(interval);
        const finalNumber = Math.floor(Math.random() * 6) + 1;
        setDiceNumber(finalNumber);
        setIsRolling(false);
      }
    }, 100); // Cambia el número del dado cada 100ms para simular el giro
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={rollDice} disabled={isRolling}>
        <MaterialCommunityIcons
          name={`dice-${diceNumber}`}
          size={100}
          color={isRolling ? 'grey' : '#4682B4'} // Color azul de la app
        />
      </TouchableOpacity>
      <Button
        mode="contained"
        onPress={rollDice}
        style={styles.button}
        disabled={isRolling}
        color="#4682B4" // Color azul de la app
      >
        {isRolling ? 'Lanzando...' : 'Lanzar Dado'}
      </Button>
      <BackToMenuButton />
    </View>
  );
};

export default Dice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4682B4', // Color de los botones acorde al tema de la app
  },
});
