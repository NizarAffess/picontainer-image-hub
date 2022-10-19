import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../features/profile/profileSlice";
import Spinner from "../Components/Spinner";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { profile, isError, isLoading, message } = useSelector(
    (state) => state.profile
  );

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

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
          overflowY: "hidden",
        }}
      >
        <img
          src="/test-assets/cover-photo-1.jpg"
          alt="profile cover"
          loading="lazy"
        />
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
                  src={file ? preview : ""}
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
              {profile.bio}
            </Typography>
            <Typography variant="h6">Address</Typography>
            <Typography component="p">{profile.address}</Typography>
          </Grid>
        </Grid>
      ) : (
        <Typography>No data yet</Typography>
      )}
    </Container>
  );
};

export default Profile;
