import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Components/Spinner";

const theme = createTheme();

const SignUp = () => {
  const [inbox, setInbox] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password, confirmPassword } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log("SNACKBAR: Error while register");
    }
    if (isSuccess || user) {
      // user might/not be removed here
      console.log("SNACKBAR: User Successfully registered");
      // navigate("/login", { state: { open: true, message } });
    }
    dispatch(reset());
  }, [isError, user, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("SNACKBAR: Passwords don't match");
    } else {
      dispatch(register({ username, email, password }));
      setInbox(true);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ThemeProvider theme={theme}>
      {!inbox ? (
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
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
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
                    required
                    fullWidth
                    onChange={handleChange}
                    name="password"
                    value={password}
                    label="Password"
                    type="password"
                    id="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      ) : (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            my: 4,
          }}
        >
          {/* <MarkEmailUnreadIcon  /> */}
          <img src="/test-assets/inbox.png" alt="Mailbox" />
          <Typography sx={{ my: 2 }} variant="h5">
            We have sent a verification email, check out your inbox!
          </Typography>
        </Container>
      )}
    </ThemeProvider>
  );
};

export default SignUp;
