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

const getImages = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${apiURL}/images`, config);
    return response.data;
  } catch (error) {
    console.log("Error while getting images: ", error);
  }
};

const getImage = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${apiURL}/image/${id}`, config);
    return response.data;
  } catch (error) {
    console.log("Error while getting image: ", error);
  }
};

const deleteImage = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`${apiURL}/image/${id}`, config);
    return response.data;
  } catch (error) {
    console.log("Error while deleting image: ", error);
  }
};

const updateImage = async (token, id, imageData) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(
      `${apiURL}/image/${id}}`,
      imageData,
      config
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error while updating image: ", error);
  }
};

const imagesService = {
  createImage,
  getImages,
  getImage,
  deleteImage,
  updateImage,
};
export default imagesService;
