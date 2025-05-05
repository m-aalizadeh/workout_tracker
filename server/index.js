const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rateLimit = require("./middlewares/rateLimit");
const timeout = require("./middlewares/timeLimit");
const { sanitizeInputMiddleware } = require("./middlewares/sanitize");
const { activityLogger, errorLogger } = require("./middlewares/activityLogger");
const routes = require("./routes");
const dotenv = require("dotenv");
const { connectDb } = require("./config/database");

dotenv.config();
connectDb();

const port = process.env.PORT || 8000;

const app = express();

app.use(rateLimit);
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // Your Next.js app origin
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(activityLogger);
app.use(express.json());
app.use(sanitizeInputMiddleware);
app.use(timeout);
app.use("/api/v1", routes);
app.use(errorLogger);
app.listen(port, () => console.log("Server is running on port %d", port));
