import { useState } from "react"
import { PopDest, PopDestQuery } from "../interfaces/statsInterfaces"
import { getPopularDestinations } from "../actions/trip";

export const usePopularDestinations = () => {
  const [data, setData] = useState<PopDest[]>([]);
  const refresh = async (filterOptions: PopDestQuery) => {
    const result = await getPopularDestinations(filterOptions);
    setData(result.data);
  }
  return { data, refresh };
}
