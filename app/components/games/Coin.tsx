// src/components/games/Coin.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; // Componentes nativos de RN
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Utilizamos los iconos de 'expo'
import { Button } from 'react-native-paper'; // Usamos los botones de 'react-native-paper'
import BackToMenuButton from '../common/BackToMenuButton'; // Importa el botón para volver al menú

const Coin: React.FC = () => {
  const [isHeads, setIsHeads] = useState(true); // Estado para la cara o cruz
  const [isSpinning, setIsSpinning] = useState(false); // Estado para el giro de la moneda
  const [alternateIcon, setAlternateIcon] = useState(true); // Estado para alternar el icono durante el giro

  const flipCoin = () => {
    setIsSpinning(true); // Inicia el giro
    setAlternateIcon(true); // Resetea el estado de alternancia

    // Alterna los iconos de manera continua mientras gira
    const iconInterval = setInterval(() => {
      setAlternateIcon(prev => !prev); // Alterna entre los iconos de cara y cruz
    }, 150);

    setTimeout(() => {
      clearInterval(iconInterval); // Detenemos la alternancia de iconos
      const heads = Math.random() > 0.5; // Determina aleatoriamente si es cara o cruz
      setIsHeads(heads); // Actualiza el estado de la moneda
      setIsSpinning(false); // Termina el giro
    }, 1000); // El giro dura un segundo
  };

  const getIcon = () => {
    if (isSpinning) {
      // Alterna entre icono de cara y cruz durante el giro
      return alternateIcon ? 'face-man' : 'close-circle-outline';
    }
    // Muestra el resultado final (cara o cruz) después de detenerse
    return isHeads ? 'face-man' : 'close-circle-outline';
  };

  return (
    <View style={styles.container}>
      {/* Icono de la moneda */}
      <TouchableOpacity onPress={flipCoin} disabled={isSpinning}>
        <MaterialCommunityIcons
          name={getIcon()}
          size={150}
          color='gray'// Cambia de color mientras gira
        />
      </TouchableOpacity>

      {/* Texto que indica si es cara o cruz */}
      <Text style={styles.resultText}>
        {isSpinning ? 'Girando...' : isHeads ? '¡Cara!' : '¡Cruz!'}
      </Text>

      {/* Botón para lanzar la moneda */}
      <Button mode="contained" onPress={flipCoin} style={styles.button} disabled={isSpinning}>
        {isSpinning ? 'Lanzando...' : 'Lanzar Moneda'}
      </Button>

      {/* Botón para volver al menú */}
      <BackToMenuButton />
    </View>
  );
};

export default Coin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    marginVertical: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4682B4',
  },
});
