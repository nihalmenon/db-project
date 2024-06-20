import * as base from "./baseActions";
import { endpoints } from "../config/config";

const registerUser = (user: any) => {
  return base.post(endpoints.register, user);
};

const loginUser = (user: any) => {
  return base.post(endpoints.login, user);
};

const getUserDetails = (token: string) => {
  return base.get(endpoints.me, { headers: { authorization: `Bearer ${token}` }});
}

const getUserTrips = (token: string) => {
  return base.get(endpoints.myTrips, { headers: { authorization: `Bearer ${token}` }});
}

export { registerUser, loginUser, getUserDetails, getUserTrips };
