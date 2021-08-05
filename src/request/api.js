import axios from "./index";

// Get token
export const getToken = () => axios.get('/token');

// Refresh token
export const refreshToken = () => axios.get('/refresh/token');

// Get user information
export const getInfo = () => axios.get('/getInfo');
