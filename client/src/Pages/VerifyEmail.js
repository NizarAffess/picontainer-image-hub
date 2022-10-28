import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* <VerifiedIcon /> */}
      <img
        src="/test-assets/verified.png"
        className="verified"
        alt="Eamil verified"
      />
      <h2 style={{ margin: "1em" }}>
        You have successfully verified your account
      </h2>
      <Link style={{ textDecoration: "none" }} to="/login">
        <Button className="login-button" variant="outlined">
          Login
        </Button>
      </Link>
    </Container>
  );
};

export default VerifyEmail;
