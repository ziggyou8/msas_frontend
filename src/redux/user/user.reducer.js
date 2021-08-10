import userTypeActuions from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    listUsers:[],
    isFetching:false,
    messageError:undefined,
    userById:null,
  };
  
  const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case userTypeActuions.FETCH_USER_START:
        return{
          ...state,
          isFetching:true
        };
        case userTypeActuions.FETCH_USER_SUCCESS:
        return{
          ...state,
          isFetching:false,
          listUsers: action.payload
        };
        case userTypeActuions.FETCH_USER_FAILLURE:
        return{
          ...state,
          isFetching:false,
          messageError: action.payload
        }
      /* case userTypeActuions.SET_CURRENT_USER:
        return {
          ...state,
          currentUser: action.payload
        };
        case userTypeActuions.GET_USERS:
        return {
          ...state,
          listUsers: action.payload
        };
        case userTypeActuions.GET_USER:
        return {
          ...state,
          userById: action.payload
        }; */
      default:
        return state;
    }
  };
  
  export default userReducer;
  