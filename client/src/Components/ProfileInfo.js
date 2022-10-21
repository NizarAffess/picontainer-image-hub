import { Grid, TextField, Typography } from "@mui/material";

const ProfileInfo = ({ profile, formData, handleChange }) => {
  return (
    <Grid item sx={{ mx: 4, maxWidth: "450px" }}>
      <Typography component="div" sx={{ mb: 1 }}>
        <Typography variant="h6">About</Typography>
        {profile.bio ? (
          profile.bio
        ) : (
          <TextField
            margin="normal"
            fullWidth
            value={formData?.about || ""}
            multiline
            rows={3}
            label="Tell others a bit about yourself"
            name="about"
            onChange={handleChange}
          />
        )}
      </Typography>
      <Typography component="div" sx={{ mb: 1 }}>
        <Typography variant="h6">Address</Typography>
        {profile.address ? (
          profile.address
        ) : (
          <TextField
            margin="normal"
            fullWidth
            value={formData?.address || ""}
            label="Where do you live?"
            name="address"
            onChange={handleChange}
          />
        )}
      </Typography>
    </Grid>
  );
};

export default ProfileInfo;
