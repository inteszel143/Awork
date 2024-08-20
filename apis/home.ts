import axios from "axios";

export const getHomeCalendar = async (token: string) => {
  try {
    const response = await axios.get(
      "http://192.168.100.20:8000/api/calendars",
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
      "http://192.168.100.20:8000/api/calendars",
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
      `http://192.168.100.20:8000/api/calendars/${id}`,
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
      `http://192.168.100.20:8000/api/calendars/${id}`,
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
    const response = await axios.put(
      `http://192.168.100.20:8000/api/calendars/${id}`,
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
