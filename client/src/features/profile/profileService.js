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

const addProfileInfo = async (token, profileData) => {
  try {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(
      `${apiURL}/user/profile`,
      profileData,
      config
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error while adding user data: ", error);
  }
};

const profileService = {
  getProfile,
  addProfileInfo,
};

export default profileService;
