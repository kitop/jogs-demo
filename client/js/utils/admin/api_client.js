import xhr from "../http_client";

const AdminApiClient = {
  getUsers () {
    return xhr.get("/admin/users");
  },

  deleteUser(id) {
    return xhr.delete(`/admin/users/${id}`);
  }
}

export default AdminApiClient;
