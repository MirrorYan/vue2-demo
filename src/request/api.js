import axios from "./index";

// Get token
export const getToken = () => axios.get('/token');

// Get user information
export const getInfo = () => axios.get('/getInfo');
