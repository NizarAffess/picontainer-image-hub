import { Box, IconButton, ImageList } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Image from "./Image";

const Gallery = (props) => {
  const { saved } = useSelector((state) => state.profile.profile);

  return (
    <ImageList sx={{ margin: "2em" }} cols={3}>
      {props.images?.map((image) => (
        <Box key={image._id} className="image">
          <Link to={`/image/${image._id}`} className="image-item">
            <Image image={image} />
          </Link>
          <IconButton
            aria-label={`save ${image.title}`}
            className="image-title image-save"
            onClick={() => props.saveItem(image._id)}
          >
            {/* <BookmarkBorderIcon aria-label="save" /> 
            <BookmarkIcon aria-label="unsave" /> */}
            {saved && props.isSaved(image._id) ? "Unsave" : "Save"}
          </IconButton>
        </Box>
      ))}
    </ImageList>
  );
};

export default Gallery;
