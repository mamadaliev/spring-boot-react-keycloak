const constants = {
    // API
    API_GATEWAY: 'http://localhost:8080',
    API_AUTH: 'http://localhost:7070/auth',
    API_TOKEN: 'http://localhost:7070/auth/realms/dev/protocol/openid-connect/token',

    // OAuth2
    OAUTH2_REALM: 'dev',
    OAUTH2_CLIENT_ID: 'book',
    OAUTH2_CLIENT_SECRET: 'cb7b497c-b04a-4070-9e0d-74250dfa7f65',
    OAUTH2_GRANT_TYPE: {
        PASSWORD: 'password',
        REFRESH_TOKEN: 'refresh_token'
    },

    // Local storage keys
    KEY_ACCESS_TOKEN: 'access_token',
    KEY_REFRESH_TOKEN: 'refresh_token',
    KEY_EXPIRES_IN: 'expires_in',
    KEY_LOGGED_BEFORE: 'logged_before'
}

module.exports = constants;
