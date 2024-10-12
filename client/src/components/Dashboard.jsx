import Grid from "@mui/material/Grid2";
import run from "../source/run.jpg";

const Dashboard = () => {
  return (
    <Grid
      style={{
        backgroundImage: `url(${run})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    ></Grid>
  );
};

export default Dashboard;
