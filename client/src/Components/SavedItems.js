import { useDispatch, useSelector } from "react-redux";
import { saveImage } from "../features/profile/profileSlice";
import Gallery from "./Gallery";

const SavedItems = () => {
  const dispatch = useDispatch();
  const { saved } = useSelector((state) => state.profile.profile);

  const isSaved = (imageId) => saved.some((item) => item._id === imageId);
  const saveItem = (id) => {
    dispatch(saveImage({ imageId: id }));
  };
  return <Gallery images={saved} isSaved={isSaved} saveItem={saveItem} />;
};

export default SavedItems;
