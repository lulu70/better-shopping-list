import React from 'react';
import { Platform, UIManager } from 'react-native';

import MainContextProvider from './src/context/MainContext/MainContextProvider';
import Main from './src/screens/Main';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  return (
    <MainContextProvider>
      <Main />
    </MainContextProvider>
  );
};

export default App;
