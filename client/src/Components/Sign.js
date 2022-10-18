import { Button, List } from "@mui/material";
import { Link } from "react-router-dom";

const Sign = () => {
  return (
    <List sx={{ display: "inline", position: "absolute", top: -8, right: 15 }}>
      <Link style={{ textDecoration: "none" }} to="/register">
        <Button
          sx={{
            color: "white",
            fontSize: "16px",
            bgColor: "red",
            mx: 1,
            textTransform: "capitalize",
          }}
          variant="contained"
        >
          Sign up
        </Button>
      </Link>
      <Link style={{ textDecoration: "none" }} to="/login">
        <Button
          sx={{
            color: "white",
            fontSize: "16px",
            my: 1,
            mx: 1,
            textTransform: "capitalize",
            border: "1px solid #fff",
          }}
          variant="outlined"
        >
          Sign in
        </Button>
      </Link>
    </List>
  );
};

export default Sign;
