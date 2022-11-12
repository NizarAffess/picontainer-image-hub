import { Box, Button, Grid, IconButton, Snackbar } from "@mui/material";
import { Container } from "@mui/material/";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const { message } = useSelector((state) =>
    state.auth.user ? state.auth.user : ""
  );
  const location = useLocation();
  const [snack, setSnack] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      X
    </IconButton>
  );

  useEffect(() => {
    if (location?.state?.open) {
      setSnack(true);
    }
  }, [location]);

  return (
    <Container>
      <Box>
        <Snackbar
          open={snack}
          autoHideDuration={5000}
          onClose={handleClose}
          message={message}
          action={action}
        />
        <Grid
          container
          spacing={2}
          style={{ alignItems: "center", marginTop: "2em" }}
        >
          <Grid item xs={12} md={6}>
            <img
              src="https://res.cloudinary.com/dru9x9rey/image/upload/v1668249880/projects/undraw_inspiration_re_ivlv_opfpfn.svg"
              alt="inspiration"
              style={{ width: "80%" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <h2 style={{ width: "250px" }}>
              Welcome to the Land of Photographers
            </h2>
            <p style={{ width: "250px", margin: "1em 0" }}>
              Join a creative community and start contributing
            </p>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{ bgcolor: "#00B0FF", textTransform: "capitalize" }}
              >
                Get started
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
