import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  try {
    const data = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      `http://192.168.100.20:8000/api/auth/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
