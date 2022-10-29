import { Box, IconButton, ImageList } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Image from "./Image";

const Gallery = ({ images, saveItem, isSaved }) => {
  const { saved } = useSelector((state) => state.profile.profile);

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

export default Gallery;
