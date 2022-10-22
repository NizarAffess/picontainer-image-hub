import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createImage, reset } from "../features/images/imageSlice";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const UploadForm = (props) => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
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

  const submitImage = async (e) => {
    e.preventDefault();
    const imageData = new FormData();
    imageData.append("title", title);
    imageData.append("description", description);
    imageData.append("url", file);
    dispatch(createImage(imageData));
  };

  useEffect(() => {
    if (isError) {
      console.log("SNACKBAR: Error while creating image");
    }

    if (!user) {
      navigate("/login");
    }

    if (isSuccess) {
      console.log("SNACKBAR: Image successfully created");
      navigate("/images", { state: { open: true, message } });
    }
    dispatch(reset());
  }, [isError, isSuccess, user, dispatch, navigate, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Upload New Image
        </Typography>
        <Box component="form" onSubmit={submitImage} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={formData?.title || ""}
            label="Title"
            name="title"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            value={formData?.description || ""}
            multiline
            rows={3}
            label="Description"
            name="description"
            onChange={handleChange}
          />
          <Button
            sx={{ bgcolor: "text.primary", mt: 2, p: 1 }}
            variant="contained"
            fullWidth
            component="label"
          >
            {/* <UploadFile sx={{ mr: 1 }} /> */}
            Upload Image
            <input
              hidden
              onChange={handleFileChange}
              accept="image/*"
              type="file"
              required
            />
          </Button>
          <br />
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: "text.primary", mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default UploadForm;
