import sourceFinancementActionTypes from './source-financement.type';
const INITIAL_STATE ={
  sourceFinancements: [],
  acteurtField : [1],
  isFetching:false,
  messageError:undefined
}


const sourceFinancementReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case sourceFinancementActionTypes.FETCH_SOURCE_FINANCEMENT_START:
        return {
          ...state,
         isFetching:true
        };
      case sourceFinancementActionTypes.FETCH_SOURCE_FINANCEMENT_SUCCESS:
      return {
        ...state,
          isFetching:false,
          sourceFinancements: action.payload
      };
      case sourceFinancementActionTypes.FETCH_SOURCE_FINANCEMENT_FAILLURE:
      return {
        ...state,
          isFetching:false,
          messageError: action.payload
      };
      default:
        return state;
    }
  };
  
  export default sourceFinancementReducer;