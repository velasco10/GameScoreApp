// src/components/menu/Menu.tsx
import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from '../../utils/constants';

const Menu: React.FC = () => {

const navigation = useNavigation();

  const menuItems = [
    { label: Constants.chinchonGame, icon: 'cards-playing-outline', route: Constants.chinchonSetupRoute, game: 'chinchon' },
    { label: Constants.tennisGame, icon: 'tennis', route: Constants.tennisRoute, game: 'tennis' },
    { label: Constants.diceGame, icon: 'dice-multiple', route: Constants.diceRoute, game: 'dice' },
    { label: Constants.counterGame, icon: 'counter', route: Constants.counterRoute, game: 'counter' },
    { label: Constants.coinGame, icon: 'hand-coin-outline', route: Constants.coinRoute, game: 'coin' },
    { label: Constants.rouletteGame, icon: 'selection-ellipse-arrow-inside', route: Constants.rouletteSetupRoute, game: 'roulette' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{Constants.appName}</Text>
      </View>
      <View style={styles.container}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(item.route, { game: item.game })}
          >
            <View style={styles.cardContent}>
              <MaterialCommunityIcons name={item.icon} size={60} color="#4682B4" />
              <Text style={styles.cardText}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
  },
  titleContainer: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#4682B4',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  card: {
    width: '45%',
    height: 150,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
