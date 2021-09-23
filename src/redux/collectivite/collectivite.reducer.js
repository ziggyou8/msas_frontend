import collectiviteTypeActions from './collectivite.types';

const INITIAL_STATE = {
    collectivites:[],
    regions:[],
    isFetching:false,
    messageError:undefined,
    collectiviteById:null,
    collectiviteByParentCode:null
  };
  
  const collectiviteReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case collectiviteTypeActions.FETCH_COLLECTIVITE_START:
        return{
          ...state,
          isFetching:true
        };
        case collectiviteTypeActions.FETCH_COLLECTIVITE_SUCCESS:
        return{
          ...state,
          isFetching:false,
          collectivites: action.payload
        };
        case collectiviteTypeActions.FETCH_REGION_SUCCESS:
        return{
          ...state,
          isFetching:false,
          regions: action.payload
        };
        case collectiviteTypeActions.FETCH_COLLECTIVITE_FAILLURE:
        return{
          ...state,
          isFetching:false,
          messageError: action.payload
        }
        case collectiviteTypeActions.STORE_COLLECTIVITE_SUCCESS:
        return{
          ...state,
          isFetching:false,
          collectivites: [...state.collectivites, action.payload]
        };
        case collectiviteTypeActions.UPDATE_COLLECTIVITE_SUCCESS:
         return{
          ...state,
          isFetching:false,
        };
        case collectiviteTypeActions.REMOVE_COLLECTIVITE_SUCCESS:
        return{
         ...state,
         isFetching:false,
         // collectivites: [...state.collectivites.filter(districte =>(districte.id !== action.payload))]
       };
        case collectiviteTypeActions.FETCH_COLLECTIVITE_BY_ID:
         return {
          ...state,
          isFetching:false,
          collectiviteById: action.payload
        };
        case collectiviteTypeActions.FETCH_COLLECTIVITE_BY_PARENT_CODE:
         return {
          ...state,
          isFetching:false,
          collectiviteByParentCode: action.payload
        };
        case collectiviteTypeActions.RESET_EDITED_COLLECTIVITE:
        return {
          ...state,
          isFetching:false,
          collectiviteById: null
        };
        case collectiviteTypeActions.RESET_COLLECTIVITE_BY_CODE_PARENT:
        return {
          ...state,
          isFetching:false,
          collectiviteByParentCode: null
        };
      default:
        return state;
    }
  };
  
  export default collectiviteReducer;
  