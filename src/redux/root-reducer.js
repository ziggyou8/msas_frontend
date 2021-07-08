import { combineReducers } from 'redux';

import userReducer from './user/user.reducer.js';
import structureReducer from './structure/structure.reducer';
import sourceFinancementReducer from './source-financement/source-financement.reducer';

export default combineReducers({
  user: userReducer,
  structure: structureReducer,
  sourceFinancements: sourceFinancementReducer
});