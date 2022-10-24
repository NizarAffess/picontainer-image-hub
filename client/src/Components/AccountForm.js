import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const AccountForm = (props) => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "text.primary" }}></Avatar>
        <Typography component="h1" variant="h5">
          Account
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={props.saveProfileInfo}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={props.handleChange}
                id="username"
                value={props.formData.username}
                label="username"
                name="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={props.handleChange}
                id="email"
                value={props.formData.email}
                label="Email Address"
                name="email"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                value={props.formData.bio}
                multiline
                rows={3}
                label="Tell others a bit about yourself"
                name="bio"
                onChange={props.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                value={props.formData.address}
                label="Where do you live?"
                name="address"
                onChange={props.handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "text.primary",
              textTransform: "capitalize",
              my: 2,
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AccountForm;
