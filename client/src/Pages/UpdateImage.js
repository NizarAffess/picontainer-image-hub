import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, updateImage } from "../features/images/imageSlice";
import { useNavigate } from "react-router-dom";
import UploadForm from "../Components/UploadForm";
import Spinner from "../Components/Spinner";

const UpdateImage = (props) => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: props?.imageData ? props?.imageData.title : "",
    description: props?.imageData ? props?.imageData.description : "",
  });
  const { title, description } = formData;

  const { user } = useSelector((state) => state.auth);
  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.images
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const imageData = new FormData();
    imageData.append("title", title);
    imageData.append("description", description);
    if (file) imageData.append("url", file);
    dispatch(updateImage(props.id, imageData));
  };

  useEffect(() => {
    if (isError) {
      console.log("SNACKBAR: Error while creating image");
    }

    if (!user) {
      navigate("/login");
    }

    // if (isSuccess) {
    //   console.log("SNACKBAR: Image successfully created");
    //   navigate("/images", { state: { open: true, message } });
    // }
    // dispatch(reset());
  }, [isError, isSuccess, user, dispatch, navigate, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <UploadForm
      handleChange={handleChange}
      handleFileChange={handleFileChange}
      submitImage={handleUpdate}
      formData={formData}
      heading="Update your image"
    >
      Update
    </UploadForm>
  );
};
export default UpdateImage;
