const router = require("express").Router();
const Data = require("../../Models/data.model");

router.route("/get").get((req, res) => {
  try {
    Data.find({}).then().catch();
  } catch (err) {
    res.status(500).json({ error });
  }
});

router.route("/add").post((req, res) => {});

router.route("/delete").post((req, res) => {});

module.exports = router;
