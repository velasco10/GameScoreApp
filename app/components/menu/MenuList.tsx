// src/components/menu/MenuList.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; // Usa componentes nativos
import { MaterialIcons } from '@expo/vector-icons'; // Para íconos
import { useNavigation } from '@react-navigation/native';

const MenuList = () => {
  const navigation = useNavigation();

  const menuItems = [
    { label: 'Chinchon', icon: 'deck', route: '/chinchon' },
    { label: 'Tenis', icon: 'sports-tennis', route: '/tennis' },
    { label: 'Lanzamiento de Dado', icon: 'casino', route: '/dice' },
    { label: 'Contador', icon: 'exposure', route: '/counter' },
    { label: 'Lanzamiento de Moneda', icon: 'rule-folder', route: '/coin' },
    { label: 'Lanzamiento de Ruleta', icon: 'selection-ellipse-arrow-inside', route: '/name-input' },
  ];

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate(item.route)}>
          <MaterialIcons name={item.icon} size={60} color="lightgray" />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MenuList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: '45%',
    height: 150,
    backgroundColor: '#fff',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});
