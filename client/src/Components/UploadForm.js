import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const UploadForm = (props) => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {props.heading}
        </Typography>
        <Box
          component="form"
          onSubmit={props.submitImage}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            value={props.formData?.title || ""}
            label="Title"
            name="title"
            onChange={props.handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            value={props.formData?.description || ""}
            multiline
            rows={3}
            label="Description"
            name="description"
            onChange={props.handleChange}
          />
          <Button
            sx={{ bgcolor: "text.primary", mt: 2, p: 1 }}
            variant="contained"
            fullWidth
            component="label"
          >
            {/* <UploadFile sx={{ mr: 1 }} /> */}
            Upload Image
            <input
              hidden
              onChange={props.handleFileChange}
              accept="image/*"
              type="file"
              required
            />
          </Button>
          <br />
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: "text.primary", mt: 3, mb: 2 }}
          >
            {props.children}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UploadForm;
