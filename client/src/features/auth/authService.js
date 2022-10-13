import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${apiURL}/user/register`, userData);
    if (response.data) {
      // axios returns a response in an object called data
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    // const json = await response.json();
    console.log("json response: ", response.data);
    return response.data;
  } catch (error) {
    console.log("Error while creating user: ", error);
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  registerUser,
  logout,
};
export default authService;
