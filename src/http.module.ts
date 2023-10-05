import axios from "axios";

const httpModule = axios.create({
  baseURL: "https://localhost:7137/api",
});
export default httpModule;