import xhr from "./http_client";

const ApiClient = {
  logIn (params) {
    return xhr.post("/sessions", params);
  },

  signUp (params) {
    return xhr.post("/signup", params);
  },

  getJogs(userId, params) {
    return xhr.get(`/users/${userId}/jogs`, { params: params });
  },

  createJog(userId, params) {
    return xhr.post(`/users/${userId}/jogs`, params)
  },

  updateJog(userId, id, params) {
    return xhr.put(`/users/${userId}/jogs/${id}`, params)
  },

  deleteJog(userId, id) {
    return xhr.delete(`/users/${userId}/jogs/${id}`)
  }
}

export default ApiClient;
