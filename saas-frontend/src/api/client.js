import axios from "axios";
import { API_BASE } from "./base";
const client = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});



export default client;
