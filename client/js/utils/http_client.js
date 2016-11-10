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

export default xhr;
