const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const timeout = require("connect-timeout");
const userRouter = require("./routes/user");
const exerciseRouter = require("./routes/exercise");
const usersRouter = require("./routes/customer");
const fileRouter = require("./routes/file");
const { connectDb } = require("./config/database");

dotenv.config();
connectDb();

const port = process.env.PORT || 8000;

const app = express();
app.use(timeout("5s"));
app.use((req, res, next) => {
  if (!req.timedout) {
    return;
  }
  next();
});
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // Your Next.js app origin
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
app.use((err, req, res, next) => {
  if (req.timedout) {
    if (!res.headersSet) {
      return res
        .status(503)
        .json({ status: "error", message: "Request timed out" });
    }
  }
});
app.listen(port, () => console.log("Server is running on port %d", port));
