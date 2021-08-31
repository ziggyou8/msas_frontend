import acteurTypeActuions from "./acteur.types";

const INITIAL_STATE = {
    acteurs:[],
    isFetching:false,
    messageError:undefined,
    acteurById:null,
    acteurByFinancement:[]
  };
  
  const acteurReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case acteurTypeActuions.FETCH_ACTEUR_START:
        return{
          ...state,
          isFetching:true
        };
        case acteurTypeActuions.FETCH_ACTEUR_SUCCESS:
        return{
          ...state,
          isFetching:false,
          acteurs: action.payload
        };
        case acteurTypeActuions.FETCH_ACTEUR_FAILLURE:
        return{
          ...state,
          isFetching:false,
          messageError: action.payload
        }
        case acteurTypeActuions.STORE_ACTEUR_SUCCESS:
        return{
          ...state,
          isFetching:false,
          acteurs: [...state.acteurs, action.payload]
        };
        case acteurTypeActuions.UPDATE_ACTEUR_SUCCESS:
         return{
          ...state,
          acteurs: [...state.acteurs.filter(acteur =>(acteur.id !== action.payload))],
          isFetching:false,
        };
        case acteurTypeActuions.REMOVE_ACTEUR_SUCCESS:
        return{
         ...state,
         isFetching:false,
         acteurs: [...state.acteurs.filter(acteur =>(acteur.id !== action.payload))]
       };
        case acteurTypeActuions.FETCH_ACTEUR_BY_ID:
         return {
          ...state,
          isFetching:false,
          acteurById: action.payload
        };
        case acteurTypeActuions.FETCH_ACTEUR_BY_FINACEMENT:
         return {
          ...state,
          isFetching:false,
          acteurByFinancement: action.payload
        };
      default:
        return state;
    }
  };
  
  export default acteurReducer;
  