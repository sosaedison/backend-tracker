const router = require("express").Router();
const User = require("../../Models/user.model");
const bcrypt = require("bcryptjs");
const rand = require("random-token").create(process.env.RAND_TOKEN_SALT);

router.route("/register").post((req, res) => {
  try {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.status(500).send("Server Error");
      }
      bcrypt.hash(req.body.password, salt, function (err, hashed) {
        if (err) {
          return res.status(500).send("Server Error");
        }
        let newUser = new User({
          name: req.body.name,
          email: req.body.email,
          company: req.body.company,
          password: hashed,
          bays: [],
          games: [],
          token: rand(process.env.SALT_ROUNDS),
        })
          .save()
          .then((data) => {
            return res.status(500).send("New User Registered");
          })
          .catch((err) => {
            console.log(err);
            return res
              .status(500)
              .send("New User Could not be added to database");
          });
      });
    });
  } catch (err) {
    return res.status(500).send("Server Error");
  }
});
router.route("/login").post((req, res) => {
  try {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (user === null) {
        return res.status(401).json({ err });
      } else {
        return res.status(200).json({ user });
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.route("/updateinfo").post((req, res) => {
  try {
    User.findOne({ email: req.body.email })
      .then((user) => {
        user.name = req.body.name;
        user.games = req.body.games;
        user
          .save()
          .then((data) => res.status(201).json({ data }))
          .catch((err) => res.status(500).json({ err }));
      })
      .catch((err) => res.status(500).json({ err }));
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
