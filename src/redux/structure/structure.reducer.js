import structureActionTypes from './structure.type';
const INITIAL_STATE ={
    structures: [],
    typeActeur: null,
    currentStructure: null,
    isFetching:false,
    messageError:undefined
}


const structureReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case structureActionTypes.FETCH_STRUCTURE_START:
        return {
          ...state,
         isFetching:true
        };
      case structureActionTypes.FETCH_STRUCTURE_SUCCESS:
      return {
        ...state,
          isFetching:false,
          structures: action.payload
      };
      case structureActionTypes.FETCH_STRUCTURE_FAILLURE:
      return {
        ...state,
          isFetching:false,
          messageError: action.payload
      };
      default:
        return state;
    }
  };
  
  export default structureReducer;