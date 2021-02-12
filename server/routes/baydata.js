const router = require("express").Router();
const Data = require("../../Models/data.model");

router.route("/get").get((req, res) => {
  try {
    Data.find()
      .then((data) => res.send({ data }))
      .catch((err) => res.json({ err }));
  } catch (err) {
    res.status(500).json({ error });
  }
});

router.route("/search").post((req, res) => {
  try {
    let game = "";
    let play_time = 0;
    let bay_id = "";
    let date = "";
    let time = 0;
    Data.find({ $text: { $search: "SUPERHOTVR.exe" } })
      .then((data) => res.send({ data }))
      .catch((error) => res.status(500).json({ error }));
  } catch (error) {
    res.status(500).json({ error });
  }
});
router.route("/add").post((req, res) => {
  // TODO Change APP TRACKER VARIABLE TO play_time and bay
  try {
    let newData = new Data({
      game: req.body.game,
      play_time: req.body.play_time,
      bay_id: req.body.bay_id,
      date: req.body.date,
      time: req.body.time,
    });

    newData
      .save()
      .then((data) => res.json({ data }))
      .catch((err) => res.status(500).json({ err }));
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.route("/delete").post((req, res) => {
  try {
    Data.findOneAndDelete({
      game: req.body.game,
      play_time: req.body.play_time,
      bay_id: req.body.bay_id,
      date: req.body.date,
      time: req.body.time,
    })
      .then((data) => res.json({ data }))
      .catch((error) => res.status(500).json({ error }));
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
