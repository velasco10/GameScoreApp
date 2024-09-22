// src/components/games/Tennis.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native'; 
import { Button } from 'react-native-paper';
import BackToMenuButton from '../common/BackToMenuButton'; 

const Tennis: React.FC = () => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Points, setPlayer1Points] = useState(0);
  const [player2Points, setPlayer2Points] = useState(0);
  const [player1Games, setPlayer1Games] = useState(0);
  const [player2Games, setPlayer2Games] = useState(0);
  const [player1Sets, setPlayer1Sets] = useState(0);
  const [player2Sets, setPlayer2Sets] = useState(0);
  const [deuce, setDeuce] = useState(false); 
  const [advantage, setAdvantage] = useState<string | null>(null); 

  const scoreMapping = ['0', '15', '30', '40', 'AV']; 

  const handlePoint = (player: 'player1' | 'player2') => {
    if (deuce) {
      if (advantage === player) {
        updateGameWinner(player);
      } else if (advantage === null) {
        setAdvantage(player); 
      } else {
        setAdvantage(null); 
      }
    } else {
      if (player === 'player1') {
        const newPoints = player1Points + 1;
        if (newPoints === 3 && player2Points === 3) {
          setPlayer1Points(3); // Ambos llegan a 40
          setPlayer2Points(3); // Ambos llegan a 40
          setDeuce(true);
        } else if (newPoints > 3) {
          updateGameWinner('player1');
        } else {
          setPlayer1Points(newPoints);
        }
      } else if (player === 'player2') {
        const newPoints = player2Points + 1;
        if (newPoints === 3 && player1Points === 3) {
          setPlayer1Points(3); // Ambos llegan a 40
          setPlayer2Points(3); // Ambos llegan a 40
          setDeuce(true);
        } else if (newPoints > 3) {
          updateGameWinner('player2');
        } else {
          setPlayer2Points(newPoints);
        }
      }
    }
  };

  const updateGameWinner = (player: 'player1' | 'player2') => {
    if (player === 'player1') {
      setPlayer1Games((prev) => prev + 1);
      checkSetWinner('player1', player1Games + 1);
    } else {
      setPlayer2Games((prev) => prev + 1);
      checkSetWinner('player2', player2Games + 1);
    }
    resetPoints();
  };

  const checkSetWinner = (player: 'player1' | 'player2', newGames: number) => {
    const opponentGames = player === 'player1' ? player2Games : player1Games;
    if (newGames >= 6 && newGames - opponentGames >= 2) {
      if (player === 'player1') {
        setPlayer1Sets((prev) => prev + 1);
      } else {
        setPlayer2Sets((prev) => prev + 1);
      }
      resetGames(); 
    }
  };

  const resetPoints = () => {
    setPlayer1Points(0);
    setPlayer2Points(0);
    setDeuce(false);
    setAdvantage(null);
  };

  const resetGames = () => {
    setPlayer1Games(0);
    setPlayer2Games(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Puntuación de Tenis</Text>

      {/* Fila de entrada de nombre y sumar puntos */}
      <View style={styles.playerRow}>
        <TextInput
          style={styles.input}
          placeholder="Jugador 1"
          value={player1Name}
          onChangeText={setPlayer1Name}
        />
        <Button mode="contained" onPress={() => handlePoint('player1')} style={styles.button}>
          Sumar
        </Button>
      </View>

      <View style={styles.playerRow}>
        <TextInput
          style={styles.input}
          placeholder="Jugador 2"
          value={player2Name}
          onChangeText={setPlayer2Name}
        />
        <Button mode="contained" onPress={() => handlePoint('player2')} style={styles.button}>
          Sumar
        </Button>
      </View>

      {/* Mostrar puntos, juegos y sets */}
      <View style={styles.scoresContainer}>
        <Text style={styles.nameLabel}>{player1Name || 'Jugador 1'}</Text>
        <View style={styles.scoreRow}>
          <View style={styles.scoreBox}>
            <Text>{advantage === 'player1' ? 'ADV' : scoreMapping[player1Points]}</Text>
          </View>
          <View style={styles.scoreBox}>
            <Text>{player1Games}</Text>
          </View>
          <View style={styles.scoreBox}>
            <Text>{player1Sets}</Text>
          </View>
        </View>

        <Text style={styles.nameLabel}>{player2Name || 'Jugador 2'}</Text>
        <View style={styles.scoreRow}>
          <View style={styles.scoreBox}>
            <Text>{advantage === 'player2' ? 'ADV' : scoreMapping[player2Points]}</Text>
          </View>
          <View style={styles.scoreBox}>
            <Text>{player2Games}</Text>
          </View>
          <View style={styles.scoreBox}>
            <Text>{player2Sets}</Text>
          </View>
        </View>
      </View>

      {/* Botón para volver al menú */}
      <BackToMenuButton />
    </View>
  );
};

export default Tennis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4682B4',
    marginLeft: 10,
  },
  scoresContainer: {
    marginTop: 20,
  },
  nameLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  scoreBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#4682B4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
