const BayModel = require("../Models/bay.model");
const DataModel = require("../Models/data.model");

class BayService {
  constructor() {}
  addData(reqBody) {
    new DataModel({
      game: req.body.game,
      play_time: req.body.play_time,
      bay_id: req.body.bay_id,
    })
      .save()
      .then((data) => {
        return { message: "Data added" };
      })
      .catch((err) => {
        return { message: "Data not added" };
      });
  }
}

module.exports.BayService = BayService;
