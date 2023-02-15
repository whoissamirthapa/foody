import axios from "axios";

const nodeENV = "development";
const instance = axios.create({
  baseURL: nodeENV === "development" ? "http://localhost:5000/" : "",
  withCredentials: true,
});

export default instance;
// import axios from "axios";
