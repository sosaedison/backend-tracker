const router = require("express").Router();
const User = require("../../Models/user.model");
const Data = require("../../Models/data.model");
const Bay = require("../../Models/bay.model");
const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10;

router.route("/register").post((req, res) => {
  try {
    bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
      if (err) return res.status(500).send("Server Error");
      bcrypt.hash(req.body.password, salt, function (err, hashed) {
        if (err) return res.status(500).send("Server Error");
        User({
          name: req.body.name,
          email: req.body.email,
          company: req.body.company,
          password: hashed,
          bays: [],
          games: [],
        })
          .save()
          .then((data) => {
            console.log(data);
            return res.status(201).send({
              bays: data.bays,
              games: data.games,
              email: data.email,
              company: data.company,
            });
          })
          .catch((err) => {
            return res
              .status(500)
              .send("New User Could Not Be Added To Database");
          });
      });
    });
  } catch (err) {
    return res.status(500).send({ err: err });
  }
});

router.route("/login").post((req, res) => {
  try {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).send("User Not Found");
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) return res.status(401).send("Login Error");
        return res.status(200).send({
          bays: user.bays,
          games: user.games,
          email: user.email,
          company: user.company,
        });
      });
    });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

router.route("/updateinfo").post((req, res) => {
  try {
    // TODO Add security for password and email changing
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (req.body.password !== "none") {
          bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
            if (err) return res.status(500).send("Internal Server Error");
            bcrypt.hash(req.body.password, salt, (err, hashed) => {
              if (err) res.status(500).send("Internal Server Error");
              user.name = req.body.name;
              user.games = req.body.games;
              user.email = req.body.new_email;
              user.password = hashed;
              user
                .save()
                .then((data) => {
                  res.status(200).send({
                    message: "User data updated",
                    data: {
                      name: data.name,
                      games: data.games,
                      email: data.email,
                    },
                  });
                })
                .catch((err) => {
                  res.status(500).send("Could Not Update User Info");
                });
            });
          });
        } else {
          user.name = req.body.name;
          user.games = req.body.games;
          user.email = req.body.new_email;
          user
            .save()
            .then((data) => {
              return res.status(200).send("User data updated");
            })
            .catch((err) => {
              return res.status(500).send("Could Not Update User Info");
            });
        }
      })
      .catch((err) => {
        return res.status(500).send("Internal Server Error");
      });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
});

router.route("/updatebayinfo").post((req, res) => {
  try {
    Bay.findOne({ _id: req.body.id }, (err, bay) => {
      if (err)
        return res.status(500).send("Internal Server Error: Can't find user");
      bay.name = req.body.bay_name;
      bay
        .save()
        .then(() => {
          return res.status(200).send("Bay info updated");
        })
        .catch(() => {
          return res
            .status(500)
            .send("Internal Server Error: Can't update bay info");
        });
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
});

router.route("/addbay").post((req, res) => {
  try {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err)
        return res
          .status(500)
          .send("Internal Server Error: Couldn't find user");
      Bay({
        name: req.body.bay_name,
        data: [],
        company: user.company,
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
          return res.status(500).send("Could Not Save Bay");
        });
    });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
});

router.route("/adddata").post((req, res) => {
  try {
    Data({
      game: req.body.game,
      play_time: req.body.play_time,
      bayid: req.body.bayid,
    })
      .save()
      .then((data) => {
        Bay.findOne({ _id: req.body.bayid })
          .then((bay) => {
            bay.data.push(data._id);
            bay
              .save()
              .then((data) => {
                return res.status(201).send("Data added to bay");
              })
              .catch((err) => {
                return res
                  .status(500)
                  .send("Internal Server Error: Can't save bay data id");
              });
          })
          .catch((err) => {
            return res.status(500).send({ error: "Server did not find bay" });
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({ error: "Server could not create Data" });
      }); // newData Save
  } catch (error) {
    return res.status(500).send({ error: "Server Error" });
  }
});

router.route("/gettrackedgames").get((req, res) => {
  try {
    User.findOne({ email: req.body.email })
      .then((user) => {
        return res.status(200).send({ games: user.games });
      })
      .catch((err) => {
        return res.status(500).send("Internal Server Error: Can't find user");
      });
  } catch (err) {
    res.status(500).send({ error: "Server error" });
  }
});

router.route("/getdata").get((req, res) => {
  try {
    Data.find({ _id: req.body.id })
      .then((data) => res.status(200).send({ data }))
      .catch((err) =>
        res
          .status(500)
          .send("Internal Server Error: Can't find games for this bay")
      );
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.route("/deletedata").post((req, res) => {
  try {
    Data.findOneAndDelete({
      game: req.body.game,
      play_time: req.body.play_time,
      bay_id: req.body.bay_id,
      date: req.body.date,
      time: req.body.time,
    })
      .then((data) => res.status().send(""))
      .catch((error) => res.status(500).send(""));
  } catch (error) {
    res.status(500).send({ error });
  }
});
module.exports = router;
