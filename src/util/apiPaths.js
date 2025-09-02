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
  },
  FAVORITES: {
    ADD_FAVORITE: (parkName) => `/favorites/add/${parkName}`,
    GET_ALL_FAVORITES: "/favorites/getAll",
    GET_PARK_FAVORITES: (parkName) => `/favorites/getAll/${parkName}`,
    DELETE_FAVORITE: (favoriteId) => `/favorites/delete/${favoriteId}`,
  },
  WAITTIMES: {
    GET_PARK_WAIT_TIME: (parkName) => `/waittimes/${parkName}-waittimes`,
    GET_PARK_HOURS: (parkName) => `/waittimes/${parkName}-parkhours`,
  }
};
