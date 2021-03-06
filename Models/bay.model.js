const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BaySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    data: [
      {
        type: Schema.Types.ObjectId,
        ref: "datas",
      },
    ],
    company: String,
    user_token: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bay", BaySchema);
