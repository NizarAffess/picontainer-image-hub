import { Avatar, Box, Container, Grid, Typography } from "@mui/material";

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
      <Grid container rowSpacing={2} columnSpacing={3} sx={{ m: 2 }}>
        <Grid item textAlign="center">
          <Avatar
            sx={{ width: 200, height: 200 }}
            src="/test-assets/user-photo-1.jpg"
            alt="profile"
            loading="lazy"
          />
          <Typography variant="h5" sx={{ my: 1 }}>
            username
          </Typography>
        </Grid>
        <Grid item sx={{ mx: 4, maxWidth: "450px" }}>
          <Typography component="p" sx={{ mb: 1 }}>
            <Typography variant="h6">About</Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            odit dolore, perferendis praesentium tempore fugiat voluptate
            assumenda esse quis debitis.
          </Typography>
          <Typography variant="h6">Address</Typography>
          <Typography component="p">
            CityVille, downtown, CountryLand
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
