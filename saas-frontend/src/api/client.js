import axios from "axios";
import { API_BASE } from "./base";
const client = axios.create({
  baseURL: '/api',
  withCredentials: true
});



export default client;
