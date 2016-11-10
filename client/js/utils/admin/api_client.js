import xhr from "../http_client";

const AdminApiClient = {
  getUsers () {
    return xhr.get("/admin/users");
  },
}

export default AdminApiClient;
