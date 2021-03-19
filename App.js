import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import HomeScreen from './src/screens/HomeScreen';
import {store, persistor} from './src/Store';

const App = () => {
  return (
    /* Provider englobará todo o aplicativo, ele que disponibiliza os dados a serem persistidos por todo o app*/
    /* PersistGate recupera os dados salvos no dispositivo - (AsyncStorage) */
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HomeScreen />
      </PersistGate>
    </Provider>
  );
};

export default App;
