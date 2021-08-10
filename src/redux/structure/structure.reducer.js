import structureActionTypes from './structure.type';
const INITIAL_STATE ={
    structures: [],
    typeActeur: null,
    currentStructure: null
}


const structureReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case structureActionTypes.GET_STRUCTURE_DATA:
        return {
          ...state,
         structures: action.payload
        };
      case structureActionTypes.GET_TYPE_ACTEUR:
      return {
        ...state,
        typeActeur: action.payload
      };
      case structureActionTypes.GET_CURRENT_STRUCTURE:
      return {
        ...state,
        currentStructure: action.payload
      };
      default:
        return state;
    }
  };
  
  export default structureReducer;