import * as base from "./baseActions";
import { endpoints } from "../config/config";

const createTrip = (trip: any) => {
  return base.post(endpoints.createTrip, trip);
};

const updateTrip = (trip: any) => {
  return base.put(endpoints.updateTrip, trip);
};

const getConnectData = (tid: number): any => {
  return base.get(endpoints.connect, { params: { tid } });
};

export { createTrip, getConnectData, updateTrip };
