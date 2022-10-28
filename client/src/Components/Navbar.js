import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useState } from "react";
import AccountMenu from "./AccountMenu";
import { Avatar, IconButton } from "@mui/material";
import Sign from "./Sign";

const defaultPages = [
  { title: "Home", endpoint: "/" },
  { title: "Upload", endpoint: "/image/upload" },
  { title: "Images", endpoint: "/images" },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container
      position="static"
      sx={{
        bgcolor: "text.primary",
        textAlign: "center",
        maxWidth: "100vw !important",
        height: "56px",
      }}
    >
      <Box>
        <>
          {defaultPages.map((page) => (
            <Link key={page.title} to={page.endpoint}>
              <Button
                sx={{
                  color: "white",
                  fontSize: "16px",
                  my: 1,
                  mx: 1,
                  textTransform: "capitalize",
                }}
              >
                {page.title}
              </Button>
            </Link>
          ))}
          {user && (
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ position: "absolute", top: "7px", right: "50px" }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar src={user.user?.photo} sx={{ width: 32, height: 32 }} />
            </IconButton>
          )}
        </>
        {!user ? (
          <Sign />
        ) : (
          <AccountMenu
            handleLogout={handleLogout}
            open={open}
            anchorEl={anchorEl}
            handleClick={handleClick}
            handleClose={handleClose}
            photo={user.user?.photo}
          />
        )}
      </Box>
    </Container>
  );
};
export default Navbar;
