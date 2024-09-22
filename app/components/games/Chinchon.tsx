// src/components/games/Chinchon.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { useRoute } from '@react-navigation/native'; // Cambia useLocation por useRoute
import BackToMenuButton from '../common/BackToMenuButton';
import Constants from '../../utils/constants';

const Chinchon: React.FC = () => {
  const route = useRoute(); // Usamos useRoute en lugar de useLocation
  const playerNames = route.params?.playerNames || []; // Obtenemos los nombres desde los params
  const [scores, setScores] = useState<number[]>(Array(playerNames.length).fill(0));
  const [newScores, setNewScores] = useState<number[]>(Array(playerNames.length).fill(0));

  const handleScoreChange = (index: number, value: string) => {
    const newValues = [...newScores];
    newValues[index] = parseInt(value) || 0;
    setNewScores(newValues);
  };

  const handleSumScores = () => {
    const updatedScores = scores.map((score, index) => score + newScores[index]);
    setScores(updatedScores);
    setNewScores(Array(playerNames.length).fill(0));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{Constants.puntuation}</Text>

      {playerNames.map((name, index) => (
        <View key={index} style={styles.playerRow}>
          <Text style={styles.playerName}>{name}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={newScores[index] ? newScores[index].toString() : ''}
            onChangeText={(value) => handleScoreChange(index, value)}
          />
          <Text style={styles.score}>{scores[index]}</Text>
        </View>
      ))}

      <Button mode="contained" onPress={handleSumScores} style={styles.sumButton}>
        Sumar Puntajes
      </Button>

      <BackToMenuButton />
    </ScrollView>
  );
};

export default Chinchon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4682B4',
    borderRadius: 4,
    padding: 5,
    width: '20%',
    textAlign: 'center',
    marginRight: 10,
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4682B4',
    flex: 1,
    textAlign: 'center',
  },
  sumButton: {
    marginTop: 20,
    backgroundColor: '#4682B4',
  },
});
