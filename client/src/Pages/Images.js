import { ImageList } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Image from "../Components/Image";
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
    <ImageList sx={{ margin: "2em" }} cols={3}>
      {images?.map((image) => (
        <Link key={image._id} to={`/image/${image._id}`} className="image-item">
          <Image image={image} />
        </Link>
      ))}
    </ImageList>
  );
};

export default Images;
