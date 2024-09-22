import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Constants from '../../utils/constants';

const BackToMenuButton = () => {
  const navigation = useNavigation();

  const handleBackToMenu = () => {
    navigation.navigate(Constants.initialRoute);
  };

  return (
    <Button
      mode="contained"
      onPress={handleBackToMenu}
      style={{ marginTop: 20, alignSelf: 'center', backgroundColor: Constants.colorApp }}
    >
      Volver al Menú
    </Button>
  );
};

export default BackToMenuButton;
