import { Box, Button } from "@mui/material";

const CoverImage = ({
  profile,
  coverFile,
  coverPreview,
  handleCoverFileChange,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        maxHeight: "300px",
        textAlign: "center",
        overflowY: "hidden",
      }}
    >
      {profile.coverPhoto ? (
        <img src={profile.coverPhoto} alt="profile cover" loading="lazy" />
      ) : (
        <Box sx={{ position: "relative" }}>
          <img
            style={{ height: "300px", width: "100%" }}
            src={coverFile ? coverPreview : "/test-assets/wide-cover.jpg"}
            alt="profile cover"
            loading="lazy"
          />
          <Button
            sx={{
              bgcolor: "text.primary",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: coverFile ? "none" : "block",
            }}
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
      )}
    </Box>
  );
};

export default CoverImage;
