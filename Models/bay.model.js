const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

module.exports = mongoose.model("Bay", BaySchema);
