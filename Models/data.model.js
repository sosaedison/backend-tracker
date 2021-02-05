const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    game: {
      type: String,
      required: true,
    },
    playSession: {
      type: Number,
      required: true,
    },
    bayid: {
      type: Schema.Types.ObjectId,
      ref: "bays",
      required: true,
    },
    date: String,
    time: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Data", DataSchema);
