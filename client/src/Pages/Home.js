import { Box, Snackbar } from "@mui/material";
import { Container } from "@mui/material/";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { message } = useSelector((state) => state.auth.user);
  const location = useLocation();
  const [snack, setSnack] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnack(false);
  };

  useEffect(() => {
    if (location?.state?.open) {
      setSnack(true);
    }
  }, []);

  return (
    <Container>
      <Box>
        <h1>Home page</h1>
        <Snackbar
          open={snack}
          autoHideDuration={3000}
          onClose={handleClose}
          message={message}
          // action={action}
        />
      </Box>
    </Container>
  );
};

export default Home;
