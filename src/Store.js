/* cria o store contendo todos os reducers */

import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import Reducers from './reducers'; //importa o arquivo index.js da pasta ./reducers

const persistedReducers = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage /* tipo de storage */,
    stateReconciler: hardSet,
    // whiteList: [], /* Reducers que ficarão gravados */
    // blackList: [] /* Reducers que NÃO ficarão gravados. Pode omitir*/
  },
  Reducers,
);

export const store = createStore(persistedReducers);
export const persistor = persistStore(store);
