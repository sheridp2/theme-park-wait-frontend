export const BASE_URL = "https://theme-park-waittime-backend-23ddbbbbbeb1.herokuapp.com";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    GET_USER_INFO: "/auth/getUser",
  },
  TRIP: {
    ADD_TRIP: "/trip/add",
    GET_ALL_TRIPS: "/trip/getAll",
    DELETE_TRIP: (tripId) => `/trip/delete/${tripId}`,
  }
};
