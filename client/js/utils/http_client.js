import axios from "axios";
import * as localStorage from "./user";

const apiHost = "http://localhost:9393"

const xhr = axios.create({
  baseURL: apiHost
})

xhr.interceptors.request.use(request => {
  let currentUser = localStorage.getUser();
  if(currentUser) {
    request.headers["Authorization"] = `Bearer ${currentUser.token}`
    if(currentUser.role == "admin" || currentUser.role == "user_manager") {
      request.url = request.url.replace(apiHost, `${apiHost}/admin`)
    }
  }
  return request;
})

export default xhr;
