import React from 'react';
import { Platform, UIManager } from 'react-native';

import MainContextProvider from './src/context/MainContext/MainContextProvider';
import SearchContextProvider from './src/context/SearchContext/SearchContextProvider';
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
      <SearchContextProvider>
        <Main />
      </SearchContextProvider>
    </MainContextProvider>
  );
};

export default App;
