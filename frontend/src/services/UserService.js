import http from "../http-common";

const getAll = () => {
  return http.get("/users");
};

const getAllUsertests = () => {
  return http.get("/users/userTests");
};

const get = id => {
  return http.get(`/users/${id}`);
};

const create = data => {
  return http.post("/users", data);
};

const addTests = (data) => {
  return http.post(`/users/addTests`, data);
};

const remove = id => {
  return http.delete(`/users/${id}`);
};




export default {
  getAll,
  get,
  create,
  remove,
  addTests,
  getAllUsertests
};