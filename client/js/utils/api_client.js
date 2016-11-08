import axios from "axios";
import * as localStorage from "./user";

const xhr = axios.create({
  baseURL: "http://localhost:9393/"
})

xhr.interceptors.request.use(request => {
  let currentUser = localStorage.getUser();
  if(currentUser) {
    request.headers["Authorization"] = `Bearer ${currentUser.token}`
  }
  return request;
})

const ApiClient = {
  logIn (params) {
    return xhr.post("/sessions", params);
  },

  signUp (params) {
    return xhr.post("/signup", params);
  },

  getJogs() {
    return xhr.get("/jogs");
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
