// src/components/menu/NameInputPage.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text } from 'react-native';
import { Button, List, IconButton } from 'react-native-paper'; 
import BackToMenuButton from '../common/BackToMenuButton';
import { useNavigation, useRoute } from '@react-navigation/native';

const NameInputPage: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute(); 

  const { game, buttonLabel }  = route.params || {};
  const [names, setNames] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');


  const handleAddName = () => {
    if (inputValue.trim()) {
      setNames([...names, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleDeleteName = (index: number) => {
    const newNames = [...names];
    newNames.splice(index, 1);
    setNames(newNames);
  };

  const handleStart = () => {
    if (names.length > 0) {
      if (game === 'chinchon') {
        navigation.navigate('chinchon', { playerNames: names });
      } else if (game === 'roulette') {
        navigation.navigate('roulette', { playerNames: names });
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Input para añadir nombres */}
      <TextInput
        style={styles.input}
        placeholder="Introduce el nombre"
        value={inputValue}
        onChangeText={setInputValue}
        onSubmitEditing={handleAddName}
      />

      {/* Botón para añadir nombres */}
      <Button mode="contained" onPress={handleAddName} style={styles.button}>
        Añadir Jugador
      </Button>

      {/* Lista de jugadores con botón de eliminar */}
      <FlatList
        data={names}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <IconButton
              icon="minus-circle-outline"
              color="#4682B4"
              onPress={() => handleDeleteName(index)}
            />
            <Text style={styles.playerName}>{item}</Text>
          </View>
        )}
      />

      {/* Botón para comenzar el juego */}
      <Button mode="contained" onPress={handleStart} style={styles.startButton} disabled={names.length === 0}>
        {buttonLabel}
      </Button>

      {/* Botón para volver al menú */}
      <BackToMenuButton />
    </View>
  );
};

export default NameInputPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#4682B4',
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4682B4',
    marginVertical: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  playerName: {
    fontSize: 16,
  },
  startButton: {
    marginTop: 20,
    backgroundColor: '#4682B4',
  },
  backButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  text: {
    color: '#4682B4',
  },
});
