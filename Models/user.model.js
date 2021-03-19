const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("mongoose-unique-validator");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    company: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    bays: [
      {
        type: Schema.Types.ObjectId,
        ref: "bays",
      },
    ],
    games: Array,
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(validator);
module.exports = mongoose.model("User", UserSchema);
