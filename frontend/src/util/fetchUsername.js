import axiosInstance from "../api/axiosDefaults";

async function fetchUsername(userId) {
  try {
    const response = await axiosInstance.get(`user/get_username/${userId}/`, {
      mode: "cors",
      method: "GET",
    });
    return response.data.user_name;
  } catch (error) {
    console.error("Error fetching username:", error);
    throw error;
  }
}

export default fetchUsername;
