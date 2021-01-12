export const AUTHENTICATED_STATUS = 'AUTH_CHANGE_EMAIL'

export const setAuthenticated = (payload) => ({
  type: AUTHENTICATED_STATUS,
  payload: payload
})
