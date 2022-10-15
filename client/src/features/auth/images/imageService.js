import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

const createImage = async (token, imageData) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${apiURL}/image/create`,
      imageData,
      config
    );
    return response.data;
  } catch (error) {
    console.log("Error while creating image: ", error);
  }
};

const imagesService = { createImage };
export default imagesService;
