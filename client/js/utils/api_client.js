import xhr from "./http_client";

const ApiClient = {
  logIn (params) {
    return xhr.post("/sessions", params);
  },

  signUp (params) {
    return xhr.post("/signup", params);
  },

  getJogs(params) {
    return xhr.get("/jogs", { params: params });
  },

  createJog(params) {
    return xhr.post("/jogs", params)
  },

  updateJog(id, params) {
    return xhr.put(`/jogs/${id}`, params)
  },

  deleteJog(id) {
    return xhr.delete(`/jogs/${id}`)
  }
}

export default ApiClient;
