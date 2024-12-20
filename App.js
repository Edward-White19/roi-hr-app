import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigator';
import { PaperProvider } from 'react-native-paper';
import { RoiThemeProvider, useRoiTheme } from './components/RoiThemeContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <RoiThemeProvider>
        <Main />
      </RoiThemeProvider>
    </SafeAreaProvider>
  );
}

function Main() {
  const { theme } = useRoiTheme();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
