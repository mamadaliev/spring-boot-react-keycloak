import {
  CHANGE_AUTH_STATUS,
  CHANGE_AUTH_LOGIN,
  CHANGE_AUTH_PASSWORD
} from "./actions";

const defaultState = {
  isLogged: false,
  login: '',
  password: ''
}

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_AUTH_STATUS:
      return {...state, isLogged: action.payload}
    case CHANGE_AUTH_LOGIN:
      return {...state, login: action.payload}
    case CHANGE_AUTH_PASSWORD:
      return {...state, password: action.payload}
    default:
      return state
  }
}
