const baseApiUrl = process.env.REACT_APP_BASE_API_URL;

const endpoints = {
  helloWorld: "hello-world",
  register: "register",
  login: "login",
  me: "me",
  myTrips: "trips",
  locations: "locations",
  suggestedInvitees: "suggestedInvitees",
  match: "match",
  createTrip: "trip",
  itinerary: "itinerary",
  connect: "connect",
  popularDestinations: "popularDestinations"
};

export { baseApiUrl, endpoints };
