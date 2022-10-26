import { Button, List } from "@mui/material";
import { Link } from "react-router-dom";

const Sign = () => {
  return (
    <List sx={{ display: "inline", position: "absolute", top: -8, right: 15 }}>
      <Link style={{ textDecoration: "none", marginRight: "10px" }} to="/login">
        <Button
          sx={{
            color: "white",
            fontSize: "16px",
            my: 1,
            textTransform: "capitalize",
          }}
        >
          Sign in
        </Button>
      </Link>
      <Link
        style={{ textDecoration: "none", marginRight: "10px" }}
        to="/register"
      >
        <Button
          sx={{
            color: "white",
            fontSize: "16px",
            bgColor: "red",
            border: "1px solid #fff",
            textTransform: "capitalize",
          }}
          variant="outlined"
        >
          Sign up
        </Button>
      </Link>
    </List>
  );
};

export default Sign;
