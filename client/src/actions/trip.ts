import * as base from "./baseActions";
import { endpoints } from "../config/config";
import { PopDest, PopDestQuery } from "../interfaces/statsInterfaces";

const createTrip = (trip: any) => {
  return base.post(endpoints.createTrip, trip);
};

const updateTrip = (trip: any) => {
  return base.put(endpoints.updateTrip, trip);
};

const getConnectData = (tid: number): any => {
  return base.get(endpoints.connect, { params: { tid } });
};

const getPopularDestinations = ({ minAge, maxAge, gender }: PopDestQuery): Promise<any> => {
    return base.get(endpoints.popularDestinations, { params: { minAge, maxAge, gender }});
}

const getAverageDuration = (lid: number) => {
    return base.get(endpoints.averageDuration, { params: { lid }});
}

export { createTrip, getConnectData, updateTrip, getPopularDestinations, getAverageDuration };
