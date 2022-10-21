import { Avatar, Box, Button, Grid, Typography } from "@mui/material";

const ProfileImage = ({ profile, file, preview, handleFileChange }) => {
  return (
    <Grid item textAlign="center">
      {profile.photo ? (
        <Avatar
          sx={{ width: 200, height: 200 }}
          src={profile.photo}
          alt="profile"
          loading="lazy"
        />
      ) : (
        <Box sx={{ position: "relative" }}>
          <Avatar
            sx={{ width: 200, height: 200 }}
            src={preview}
            alt="profile"
            loading="lazy"
          />
          <Button
            sx={{
              bgcolor: "text.primary",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: file ? "none" : "block",
            }}
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
      )}
      <Typography variant="h5" sx={{ my: 1 }}>
        {profile.username}
      </Typography>
    </Grid>
  );
};

export default ProfileImage;
