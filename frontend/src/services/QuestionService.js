import http from "../http-common";

const getAll = () => {
  return http.get("/questions");
};

const get = id => {
  return http.get(`/questions/${id}`);
};

const create = data => {
  return http.post("/questions", data);
};

const update = (id, data) => {
  return http.put(`/questions/${id}`, data);
};

const remove = id => {
  return http.delete(`/questions/${id}`);
};
const findByCategory = id => {
  return http.get(`/questions/category/${id}`);
};

const findByQuetionName = question => {
  return http.get(`/questions?question=${question}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByQuetionName,
  findByCategory
};