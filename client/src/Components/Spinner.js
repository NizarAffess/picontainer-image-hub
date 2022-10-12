import { CircularProgress, Grid } from "@mui/material";

const Spinner = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <CircularProgress
          sx={{ width: "80px !important", height: "80px !important" }}
        />
      </Grid>
    </Grid>
  );
};

export default Spinner;
