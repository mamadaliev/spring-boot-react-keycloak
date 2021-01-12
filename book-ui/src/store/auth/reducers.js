import {AUTHENTICATED_STATUS} from "./actions";

const defaultState = {
  isAuthenticated: false
}

export const authReducer = (state = defaultState, action) => {
  if (action.type === AUTHENTICATED_STATUS) {
    return {...state, isAuthenticated: action.payload}
  } else {
    return state
  }
}
