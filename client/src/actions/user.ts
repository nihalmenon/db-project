import * as base from "./baseActions";
import { endpoints } from "../config/config";

const registerUser = (user: any) => {
  return base.post(endpoints.register, user);
};

const loginUser = (user: any) => {
  return base.post(endpoints.login, user);
};

export { registerUser, loginUser };
