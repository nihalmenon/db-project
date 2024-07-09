import * as base from "./baseActions";
import { endpoints } from "../config/config";

const registerUser = (user: any) => {
  return base.post(endpoints.register, user);
};

const loginUser = (user: any) => {
  return base.post(endpoints.login, user);
};

const getUserDetails = () => {
  return base.get(endpoints.me);
}

const getUserTrips = () => {
  return base.get(endpoints.myTrips);
}

const getSuggestedInvitees = () => {
  return base.get(endpoints.suggestedInvitees);
};

const getTripDetails = (tripId: number) => {
  return base.get(endpoints.match, { params: { tid: tripId }});
}

const getItinerary = (tripId: number) => {
  return base.get(endpoints.itinerary, { params: { tid: tripId }});
}

export { registerUser, loginUser, getUserDetails, getUserTrips, getSuggestedInvitees, getTripDetails, getItinerary};
