import http from "../http-common";

const getAll = () => {
  return http.get("/categories");
};

const get = name => {
  return http.get(`/categories/${name}`);
};

const create = data => {
  return http.post("/categories", data);
};

const update = (name, data) => {
  return http.put(`/categories/${name}`, data);
};

const remove = name => {
  return http.delete(`/categories/${name}`);
};

const findByName = name => {
    return http.get(`/categories?name=${name}`);
  };


export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByName
};