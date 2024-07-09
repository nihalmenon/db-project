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

const getSuggestedInvitees = (token: string) => {
  return base.get(endpoints.suggestedInvitees, { headers: { authorization: `Bearer ${token}` }});
};

const getTripDetails = (tripId: string, token: string) => {
  return base.get(endpoints.match, { headers: { authorization: `Bearer ${token}` }, params: { tid: tripId }});
}

const getItinerary = (tripId: string, token: string) => {
  return base.get(endpoints.itinerary, { headers: { authorization: `Bearer ${token}` }, params: { tid: tripId }});
}

export { registerUser, loginUser, getUserDetails, getUserTrips, getSuggestedInvitees, getTripDetails, getItinerary};
