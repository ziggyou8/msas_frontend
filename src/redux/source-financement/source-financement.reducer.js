import sourceFinancementActionTypes from './source-financement.type';
const INITIAL_STATE ={
  sourceFinancements: [],
  acteurtField : [1]
}


const sourceFinancementReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case sourceFinancementActionTypes.GET_SOURCE_FINANCEMENT_DATA:
        return {
          ...state,
          sourceFinancements: action.payload
        };
      case sourceFinancementActionTypes.ADD_ACCTEUR_FIELD:
      return {
        ...state,
        acteurtField: [...state.acteurtField, state.acteurtField.length + 1]
      };
      case sourceFinancementActionTypes.REMOVE_ACCTEUR_FIELD:
      return {
        ...state,
        acteurtField: state.acteurtField.pop() && [...state.acteurtField]
      };
      default:
        return state;
    }
  };
  
  export default sourceFinancementReducer;