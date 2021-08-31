import structureActionTypes from './structure.type';
const INITIAL_STATE ={
    structures: [],
    structureById:null,
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
      case structureActionTypes.STORE_STRUCTURE_SUCCESS:
        return{
          ...state,
          isFetching:false,
          structures: [...state.structures, action.payload]
        };
        case structureActionTypes.UPDATE_STRUCTURE_SUCCESS:
         return{
          ...state,
          structures: [...state.structures.filter(structure =>(structure.id !== action.payload))],
          isFetching:false,
        };
        case structureActionTypes.REMOVE_STRUCTURE_SUCCESS:
        return{
         ...state,
         isFetching:false,
         structures: [...state.structures.filter(structure =>(structure.id !== action.payload))]
       };
        case structureActionTypes.FETCH_STRUCTURE_BY_ID:
         return {
          ...state,
          isFetching:false,
          structureById: action.payload
        };
        case structureActionTypes.RESET_EDITED_STRUCTURE:
        return {
          ...state,
          isFetching:false,
          structureById: null
        };
      default:
        return state;
    }
  };
  
  export default structureReducer;