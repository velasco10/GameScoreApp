// app/theme/theme.js
import { DefaultTheme } from 'react-native-paper'; // Importa el tema predeterminado de react-native-paper

// Define tu tema personalizado basado en el tema predeterminado de react-native-paper
const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1976D2', // Azul principal para tu aplicación
    secondary: '#DC004E', // Color secundario
    background: '#FFFFFF', // Fondo blanco
    text: '#000000', // Texto negro
  },
};

export default AppTheme;
