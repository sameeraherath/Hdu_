import axios from "axios";

export const register = async (userData) => {
  // const response = await axios.post(
  //   `${import.meta.env.VITE_API_URL}/api/auth/register`,
  //   userData
  // );
  const response = await axios.post(
    `http://localhost:5001/api/auth/register`, // Add "http://"
    userData
  );
  return response.data; // { token, role }
};

export const login = async (userData) => {
  // const response = await axios.post(
  //   `${import.meta.env.VITE_API_URL}/api/auth/login`,
  //   userData
  // );
    const response = await axios.post(
    `http://localhost:5001/api/auth/login`,
    userData
  );
  return response.data; // { token, role }
};
