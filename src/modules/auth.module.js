// imports
import JwtService from "../services/jwt.service";
import ApiService from "../services/api.service";

// actions
export const KEY_LOGIN = "publicAuthKeyLogin";

// mutations

/**
 * Authentication State
 */
const state = {
  authenticated: (JwtService.getToken() == '' || JwtService.getToken() == null) ? false: true
};

/**
 * Authentication Getters
 */
const getters = {
  isAuthenticated(state) {
    return state.authenticated;
  }
};

/**
 * Authentication Actions
 */
const actions = {
  [KEY_LOGIN]() {
    return new Promise(resolve => {
      ApiService.post("oauth", {
        "client_id": "vueprod",
        "client_secret": "J3s8bcMFRpnykLvF9DzrAmVf",
        "grant_type": "client_credentials"
      }, {})
      .then(({data}) => {
        //JwtService.saveToken(data.access_token);
        //JwtService.saveRefreshToken(data.refresh_token);
        resolve(data)
      })
    });
  }
};

/**
 * Authentication Mutations
 */
const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
}