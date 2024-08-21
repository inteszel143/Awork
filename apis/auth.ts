import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  try {
    const data = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
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
