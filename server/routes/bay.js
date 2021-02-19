const router = require("express").Router();
const Bay = require("../../Models/bay.model");
const User = require("../../Models/user.model");
const Data = require("../../Models/data.model");
const bcrypt = require("bcryptjs");

router.route("/login").post((req, res) => {
  try {
    User.findOne({ email: String(req.body.email) })
      .then((user) => {
        bcrypt
          .compare(String(req.body.password), user.hash)
          .then((data) => {
            res.status(201).json({ data });
          })
          .catch((err) => res.status(500).json({ err }));
      })
      .catch((err) => {
        res.status(401).json({ err });
      });
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.route("/addbay").post((req, res) => {
  try {
    User.find({ company: req.body.company }).then((data) => {});
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.route("/adddata").post((req, res) => {
  try {
    // UP SECURITY
    const newData = new Data({
      game: req.body.game,
      playSession: req.body.playSession,
      bayid: req.body.bayid,
      date: req.body.date,
      time: req.body.time,
    });
    newData
      .save()
      .then((data) => {
        Bay.findOne({ _id: String(req.body.bayid) })
          .then((bay) => {
            bay.data.push(data._id);
            bay.save((err, response) => {
              if (err) {
                res.status(500).json({ error: err });
              } else {
                res.status(201).json({ msg: "Data added!", bay: bay.data });
              }
            });
          })
          .catch((err) => {
            res.status(500).json({ error: "Server did not find bay" });
          });
      })
      .catch((err) =>
        res.status(500).json({ error: "Server could not create Data" })
      ); // newData Save
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

router.route("/gettrackedgames/:id").get((req, res) => {
  try {
    User.findById(req.params.id)
      .then((user) => {
        res.status(201).json({ tracked_games: user.games });
      })
      .catch();
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
