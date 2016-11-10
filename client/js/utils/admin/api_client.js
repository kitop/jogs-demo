import xhr from "../http_client";

const AdminApiClient = {
  getUsers () {
    return xhr.get("/users");
  },

  deleteUser(id) {
    return xhr.delete(`/users/${id}`);
  },

  createUser(params) {
    return xhr.post("/users", params);
  },

  editUser(id, params) {
    return xhr.put(`/users/${id}`, params);
  },
}

export default AdminApiClient;
