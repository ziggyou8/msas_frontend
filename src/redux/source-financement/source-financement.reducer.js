import sourceFinancementActionTypes from './source-financement.type';
const INITIAL_STATE ={
  sourceFinancements: [],
  sourceFinancementById:null,
  acteurtField : 1,
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
      case sourceFinancementActionTypes.STORE_SOURCE_FINANCEMENT_SUCCESS:
        return{
          ...state,
          isFetching:false,
          sourceFinancements: [...state.sourceFinancements, action.payload]
        };
        case sourceFinancementActionTypes.UPDATE_SOURCE_FINANCEMENT_SUCCESS:
         return{
          ...state,
          //sourceFinancements: [...state.sourceFinancements.filter(finance =>(finance.id !== action.payload))],
          isFetching:false,
        };
        case sourceFinancementActionTypes.REMOVE_SOURCE_FINANCEMENT_SUCCESS:
        return{
         ...state,
         isFetching:false,
         sourceFinancements: [...state.sourceFinancements.filter(finance =>(finance.id !== action.payload))]
       };
        case sourceFinancementActionTypes.FETCH_SOURCE_FINANCEMENT_BY_ID:
         return {
          ...state,
          isFetching:false,
          sourceFinancementById: action.payload
        };
        case sourceFinancementActionTypes.ADD_ACCTEUR_FIELD:
         return {
          ...state,
          acteurtField: state.acteurtField +1
        };
        case sourceFinancementActionTypes.REMOVE_ACCTEUR_FIELD:
         return {
          ...state,
          acteurtField: state.acteurtField -1
        };
        case sourceFinancementActionTypes.RESET_EDITED_SOURCE_FINANCEMENT:
        return {
          ...state,
          isFetching:false,
          sourceFinancementById: null
        };
      default:
        return state;
    }
  };
  
  export default sourceFinancementReducer;