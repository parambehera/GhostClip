import axios from "axios";

// Vite exposes env variables on import.meta.env and requires VITE_ prefix.
// Use VITE_BASE_URL (e.g. http://localhost:3000) and ensure the /clips path is appended.
const rawBase = import.meta.env.VITE_BASE_URL || "http://localhost:3000";
// Normalize: remove trailing slash if present
const BASE_URL = `${rawBase}/clips`;

// Create a new clip
export const createClip = async (text) => {
  try {
    const response = await axios.post(BASE_URL, { text });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error creating clip:", error);
    throw error;
  }
};

// Get clip by pin
export const getClip = async (pin) => {
  const response = await axios.get(`${BASE_URL}/${pin}`);
  return response.data;
};


export const handleUpload= async (file) => {
  const formData = new FormData();
  formData.append("file", file);
}