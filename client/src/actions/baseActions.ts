import axios, { AxiosRequestConfig } from "axios";
import { baseApiUrl } from "../config/config";

const fullEndpoint = (endpoint: string): string => {
  if (endpoint.startsWith("http")) {
    return `/${endpoint}`;
  } else {
    return `${baseApiUrl}/${endpoint}`;
  }
}

const get = (endpoint: string, config?: AxiosRequestConfig) => {
  return axios.get(fullEndpoint(endpoint), config);
}

const post = (endpoint: string, data?: AxiosRequestConfig) => {
  return axios.post(fullEndpoint(endpoint), data);
}

export { get, post };