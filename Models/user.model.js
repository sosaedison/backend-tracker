const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const validator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    name : {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    company: String,
    bays : [{
        type: Schema.Types.ObjectId,
        ref:'bays'
    }],
    games: Array,
    token: String
},{
    timestamps: true
});

UserSchema.plugin(validator);
module.exports = mongoose.model('User', UserSchema);