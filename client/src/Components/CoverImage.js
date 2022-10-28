import { Box, Button } from "@mui/material";

const CoverImage = ({ profile, coverPreview, handleCoverFileChange }) => {
  return (
    <Box className="cover-wrapper">
      <Box className="image-container">
        <img
          style={{ maxHeight: "300px", width: "100%" }}
          src={coverPreview ? coverPreview : profile.coverPhoto}
          alt="profile cover"
          loading="lazy"
        />
        <Button
          sx={{ bgcolor: "text.primary" }}
          className="upload-icon"
          variant="contained"
          component="label"
        >
          {/* <UploadFile sx={{ mr: 1 }} /> */}
          Upload
          <input
            hidden
            onChange={handleCoverFileChange}
            accept="image/*"
            type="file"
            required
          />
        </Button>
      </Box>
    </Box>
  );
};

export default CoverImage;
