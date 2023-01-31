const mongoose = require("mongoose");
const AddressSchema = mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
})
const CompanyScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    desp: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    address: [AddressSchema],
    programlang: {
        type: String,
        required: true
    }

});
module.exports = mongoose.model('Company', CompanyScheme)