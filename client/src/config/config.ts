const baseApiUrl = process.env.REACT_APP_BASE_API_URL;

const endpoints = {
    helloWorld: "hello-world",
    register: "register",
    login: "login",
    me: "me",
    myTrips: "trips",
}

export { baseApiUrl, endpoints };