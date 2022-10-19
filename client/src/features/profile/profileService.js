import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

const getProfile = async (token) => {
  try {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${apiURL}/user/profile`, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error while getting user data: ", error);
  }
};

const profileService = {
  getProfile,
};

export default profileService;
