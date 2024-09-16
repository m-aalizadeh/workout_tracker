const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/user");
const { connectDb } = require("./config/database");

dotenv.config();
connectDb();

const port = process.env.PORT || 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to workout tracker application!!!" });
});
app.listen(port, () => console.log("Server is running on port %d", port));
