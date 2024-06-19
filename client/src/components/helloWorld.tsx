import React from "react";
import { HelloWorldData, useGetHelloWorld } from "../actions/helloWorldActions";

export const HelloWorld = () => {
    const { data: helloWorldData } = useGetHelloWorld();
    return (
        <>
            <h2>Data goes here:</h2>
            <p>{JSON.stringify(helloWorldData)}</p>
        </>
    );
}

export default HelloWorld;