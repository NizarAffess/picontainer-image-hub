import { ImageListItem, ImageListItemBar } from "@mui/material";

const Image = ({ image }) => {
  return (
    <ImageListItem>
      <img
        src={`${image.url}?w=164&h=164&fit=crop&auto=format`}
        // srcSet={`${image.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        alt={image.title}
        loading="lazy"
      />
      <ImageListItemBar title={image.title} className="image-title" />
    </ImageListItem>
  );
};

export default Image;
