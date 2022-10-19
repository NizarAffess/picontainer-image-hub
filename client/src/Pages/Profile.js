import { Box, Container, Grid, Typography } from "@mui/material";

const Profile = () => {
  return (
    <Container className="profile-container">
      <Box
        sx={{
          width: "100%",
          height: "auto",
          maxHeight: "300px",
          overflowY: "hidden",
        }}
      >
        <img
          src="/test-assets/cover-photo-1.jpg"
          alt="profile cover"
          loading="lazy"
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item>
          <img
            src="/test-assets/user-photo-1.jpg"
            alt="profile"
            loading="lazy"
          />
          <Typography component="h3">username</Typography>
        </Grid>
        <Grid item>
          <Typography component="p">Biography</Typography>
          <Typography component="p">Address</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
