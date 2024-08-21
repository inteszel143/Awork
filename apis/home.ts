import axios from "axios";

export const getHomeCalendar = async (token: string) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/calendars`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data?.data || [];
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addEvent = async (data: any, token: string) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_URL}/calendars`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteEvent = async (id: any, token: string) => {
  try {
    const response = await axios.delete(
      `${process.env.EXPO_PUBLIC_API_URL}/calendars/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const calendarById = async (id: any, token: string) => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/calendars/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateEvents = async (id: any, data: any, token: string) => {
  try {
    const response = await axios.patch(
      `${process.env.EXPO_PUBLIC_API_URL}/calendars/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
