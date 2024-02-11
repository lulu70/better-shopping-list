import React from 'react';

import MainContextProvider from './src/context/MainContext/MainContextProvider';
import Main from './src/screens/Main';

const App = () => {
  return (
    <MainContextProvider>
      <Main />
    </MainContextProvider>
  );
};

export default App;
