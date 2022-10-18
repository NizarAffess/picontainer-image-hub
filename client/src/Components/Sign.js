import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Sign = () => {
  return (
    <>
      <Link to="/register">
        <Button
          sx={{
            color: "white",
            fontSize: "16px",
            my: 1,
            mx: 1,
            textTransform: "capitalize",
          }}
        >
          Sign up
        </Button>
      </Link>
      <Link to="/login">
        <Button
          sx={{
            color: "white",
            fontSize: "16px",
            my: 1,
            mx: 1,
            textTransform: "capitalize",
          }}
        >
          Sign in
        </Button>
      </Link>
    </>
  );
};

export default Sign;
