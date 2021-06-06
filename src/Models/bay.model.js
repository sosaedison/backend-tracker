import { Schema, model } from "mongoose";

const BaySchema = new Schema(
  {
    data: [
      {
        type: Schema.Types.ObjectId,
        ref: "datas",
      },
    ],
    bay_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Bay", BaySchema);
