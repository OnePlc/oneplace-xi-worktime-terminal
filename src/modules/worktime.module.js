// imports
import ApiService from "../services/api.service";

// actions
export const SEND_TIMESTAMP = "sendWorkTimeStamp";

// mutations

/**
 * Worktime State
 */
const state = {
  error: ''
};

/**
 * Worktime Getters
 */
const getters = {
  hasWorkTimeQryError(state) {
    if(state.error == '') {
      return false;
    } else {
      return true;
    }
  },
  getWorkTimeQryErrorMsg(state) {
    return state.error;
  }
};

/**
 * Worktime Actions
 */
const actions = {
  [SEND_TIMESTAMP](context, payload) {
    return new Promise(resolve => {
      ApiService.put("worktime", [payload.data], { 'headers': { 'Authorization': `Bearer ${payload.token}` }})
      .then(({data}) => {
        resolve(data)
      }).catch(({response}) => {
        // set default error message
        state.error = "Unknown Error";

        if (response.status !== undefined) {
          switch (response.status) {
            case 401:
              //context.commit(REFRESH_TOKEN);
              break;
            default:
              break;
          }
          // try to get error message from api server
          if(response.data !== undefined) {
            if(response.data.detail !== undefined) {
              state.error = response.data.detail
            }
          }
        }

        // go back to view
        resolve(response);
      });
    });
  }
};

/**
 * Worktime Mutations
 */
const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
}