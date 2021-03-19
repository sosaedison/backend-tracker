require("dotenv").config();
const express = require("express");

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const exit_codes = require("../config/exit_codes.json");
const UserRouter = require("./routes/user");

// Middleware Functions
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", UserRouter);

// DB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`SERVER RUNNING ON PORT: ${process.env.PORT}`);
    })
  )
  .catch((error) => {
    console.log(error);
    process.exit(exit_codes.DB_CONNECT_FAILURE);
  });
const { connection } = mongoose;
connection.once("open", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connection to database");
  }
}); // DB Connection
