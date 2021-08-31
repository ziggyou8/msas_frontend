import { combineReducers } from 'redux';

import userReducer from './user/user.reducer.js';
import structureReducer from './structure/structure.reducer';
import sourceFinancementReducer from './source-financement/source-financement.reducer';
import roleReducer from './role/role.reducer';
import acteurReducer from './acteur/acteur.reducer.js';

export default combineReducers({
  user: userReducer,
  structure: structureReducer,
  role:roleReducer,
  acteur:acteurReducer,
  sourceFinancements: sourceFinancementReducer
});