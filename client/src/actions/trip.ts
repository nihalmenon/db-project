import * as base from "./baseActions";
import { endpoints } from "../config/config";

const createTrip = (token: string, trip: any) => {
    return base.post(endpoints.createTrip, trip, { headers: { authorization: `Bearer ${token}`}});
}

const getConnectData = (tid: number): any => {
    return base.get(endpoints.connect, { params: { tid }});
}

const getPopularDestinations = (minAge: number, maxAge: number, gender: string) => {
    return base.get(endpoints.popularDestinations, { params: { minAge, maxAge, gender }});
}

const getAverageDuration = (lid: number) => {
    return base.get(endpoints.averageDuration, { params: { lid }});
}

export { createTrip, getConnectData, getPopularDestinations, getAverageDuration };