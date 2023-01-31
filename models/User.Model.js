//IMPORTING MONGOOSE
const mongoose = require('mongoose');
//address
const AddressSchema = mongoose.Schema({
    country: { type: String, required: true },
    state: { type: String, required: true }
})
//bcrypt
const bcrypt = require('bcrypt');
//user schema
const UserScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'User',
        required: true
    },
    phoneNumber: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    programlang: {
        type: Array,
        required: true
    },
    address: [AddressSchema]
});

UserScheme.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedpasswaord = await bcrypt.hash(this.password, salt)
        this.password = hashedpasswaord
        next()
    } catch (error) {
        next(error)
    }
})

module.exports = mongoose.model('User', UserScheme)
