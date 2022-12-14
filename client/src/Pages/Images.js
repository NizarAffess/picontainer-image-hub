import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Gallery from "../Components/Gallery";
import Spinner from "../Components/Spinner";
import { getImages, reset } from "../features/images/imageSlice";
import { getUserProfile, saveImage } from "../features/profile/profileSlice";

const Images = (props) => {
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
    const query = props.user ? true : false;
    dispatch(getImages(query));
    return () => {
      dispatch(reset());
    };
  }, [isError, user, message, props.user, dispatch, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Gallery
      images={images}
      saved={saved}
      saveItem={saveItem}
      isSaved={isSaved}
    />
  );
};

export default Images;
