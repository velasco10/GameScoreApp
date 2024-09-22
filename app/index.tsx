import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './components/menu/Menu';
import NameInputPage from './components/menu/NameInputPage';
import Chinchon from './components/games/Chinchon';
import Coin from './components/games/Coin';
import Counter from './components/games/Counter';
import Dice from './components/games/Dice';
import Tennis from './components/games/Tennis';
import Roulette from './components/games/Roulette';
import Constants from './utils/constants';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={Constants.initialRoute} screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name={Constants.initialRoute}
        component={Menu} 
        options={{ title: 'Menu' }} 
      />
      <Stack.Screen 
        name={Constants.chinchonSetupRoute} 
        component={NameInputPage} 
        initialParams={{ game: 'chinchon', buttonLabel: 'Comenzar Chinchón' }} 
        options={{ title: 'Configurar Chinchón' }}
      />
      <Stack.Screen 
        name={Constants.rouletteSetupRoute} 
        component={NameInputPage} 
        initialParams={{ game: 'roulette', buttonLabel: 'Comenzar Ruleta' }} 
        options={{ title: 'Configurar Ruleta' }}
      />
      <Stack.Screen 
        name={Constants.chinchonRoute} 
        component={Chinchon} 
        options={{ title: 'Chinchon' }} 
      />
      <Stack.Screen 
        name={Constants.coinRoute} 
        component={Coin} 
        options={{ title: 'Lanzamiento de Moneda' }} 
      />
      <Stack.Screen 
        name={Constants.counterRoute} 
        component={Counter} 
        options={{ title: 'Contador' }} 
      />
      <Stack.Screen 
        name={Constants.diceRoute} 
        component={Dice} 
        options={{ title: 'Lanzamiento de Dado' }} 
      />
      <Stack.Screen 
        name={Constants.tennisRoute} 
        component={Tennis} 
        options={{ title: 'Tenis' }} 
      />
      <Stack.Screen 
        name={Constants.rouletteRoute} 
        component={Roulette} 
        options={{ title: 'Ruleta' }} 
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
