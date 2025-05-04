const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const timeout = require("express-timeout-handler");
const routes = require("./routes");
const rateLimit = require("./middlewares/rateLimit");
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
app.use(express.json());
app.use(
  timeout.handler({
    timeout: 10000,
    onTimeout: (req, res) => {
      res.status(503).json({ status: "error", message: "Request timed out" });
    },
    onDelayedResponse: (req, method, args, requestTime) => {
      console.warn(`Attempted to call ${method} after timeout`);
    },
  })
);
app.use("/api/v1", routes);
app.listen(port, () => console.log("Server is running on port %d", port));
