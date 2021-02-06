const express = require("express");

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const UserRouter = require("./routes/user");
const BayRouter = require("./routes/bay");
const DataRouter = require("./routes/baydata");
require("dotenv").config();

// Middleware Functions

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", UserRouter);
app.use("/bay", BayRouter);
app.use("/data", DataRouter);

// const server = https.createServer({key: key, cert: cert }, app);
// Connection to the Mongo Atlas DB at the TrackerData DB

// eslint-disable-next-line max-len
mongoose.connect(
  "mongodb+srv://root:root@tracker.9tcqk.mongodb.net/Tracker?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);
const { connection } = mongoose;
connection.once("open", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connection to database");
  }
}); // DB Connection

// Listening
app.listen(5000, () => {
  console.log(`SERVER RUNNING ON PORT: 5000`);
});
