import { endpoints } from "../config/config";
import * as base from "./baseActions";
import useSWR from "swr";

export interface HelloWorldData {
}

const getHelloWorld = (): HelloWorldData => {
    return base.get(endpoints.helloWorld);
}

const useGetHelloWorld = () => {
    const { data, error, isLoading } = useSWR([endpoints.helloWorld], () => getHelloWorld());
    return { data, error, isLoading };
}

export { useGetHelloWorld };