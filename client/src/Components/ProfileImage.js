import { Avatar, Box, Button, Grid, Typography } from "@mui/material";

const ProfileImage = ({ profile, preview, handleFileChange }) => {
  return (
    <Grid item textAlign="center">
      <Box className="image-container">
        <Avatar
          sx={{ width: 200, height: 200 }}
          src={preview ? preview : profile.photo}
          alt="profile"
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
            onChange={handleFileChange}
            accept="image/*"
            type="file"
            required
          />
        </Button>
      </Box>
      <Typography variant="h5" sx={{ my: 1 }}>
        {profile.username}
      </Typography>
    </Grid>
  );
};

export default ProfileImage;
