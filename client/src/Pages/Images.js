import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Components/Spinner";
import { getImages, reset } from "../features/images/imageSlice";

const Images = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(getImages());
    return () => {
      dispatch(reset());
    };
  }, [isError, user, message, dispatch, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {images?.map((image) => (
        <Link key={image._id} to={`/image/${image._id}`}>
          <ImageListItem>
            <img
              src={`${image.url}?w=164&h=164&fit=crop&auto=format`}
              // srcSet={`${image.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={image.title}
              loading="lazy"
            />
            <ImageListItemBar title={image.title} position="below" />
          </ImageListItem>
        </Link>
      ))}
    </ImageList>
  );
};

export default Images;
