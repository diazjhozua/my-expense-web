import Axios from "axios";
import { API } from "@/shared/config";

const instance = Axios.create({
  baseURL: API,
  responseType: "json",
  timeout: 5000,
});

const axios = instance;
export { axios };
