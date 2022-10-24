import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountForm from "../Components/AccountForm";
import Spinner from "../Components/Spinner";
import {
  addProfileInfo,
  getUserProfile,
} from "../features/profile/profileSlice";

const theme = createTheme();

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { profile, isError, isLoading, message } = useSelector(
    (state) => state.profile
  );
  const [formData, setFormData] = useState({
    username: profile.username,
    email: profile.email,
    bio: profile.bio,
    address: profile.address,
  });
  const { username, email, bio, address } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfileInfo = async () => {
    const profileData = new FormData();
    profileData.append("username", username && username);
    profileData.append("email", email && email);
    profileData.append("bio", bio && bio);
    profileData.append("address", address && address);
    dispatch(addProfileInfo(profileData));
    navigate("/user/profile");
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getUserProfile(user.user.token));
    console.log(user);
  }, [isError, message, user, dispatch, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AccountForm
        saveProfileInfo={saveProfileInfo}
        handleChange={handleChange}
        formData={formData}
      />
    </ThemeProvider>
  );
};

export default Account;
