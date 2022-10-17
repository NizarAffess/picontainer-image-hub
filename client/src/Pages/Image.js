import { Box, CardMedia, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../Components/Spinner";
import { getImage, reset } from "../features/images/imageSlice";

const Image = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];
  const { user } = useSelector((state) => state.auth);
  const { images, isError, isLoading, message } = useSelector(
    (state) => state.images
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getImage(id));
    return () => {
      dispatch(reset());
    };
  }, [isError, message, user, dispatch, navigate, id]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <Box>
        <CardMedia image={images.url} component="img" alt="random image" />
        <Typography variant="h5" component="div">
          {images.name}
        </Typography>
      </Box>
      <Box>{images.description}</Box>
    </Container>
  );
};

export default Image;
