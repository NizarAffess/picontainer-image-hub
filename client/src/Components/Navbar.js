import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const pages = [
  { title: "Home", endpoint: "/" },
  { title: "Upload", endpoint: "/image/upload" },
  { title: "Images", endpoint: "/images" },
  { title: "Sign Up", endpoint: "/register" },
  { title: "Sign in", endpoint: "/login" },
];

const Navbar = () => {
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
