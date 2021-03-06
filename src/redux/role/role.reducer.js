import roleTypeActuions from "./role.types";

const INITIAL_STATE = {
    roles:[],
    permissions:[],
    isFetching:false,
    messageError:undefined,
    roleById:null
  };
  
  const roleReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case roleTypeActuions.FETCH_ROLE_START:
        return{
          ...state,
          isFetching:true
        };
        case roleTypeActuions.FETCH_ROLE_SUCCESS:
        return{
          ...state,
          isFetching:false,
          roles: action.payload
        };
        case roleTypeActuions.FETCH_ROLE_FAILLURE:
        return{
          ...state,
          isFetching:false,
          messageError: action.payload
        }
        case roleTypeActuions.STORE_ROLE_SUCCESS:
        return{
          ...state,
          isFetching:false,
          roles: [...state.roles, action.payload]
        };
        case roleTypeActuions.UPDATE_ROLE_SUCCESS:
         return{
          ...state,
          isFetching:false,
        };
        case roleTypeActuions.REMOVE_ROLE_SUCCESS:
        return{
         ...state,
         isFetching:false,
         roles: [...state.roles.filter(role =>(role.id !== action.payload))]
       };
        case roleTypeActuions.FETCH_ROLE_BY_ID:
         return {
          ...state,
          isFetching:false,
          roleById: action.payload
        };
        case roleTypeActuions.FETCH_PERMISSION_SUCCESS:
        return{
          ...state,
          isFetching:false,
          permissions: action.payload
        };
        case roleTypeActuions.RESET_EDITED_ROLE:
        return {
          ...state,
          isFetching:false,
          roleById: null
        };
      default:
        return state;
    }
  };
  
  export default roleReducer;
  