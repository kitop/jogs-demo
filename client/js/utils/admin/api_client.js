import xhr from "../http_client";

const AdminApiClient = {
  getUsers () {
    return xhr.get("/admin/users");
  },

  deleteUser(id) {
    return xhr.delete(`/admin/users/${id}`);
  },

  createUser(params) {
    return xhr.post("/admin/users", params);
  },

  editUser(id, params) {
    return xhr.put(`/admin/users/${id}`, params);
  },
}

export default AdminApiClient;
