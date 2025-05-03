const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const userRouter = require("./routes/user");
const exerciseRouter = require("./routes/exercise");
const usersRouter = require("./routes/customer");
const fileRouter = require("./routes/file");
const { connectDb } = require("./config/database");

dotenv.config();
connectDb();

const port = process.env.PORT || 8000;

const app = express();
app.use(cookieParser());
app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/exercise", exerciseRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/files", fileRouter);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to workout tracker application!!!" });
});
app.listen(port, () => console.log("Server is running on port %d", port));
