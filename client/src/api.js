import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Replace this with your backend server URL
});

export const fetchData = async () => {
  try {
    const response = await api.get("/messages");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const saveMessage = async (message) => {
  try {
    await api.post("/messages", message);
  } catch (error) {
    console.error("Error saving message:", error);
    throw error;
  }
};
