import {
  Box,
  Button,
  CardActions,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../Components/Spinner";
import { deleteImage, getImage, reset } from "../features/images/imageSlice";
import UpdateImage from "./UpdateImage";

const Image = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const id = location.pathname.split("/")[2];
  const { user } = useSelector((state) => state.auth);
  const { images, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.images
  );

  const handleDelete = () => {
    dispatch(deleteImage(id));
    if (isSuccess) navigate("/images");
  };

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
    <>
      {editMode ? (
        <UpdateImage id={id} imageData={images} />
      ) : (
        <Container>
          <Box>
            <CardMedia
              image={images.url}
              component="img"
              sx={{ my: 1 }}
              alt="random image"
            />
            <Typography variant="h5" component="div" sx={{ my: 1 }}>
              {images.title}
            </Typography>
          </Box>
          <Box>{images.description}</Box>
          <CardActions sx={{ px: 0, my: 1 }}>
            <Button
              size="small"
              sx={{ bgcolor: "text.primary" }}
              variant="contained"
              onClick={() => setEditMode(true)}
            >
              Edit
            </Button>
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </CardActions>
        </Container>
      )}
    </>
  );
};

export default Image;
