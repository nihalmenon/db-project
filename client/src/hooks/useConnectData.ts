import { useEffect, useState } from "react";
import { ConnectData } from "../interfaces/connectInterfaces"
import { getConnectData } from "../actions/trip";
import axios from "axios";

export const useConnectData = (tid: number) => {
  const [connectData, setConnectData] = useState<ConnectData[]>([]);
  

  useEffect(() => {
    const fetch = async () => {
      const result = await getConnectData(tid);
      setConnectData(result.data);
    }
    tid && fetch();
  }, [tid]);

  return connectData;
}
