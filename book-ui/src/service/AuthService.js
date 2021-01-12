import axios from 'axios';
import qs from 'qs';

import constants from '../helpers/constants.js'

// noinspection JSUnusedGlobalSymbols
export function logout() {
  window.localStorage.removeItem(constants.KEY_ACCESS_TOKEN);
  window.localStorage.removeItem(constants.KEY_REFRESH_TOKEN);
  window.localStorage.removeItem(constants.KEY_EXPIRES_IN);
}

export function login(username, password) {
  const data = qs.stringify({
    'grant_type': constants.OAUTH2_GRANT_TYPE.PASSWORD,
    'client_id': constants.OAUTH2_CLIENT_ID,
    'client_secret': constants.OAUTH2_CLIENT_SECRET,
    'username': username,
    'password': password
  });

  const config = {
    method: 'post',
    url: constants.API_TOKEN,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data : data
  };

  axios(config)
    .then(function (response) {
      console.log(response.data);
      let accessToken = 'access_token' in response.data ? response.data.access_token : null;
      let refreshToken = 'refresh_token' in response.data ? response.data.refresh_token : null;
      authenticate(accessToken, refreshToken);
    })
    .catch(function () {
      console.log('Invalid credentials for authentication.');
    });
}

export function authenticate(accessToken, refreshToken) {
  if (!accessToken || !refreshToken) {
    console.warn(`Got bad token while logging in.\nAccess Token: ${accessToken}.\nRefresh Token: ${refreshToken}`);
  }

  let loggedBefore = (new Date().getTime() + 60 * 60 * 1000).toString();

  window.localStorage.setItem(constants.KEY_ACCESS_TOKEN, accessToken);
  window.localStorage.setItem(constants.KEY_LOGGED_BEFORE, loggedBefore);
  window.localStorage.setItem(constants.KEY_REFRESH_TOKEN, refreshToken);
}

export async function refreshAccessToken() {
  const refreshToken = getRefreshToken();

  if (refreshToken === null) {
    return null;
  }

  const data = qs.stringify({
    'client_id': constants.OAUTH2_CLIENT_ID,
    'client_secret': constants.OAUTH2_CLIENT_SECRET,
    'grant_type': constants.OAUTH2_GRANT_TYPE.REFRESH_TOKEN,
    'refresh_token': getRefreshToken()
  });

  const config = {
    method: 'post',
    url: constants.API_TOKEN,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data : data
  };

  axios(config)
    .then(function (response) {
      if (response.status === 200) {
        console.log(response.data);
        console.log('SYSTEM: Access token was taken, system are trying to login with the access token...');
        let accessToken = 'access_token' in response.data ? response.data.access_token : null;
        authenticate(accessToken, refreshToken);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function getRefreshToken() {
  return window.localStorage.getItem(constants.KEY_REFRESH_TOKEN);
}

// noinspection JSUnusedGlobalSymbols
export async function getAccessToken() {
  const loggedBefore = window.localStorage.getItem(constants.KEY_LOGGED_BEFORE)
  const accessToken = window.localStorage.getItem(constants.KEY_ACCESS_TOKEN)

  if (!accessToken) {
    await refreshAccessToken();
  }

  if (accessToken && loggedBefore <= new Date().getTime()) {
    console.log('SYSTEM: Access token expired, system are trying to refresh the access token...');
    return await refreshAccessToken();
  }
  return accessToken;
}

// noinspection JSUnusedGlobalSymbols
export function isAuthenticated() {
  console.log(!!getRefreshToken())
  return !!getRefreshToken();
}
