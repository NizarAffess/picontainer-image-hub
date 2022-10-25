import { Box, ImageList, IconButton } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Image from "../Components/Image";
import Spinner from "../Components/Spinner";
import { getImages, reset } from "../features/images/imageSlice";
import { getUserProfile, saveImage } from "../features/profile/profileSlice";

const Images = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { saved } = useSelector((state) => state.profile.profile);
  const { user } = useSelector((state) => state.auth);
  const { images, isError, isLoading, message } = useSelector(
    (state) => state.images
  );

  const isSaved = (imageId) => saved.some((item) => item._id === imageId);
  const saveItem = (id) => {
    dispatch(saveImage({ imageId: id }));
    dispatch(getUserProfile(user.user.token));
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/login");
    }
    dispatch(getImages());
    return () => {
      dispatch(reset());
    };
  }, [isError, user, message, dispatch, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ImageList sx={{ margin: "2em" }} cols={3}>
      {images?.map((image) => (
        <Box key={image._id} className="image">
          <Link to={`/image/${image._id}`} className="image-item">
            <Image image={image} />
          </Link>
          <IconButton
            aria-label={`save ${image.title}`}
            className="image-title image-save"
            onClick={() => saveItem(image._id)}
          >
            {/* <BookmarkBorderIcon aria-label="save" /> 
            <BookmarkIcon aria-label="unsave" /> */}
            {saved && isSaved(image._id) ? "Unsave" : "Save"}
          </IconButton>
        </Box>
      ))}
    </ImageList>
  );
};

export default Images;
