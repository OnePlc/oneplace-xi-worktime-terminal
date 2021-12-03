import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "./jwt.service";

/**
 * Service to call HTTP request via Axios
 */
const ApiService = {
  /**
   * Set API Defaults
   */
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = "https://api.ua.cut.gd";
    Vue.axios.defaults.withCredentials = true;
  },

  /**
   * Clean the Headers from Tokens (needed for re-login)
   */
  cleanHeader() {
    Vue.axios.defaults.headers.common = [];
    Vue.axios.defaults.headers.common["Accept"] = "application/json, text/plain, */*";
  },

  /**
   * Set the default HTTP request headers
   */
  setHeader() {
    Vue.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${JwtService.getToken()}`;
    console.log(Vue.axios.defaults.headers.common);
  },

  /**
   * Send the GET HTTP request
   * @param resource
   * @param slug
   * @returns {*}
   */
  get(resource, slug = "") {
    var url = `${resource}/${slug}`;
    if (slug == "") {
      url = `${resource}`;
    }
    return Vue.axios.get(`${url}`);
  },

  /**
   * Send the GET HTTP request
   * @param resource
   * @param slug
   * @returns {*}
   */
  getAuth(resource, slug = "") {
    var url = `${resource}/${slug}`;
    if (slug == "") {
      url = `${resource}`;
    }
    return Vue.axios.get(`${url}`,  { 'headers': { 'Authorization': `Bearer ${JwtService.getToken()}` }} );
  },

  /**
   * Set the POST HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */
  post(resource, params, config) {
    if(typeof config !== 'undefined') {
      return Vue.axios.post(`${resource}`, params, config);
    } else {
      return Vue.axios.post(`${resource}`, params);
    }
  },

  /**
   * Set the PATCH HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */
  patch(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  /**
   * Send the UPDATE HTTP request
   * @param resource
   * @param slug
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  /**
   * Send the PUT HTTP request
   * @param resource
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  put(resource, params, config) {
    if(typeof config !== 'undefined') {
      return Vue.axios.put(`${resource}`, params, config);
    } else {
      return Vue.axios.put(`${resource}`, params);
    }
  },

  /**
   * Send the DELETE HTTP request
   * @param resource
   * @returns {*}
   */
  delete(resource, options) {
    return Vue.axios.delete(`${resource}?captcha=${options.captcha}`);
  },

  /**
   * Send the DELETE HTTP request
   * @param resource
   * @returns {*}
   */
  deleteNoCaptcha(resource) {
    return Vue.axios.delete(`${resource}`);
  }
};

export default ApiService;
