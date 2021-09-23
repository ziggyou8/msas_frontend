import districteTypeActions from './districte.types';

const INITIAL_STATE = {
    districtes:[],
    isFetching:false,
    messageError:undefined,
    districteById:null
  };
  
  const districteReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case districteTypeActions.FETCH_DISTRICTE_START:
        return{
          ...state,
          isFetching:true
        };
        case districteTypeActions.FETCH_DISTRICTE_SUCCESS:
        return{
          ...state,
          isFetching:false,
          districtes: action.payload
        };
        case districteTypeActions.FETCH_DISTRICTE_FAILLURE:
        return{
          ...state,
          isFetching:false,
          messageError: action.payload
        }
        case districteTypeActions.STORE_DISTRICTE_SUCCESS:
        return{
          ...state,
          isFetching:false,
          districtes: [...state.districtes, action.payload]
        };
        case districteTypeActions.UPDATE_DISTRICTE_SUCCESS:
         return{
          ...state,
          isFetching:false,
        };
        case districteTypeActions.REMOVE_DISTRICTE_SUCCESS:
        return{
         ...state,
         isFetching:false,
         // districtes: [...state.districtes.filter(districte =>(districte.id !== action.payload))]
       };
        case districteTypeActions.FETCH_DISTRICTE_BY_ID:
         return {
          ...state,
          isFetching:false,
          districteById: action.payload
        };
        case districteTypeActions.RESET_EDITED_DISTRICTE:
        return {
          ...state,
          isFetching:false,
          districteById: null
        };
      default:
        return state;
    }
  };
  
  export default districteReducer;
  