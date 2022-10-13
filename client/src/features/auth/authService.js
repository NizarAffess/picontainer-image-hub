import axios from "axios";

const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:8083/api/user/register",
      userData
    );
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
