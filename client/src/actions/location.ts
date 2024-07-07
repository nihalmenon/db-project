import * as base from "./baseActions";
import { endpoints } from "../config/config";

const getLocations = () => {
    return base.get(endpoints.locations);
}

export { getLocations };