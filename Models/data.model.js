const { Schema, model } = require("mongoose");
const fuzzy_match = require("mongoose-fuzzy-searching");
const DataSchema = new Schema(
  {
    game: {
      type: String,
      required: true,
    },
    play_time: {
      type: Number,
      required: true,
    },
    bay_name: {
      type: String,
      required: true,
    },
    bay_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "bays",
    },
    date: String,
    time: String,
  },
  {
    timestamps: true,
  }
);

DataSchema.plugin(fuzzy_match, {
  fields: ["game", "bay_id", "date", "time", "time_played"],
});
module.exports = model("Data", DataSchema);
