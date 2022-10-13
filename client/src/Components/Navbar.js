import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { useEffect, useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [pages, setPages] = useState([]);

  const logoutHandler = (title) => {
    if (title === "Logout") {
      dispatch(logout());
    } else {
      return null;
    }
  };

  useEffect(() => {
    const pagesList = [
      { title: "Home", endpoint: "/" },
      { title: "Upload", endpoint: "/image/upload" },
      { title: "Images", endpoint: "/images" },
      ...(user
        ? [{ title: "Logout", endpoint: "/" }]
        : [
            { title: "Sign Up", endpoint: "/register" },
            { title: "Sign in", endpoint: "/login" },
          ]),
    ];
    setPages([...pagesList]);
    dispatch(reset());
  }, [user, dispatch]);

  return (
    <Container
      position="static"
      sx={{
        bgcolor: "text.primary",
        textAlign: "center",
        maxWidth: "100vw !important",
      }}
    >
      <Box>
        {pages.map((page) => (
          <Link key={page.title} to={page.endpoint}>
            <Button
              sx={{
                color: "white",
                fontSize: "16px",
                my: 1,
                mx: 1,
                textTransform: "capitalize",
              }}
              onClick={() => logoutHandler(page.title)}
            >
              {page.title}
            </Button>
          </Link>
        ))}
      </Box>
    </Container>
  );
};
export default Navbar;
