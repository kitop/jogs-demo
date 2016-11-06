import axios from "axios";

const xhr = axios.create({
  baseURL: "http://localhost:9393/"
})

const ApiClient = {
  logIn (params) {
    return xhr.post("/sessions", params);
  },

  signUp (params) {
    return xhr.post("/signup", params);
  }
}

export default ApiClient;
