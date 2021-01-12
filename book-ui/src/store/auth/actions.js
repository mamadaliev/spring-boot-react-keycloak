export const CHANGE_AUTH_STATUS = 'CHANGE_AUTH_STATUS'
export const CHANGE_AUTH_LOGIN = 'CHANGE_AUTH_LOGIN'
export const CHANGE_AUTH_PASSWORD = 'CHANGE_AUTH_PASSWORD'

export const setAuthStatus = (payload) => ({
  type: CHANGE_AUTH_STATUS,
  payload: payload
})

export const setAuthLogin = (payload) => ({
  type: CHANGE_AUTH_LOGIN,
  payload: payload
})

export const setAuthPassword = (payload) => ({
  type: CHANGE_AUTH_PASSWORD,
  payload: payload
})
