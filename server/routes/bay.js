const router = require("express").Router();
const Bay = require("../../Models/bay.model");
const User = require("../../Models/user.model");
const Data = require("../../Models/data.model");
const bcrypt = require("bcryptjs");

router.route("/login").post((req, res) => {
  try {
    User.findOne({ email: String(req.body.email) }, (err, user) => {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) return res.status(200).send("Login Success");
        return res.status(401).send("Login Error");
      });
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
});

router.route("/addbay").post((req, res) => {
  try {
    User.find({ email: req.body.email }, (err, result) => {
      let user = result[0];
      let newBay = new Bay({
        name: req.body.bay_name,
        data: [],
        company: user.company,
        user_token: user.id,
      })
        .save()
        .then((bay) => {
          user.bays.push(bay.id);
          user
            .save()
            .then(() => {
              return res.status(201).send("Bay Added To User");
            })
            .catch(() => {
              return res.status(500).send("Couldn't Save Bay To User");
            });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send("Could Not Save Bay");
        });
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
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
