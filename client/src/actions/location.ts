import * as base from "./baseActions";
import { endpoints } from "../config/config";

const getLocations = () => {
    return base.get(endpoints.locations);
}

const searchLocations = (input: string) => {
    return base.get(endpoints.searchLocations, { params: { input } });
}

export { getLocations, searchLocations };