import http from "../http-common";

const getAll = () => {
  return http.get("/tests");
};

const get = id => {
  return http.get(`/tests/${id}`);
};

const create = data => {
  return http.post("/tests", data);
};

const addQuestions = (data) => {
  return http.post(`/tests/addQuestions`, data);
};

const remove = id => {
  return http.delete(`/tests/${id}`);
};




export default {
  getAll,
  get,
  create,
  remove,
  addQuestions
};