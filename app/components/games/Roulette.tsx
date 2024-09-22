import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg'; // Usamos react-native-svg para dibujar la ruleta
import { Button } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import BackToMenuButton from '../common/BackToMenuButton';

const Roulette: React.FC = () => {
  const route = useRoute();
  const names = route.params?.playerNames || []; // Recibe los nombres desde state
  const [isSpinning, setIsSpinning] = useState(false);
  const animatedRotation = useRef(new Animated.Value(0)).current; // Valor animado para la rotación
  const [colors, setColors] = useState<string[]>([]); // Estado para almacenar los colores de las secciones

  const anglePerSlice = 360 / names.length;

  // Generador de colores aleatorios
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const generatedColors = names.map(() => getRandomColor());
    setColors(generatedColors);
  }, [names]);

  // Función para generar los arcos del SVG
  const createArc = (index: number) => {
    const startAngle = (index * anglePerSlice) - 90;
    const endAngle = startAngle + anglePerSlice;
    const largeArcFlag = anglePerSlice > 180 ? 1 : 0;

    const x1 = 50 + 50 * Math.cos((startAngle * Math.PI) / 180);
    const y1 = 50 + 50 * Math.sin((startAngle * Math.PI) / 180);
    const x2 = 50 + 50 * Math.cos((endAngle * Math.PI) / 180);
    const y2 = 50 + 50 * Math.sin((endAngle * Math.PI) / 180);

    return `M50,50 L${x1},${y1} A50,50 0 ${largeArcFlag},1 ${x2},${y2} Z`;
  };

  // Función para girar la ruleta con un mínimo de rotación y parada aleatoria
  const spinRoulette = () => {
    setIsSpinning(true);

    // Añadimos una rotación aleatoria extra para que se detenga en cualquier lugar
    const randomExtraSpin = Math.floor(Math.random() * anglePerSlice); // Rotación extra aleatoria dentro del segmento
    const minRotation = 360 * 5; // Mínimo de 5 vueltas completas
    const targetRotation = minRotation + randomExtraSpin * Math.floor(Math.random() * 360); // Rotación con mínimo y aleatorio

    // Animación de rotación usando Animated
    Animated.timing(animatedRotation, {
      toValue: targetRotation, // El valor de rotación que queremos
      duration: 3000, // Duración de la animación en milisegundos
      useNativeDriver: true, // Usamos Native Driver para optimizar la animación
    }).start(() => {
      setIsSpinning(false);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ruleta de Selección</Text>

      {/* Contenedor de la ruleta */}
      <View style={styles.rouletteContainer}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: animatedRotation.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          }}
        >
          <Svg width="300" height="300" viewBox="0 0 100 100">
            {names.map((name, index) => (
              <G key={index}>
                <Path
                  d={createArc(index)}
                  fill={colors[index]} // Usamos los colores fijos generados
                  stroke="#fff"
                  strokeWidth="0.5"
                />
                <SvgText
                  x="50"
                  y="10"
                  fill="#fff"
                  fontSize="3"
                  textAnchor="middle"
                  transform={`rotate(${index * anglePerSlice + anglePerSlice / 2}, 50, 50) translate(0, 8)`}
                >
                  {name}
                </SvgText>
              </G>
            ))}
          </Svg>
        </Animated.View>
      </View>

      {/* Flecha indicadora */}
      <View style={styles.arrow} />

      {/* Botón para girar */}
      <Button mode="contained" onPress={spinRoulette} disabled={isSpinning} style={styles.button}>
        {isSpinning ? 'Girando...' : 'Girar Ruleta'}
      </Button>

      {/* Botón para volver al menú */}
      <BackToMenuButton />
    </View>
  );
};

export default Roulette;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rouletteContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#4682B4',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4682B4',
  },
});
