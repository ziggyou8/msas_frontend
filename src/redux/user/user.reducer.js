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
        case userTypeActuions.FETCH_CURRENT_USER_SUCCESS:
        return{
          ...state,
          isFetching:false,
          currentUser: action.payload
        }
        case userTypeActuions.STORE_USER_SUCCESS:
        return{
          ...state,
          isFetching:false,
          listUsers: [...state.listUsers, action.payload]
        };
        case userTypeActuions.UPDATE_USER_SUCCESS:
         return{
          ...state,
          isFetching:false,
          //listUsers: [...state.listUsers.map(users =>(users.id !== action.payload.id)), action.payload]
        };
        case userTypeActuions.UPDATE_CURRENT_USER_SUCCESS:
         return{
          ...state,
          isFetching:false,
          currentUser:  action.payload
        };
        case userTypeActuions.REMOVE_USER_SUCCESS:
          
        return{
         ...state,
         isFetching:false,
         listUsers: [...state.listUsers.filter(user =>(user.id !== action.payload))]
       };
        case userTypeActuions.FETCH_USER_BY_ID:
         return {
          ...state,
          isFetching:false,
          userById: action.payload
        };
       case userTypeActuions.RESET_EDITED_USER:
        return {
          ...state,
          isFetching:false,
          userById: null
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  