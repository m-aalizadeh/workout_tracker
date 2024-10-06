import Grid from "@mui/material/Grid2";
import exercise from "../source/exercise.jpg";
import User from "./User";

const Home = () => {
  const width = window.innerWidth / 2;

  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <img
          style={{
            height: "100vh",
            width: width,
          }}
          alt="exercise"
          src={exercise}
        />
      </Grid>
      <Grid size={6}>
        <User />
      </Grid>
    </Grid>
  );
};

export default Home;
