import investissementTypeActuions from "./investissement.types";

const INITIAL_STATE = {
  investissementsByStructure: [],
  investissements: [],
  isFetching: false,
  messageError: undefined,
  investissementById: null,
};

const investissementReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case investissementTypeActuions.FETCH_INVESTISSEMENT_START:
      return {
        ...state,
        isFetching: true,
      };
    case investissementTypeActuions.FETCH_INVESTISSEMENT_BY_STRUCTURE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        investissementsByStructure: action.payload,
      };
    case investissementTypeActuions.FETCH_INVESTISSEMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        investissements: action.payload,
      };
    case investissementTypeActuions.FETCH_INVESTISSEMENT_FAILLURE:
      return {
        ...state,
        isFetching: false,
        messageError: action.payload,
      };
    case investissementTypeActuions.STORE_INVESTISSEMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        investissementsByStructure: [
          ...state.investissementsByStructure,
          action.payload,
        ],
      };
    case investissementTypeActuions.UPDATE_INVESTISSEMENT_SUCCESS:
      return {
        ...state,
        investissementsByStructure: [
          ...state.investissementsByStructure.filter(
            (investissement) => investissement.id !== action.payload
          ),
        ],
        isFetching: false,
      };
    case investissementTypeActuions.REMOVE_INVESTISSEMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        investissementsByStructure: [
          ...state.investissementsByStructure.filter(
            (investissement) => investissement.id !== action.payload
          ),
        ],
      };
    case investissementTypeActuions.FETCH_INVESTISSEMENT_BY_ID_SUCCESS:
      return {
        ...state,
        isFetching: false,
        investissementById: action.payload,
      };
    case investissementTypeActuions.VALIDATION_INVESTISSEMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case investissementTypeActuions.REJECT_INVESTISSEMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default investissementReducer;
