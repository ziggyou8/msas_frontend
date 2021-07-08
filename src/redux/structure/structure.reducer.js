import structureActionTypes from './structure.type';
const INITIAL_STATE ={
    structure: [],
    typeActeur: null
}


const structureReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case structureActionTypes.GET_STRUCTURE_DATA:
        return {
          ...state,
         structure: action.payload
        };
      case structureActionTypes.GET_TYPE_ACTEUR:
      return {
        ...state,
        typeActeur: action.payload
      };
      default:
        return state;
    }
  };
  
  export default structureReducer;