import http from "../http-common";


const create = data => {
  return http.post("/answers", data);
};



export default {
  create
  
};