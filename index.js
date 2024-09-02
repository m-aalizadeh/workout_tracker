const express = require("express");
const dotenv = require("dotenv");
const { connectDb } = require("./config/database");
const userRouter = require("./routes/user");
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

connectDb();
app.use(express.json());
app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to workout tracker application!!!" });
});
app.listen(port, () => console.log("Server is running on port %d", port));

// const cors = require("cors");
// const dbConfig = require("./config/db.config");

// let corsOptions = {
//   origin: "http://localhost/3000",
// };

// app.use(cors(corsOptions));

// app.use(express.urlencoded({ extended: true }));

// const db = require("./models");
// const Role = db.role;
// db.mongoose
//   .connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to the database");
//   })
//   .catch((err) => {
//     console.log("Cannot connect to the database!", err);
//     process.exit();
//   });

// const routes = require("./routes");

// require("./routes/user.routes")(app);
