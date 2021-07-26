import axios from "axios";

const instance = axios.create({
  baseURL: "https://inodashboard-app.herokuapp.com",
});
export default instance;
