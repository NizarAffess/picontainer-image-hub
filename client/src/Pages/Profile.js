import { Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addProfileInfo,
  getUserProfile,
} from "../features/profile/profileSlice";
import Spinner from "../Components/Spinner";
import CoverImage from "../Components/CoverImage";
import ProfileImage from "../Components/ProfileImage";
import ProfileInfo from "../Components/ProfileInfo";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const { profile, isError, isLoading, message } = useSelector(
    (state) => state.profile
  );

  const [file, setFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    if (isDisabled) {
      setIsDisabled(false);
    }
  };
  const handleCoverFileChange = (e) => {
    setCoverFile(e.target.files[0]);
    if (isDisabled) {
      setIsDisabled(false);
    }
  };

  const [formData, setFormData] = useState({
    about: "",
    address: "",
  });
  const { about, address } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (isDisabled) {
      setIsDisabled(false);
    }
  };

  const saveProfileInfo = async () => {
    const profileData = new FormData();
    if (file) {
      profileData.append("photo", file);
    }
    if (coverFile) {
      profileData.append("coverPhoto", coverFile);
    }
    if (about) {
      profileData.append("bio", about);
    }
    if (address) {
      profileData.append("address", address);
    }
    dispatch(addProfileInfo(profileData));
  };

  useEffect(() => {
    let objectUrl;
    if (file) {
      objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
    let objectUrlCover;
    if (coverFile) {
      objectUrlCover = URL.createObjectURL(coverFile);
      setCoverPreview(objectUrlCover);
    } else {
      setCoverPreview(null);
    }
    return () => {
      URL.revokeObjectURL(objectUrl);
      URL.revokeObjectURL(objectUrlCover);
    };
  }, [file, coverFile]);

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
    <Container className="profile-container">
      <CoverImage
        profile={profile}
        coverFile={coverFile}
        coverPreview={coverPreview}
        handleCoverFileChange={handleCoverFileChange}
      />
      {profile ? (
        <Grid container rowSpacing={2} columnSpacing={3} sx={{ m: 2 }}>
          <ProfileImage
            profile={profile}
            file={file}
            preview={preview}
            handleFileChange={handleFileChange}
          />
          <ProfileInfo
            profile={profile}
            formData={formData}
            handleChange={handleChange}
          />
          <Grid item>
            <Button
              onClick={saveProfileInfo}
              variant="contained"
              sx={{ bgcolor: "text.primary", textTransform: "capitalize" }}
              disabled={isDisabled}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Typography>No data Found!</Typography>
      )}
    </Container>
  );
};

export default Profile;
