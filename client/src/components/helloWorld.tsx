import "react";
import { HelloWorldData, useGetHelloWorld } from "../actions/helloWorldActions";

export const HelloWord = () => {
    const { data: helloWorldData } = useGetHelloWorld();
}