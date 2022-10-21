import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addProfileInfo,
  getUserProfile,
} from "../features/profile/profileSlice";
import Spinner from "../Components/Spinner";

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
    profileData.append("bio", about && about);
    profileData.append("address", address && address);
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
      <Box
        sx={{
          width: "100%",
          height: "auto",
          maxHeight: "300px",
          textAlign: "center",
          overflowY: "hidden",
        }}
      >
        {profile.coverPhoto ? (
          <img src={profile.coverPhoto} alt="profile cover" loading="lazy" />
        ) : (
          <Box sx={{ position: "relative" }}>
            <img
              style={{ height: "300px", width: "100%" }}
              src={coverFile ? coverPreview : "/test-assets/wide-cover.jpg"}
              alt="profile cover"
              loading="lazy"
            />
            <Button
              sx={{
                bgcolor: "text.primary",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: coverFile ? "none" : "block",
              }}
              variant="contained"
              component="label"
            >
              {/* <UploadFile sx={{ mr: 1 }} /> */}
              Upload
              <input
                hidden
                onChange={handleCoverFileChange}
                accept="image/*"
                type="file"
                required
              />
            </Button>
          </Box>
        )}
      </Box>
      {profile ? (
        <Grid container rowSpacing={2} columnSpacing={3} sx={{ m: 2 }}>
          <Grid item textAlign="center">
            {profile.photo ? (
              <Avatar
                sx={{ width: 200, height: 200 }}
                src={profile.photo}
                alt="profile"
                loading="lazy"
              />
            ) : (
              <Box sx={{ position: "relative" }}>
                <Avatar
                  sx={{ width: 200, height: 200 }}
                  src={file ? preview : "/test-assets/user-photo-1.jpg"}
                  alt="profile"
                  loading="lazy"
                />
                <Button
                  sx={{
                    bgcolor: "text.primary",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: file ? "none" : "block",
                  }}
                  variant="contained"
                  component="label"
                >
                  {/* <UploadFile sx={{ mr: 1 }} /> */}
                  Upload
                  <input
                    hidden
                    onChange={handleFileChange}
                    accept="image/*"
                    type="file"
                    required
                  />
                </Button>
              </Box>
            )}
            <Typography variant="h5" sx={{ my: 1 }}>
              {profile.username}
            </Typography>
          </Grid>
          <Grid item sx={{ mx: 4, maxWidth: "450px" }}>
            <Typography component="div" sx={{ mb: 1 }}>
              <Typography variant="h6">About</Typography>
              {profile.bio ? (
                profile.bio
              ) : (
                <TextField
                  margin="normal"
                  fullWidth
                  value={formData?.about || ""}
                  multiline
                  rows={3}
                  label="Tell others a bit about yourself"
                  name="about"
                  onChange={handleChange}
                />
              )}
            </Typography>
            <Typography component="div" sx={{ mb: 1 }}>
              <Typography variant="h6">Address</Typography>
              {profile.address ? (
                profile.address
              ) : (
                <TextField
                  margin="normal"
                  fullWidth
                  value={formData?.address || ""}
                  label="Where do you live?"
                  name="address"
                  onChange={handleChange}
                />
              )}
            </Typography>
          </Grid>
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
        <Typography>No data yet</Typography>
      )}
    </Container>
  );
};

export default Profile;
