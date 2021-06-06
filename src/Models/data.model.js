import { Schema, model } from "mongoose";

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
    bayid: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Data", DataSchema);
