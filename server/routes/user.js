const router = require("express").Router();
const User = require("../../Models/user.model");
const bcrypt = require("bcryptjs");

router.route("/register").post((req, res) => {
  try {
    // var name = req.body.name;
    // var email = req.body.email;
    // var company = req.body.company;
    // var password = bcrypt.genSalt(
    //   process.env.SALT_ROUNDS,
    //   function (err, salt) {
    //     if (err) {
    //       return err;
    //     }
    //     bcrypt.hash(req.body.password, salt, function (err, hashed) {
    //       if (err) {
    //         return err;
    //       }
    //       return hashed;
    //     });
    //   }
    // );

    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      company: req.body.company,
      password: "password",
      bays: [],
      games: [],
      token: "",
    });

    newUser
      .save()
      .then((data) => {
        return res.status(201).json({ data });
      })
      .catch((err) => {
        return res.status(500).json({ err: err, msg: "error save" });
      });
  } catch (err) {
    return res.status(500).json({ err: err, msg: "error try" });
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
