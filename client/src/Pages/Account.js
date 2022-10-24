import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "text.primary" }}></Avatar>
          <Typography component="h1" variant="h5">
            Account
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={saveProfileInfo}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  id="username"
                  value={username}
                  label="username"
                  name="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  id="email"
                  value={email}
                  label="Email Address"
                  name="email"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  fullWidth
                  value={bio}
                  multiline
                  rows={3}
                  label="Tell others a bit about yourself"
                  name="bio"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  fullWidth
                  value={address}
                  label="Where do you live?"
                  name="address"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "text.primary",
                textTransform: "capitalize",
                my: 2,
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Account;
