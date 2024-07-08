import * as base from "./baseActions";
import { endpoints } from "../config/config";

const createTrip = (token: string, trip: any) => {
    return base.post(endpoints.createTrip, trip, { headers: { authorization: `Bearer ${token}`}});
}

export { createTrip };