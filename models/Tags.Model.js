//IMPORTING MONGOOSE
const mongoose = require("mongoose");

const TagScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    desp: {
        type: String
    }

});
module.exports = mongoose.model('Tags', TagScheme)