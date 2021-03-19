# BASE_APP
Estrutura React Native pré configurada com Redux e Redux-Persist. Pronta para criação de app.


## Configurando Redux e Redux-Persist no React-Native

### 1º	Estrutura de pasta para colocar dentro do projeto
/* Após a criação base do projeto React-Native deve-se inserir a estrutura de pastas e arquivos abaixo na raiz do projeto*/

 
### 2º	Arquivo App.js 
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './src/Store';

const App = () => {
  return (
    /* Provider englobará todo o aplicativo, ele que disponibiliza os dados a serem persistidos por todo o app*/
    /* PersistGate recupera os dados salvos no dispositivo - (AsyncStorage) */
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}></PersistGate>
    </Provider>
  );
};

export default App;


### 3º	Arquivo Store.js 
/* cria o store contendo todos os reducers */

import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import Reducers from './reducers'; //importa o arquivo index.js da pasta ./reducers

const persistedReducers = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage, /* tipo de storage */
    stateReconciler: hardSet,
    // whiteList: [], /* Reducers que ficarão gravados */
    // blackList: [] /* Reducers que NÃO ficarão gravados. Pode omitir*/
  },
  Reducers,
);

export const store = createStore(persistedReducers);
export const persistor = persistStore(store);


### 4º	Criar os Reducers  
/* Cria os reducers para cada tipo de dado (Exemplo: userReducer – para dados do usuário)*/

/*Exemplo de state(dados) de usuário vindos de uma requisição, webservice etc*/
const initialState = {
  name: 'Fulano',
  email: 'ful@no.com',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return {...state, name: action.payload.name};
      break;
    case 'SET_EMAIL':
      return {...state, name: action.payload.email};
      break;
  }

  return state;
};


### 5º	Arquivo index.js dentro da pasta reducers  
/* src/reducers/index.js (unifica todos os reducers)*/

import {combineReducers} from 'redux';
import userReducer from './userReducer';

export default combineReducers({
  user: userReducer,
});


### 6º	Chamando dados nas telas (pages/screens)  
/* Nas telas (ex: página Home) conectamos as informações dos reducers passadas pelo Provider do redux */

import React from 'react';
import {SafeAreaView, Text, StyleSheet, Animated, Easing} from 'react-native';
import {connect} from 'react-redux';

const Home = (props) => {
  let image = new Animated.Value(0);

  Animated.loop(
    Animated.timing(image, {
      toValue: 1,
      duration: 7000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const spin = image.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image
        source={require('../assets/redux-react.png')}
        style={[styles.image, {transform: [{rotate: spin}]}]}
      />
      <Text style={styles.title}>{props.title}</Text> /* prop title sendo usada */
      <Text style={styles.description}>{props.description}</Text> /* prop description sendo usada */
    </SafeAreaView>
  );
};

/* A função mapStateToProps()  pega as informações do state do reducer e transforma em props para a Tela. Em outras palavras faz a leitura dos dados. */
const mapStateToProps = (state) => {
  return {
    title: state.example.title /* prop title */,
    description: state.example.description /* prop description */,
  };
};

/* A função mapDispatchToProps()  executa ações de acordo com os dados passados no dispatch para o state do reducer. Em outras palavras faz a escrita dos dados. Essas ações(métodos) se transformam em props para a tela. */
const mapDispatchToProps = (dispatch) => {
  return {
    /* prop setTitle() */
    setTitle: (title) => dispatch({type: 'SET_TITLE', payload: {title: title}}),
    /* prop setDescription() */
    setDescription: (description) =>
      dispatch({type: 'SET_DESCRIPTION', payload: {description: description}}),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#0033ff',
  },
  description: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  image: {
    width: 130,
    height: 120,
  },
});

/* o export deve ser agora no connect, seguido da execução da tela */
export default connect(mapStateToProps, mapDispatchToProps)(Home);





