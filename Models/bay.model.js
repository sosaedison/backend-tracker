const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BaySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    data : [{
        type: Schema.Types.ObjectId,
        ref: 'datas'
    }],
    company: String,
    companyid: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps : true
});

module.exports = mongoose.model("Bay", BaySchema);