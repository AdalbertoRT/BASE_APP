/* src/reducers/index.js (unifica todos os reducers)*/

import {combineReducers} from 'redux';
import exampleReducer from './exampleReducer';

export default combineReducers({
  example: exampleReducer,
});
