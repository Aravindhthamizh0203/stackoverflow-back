const mongoose = require("mongoose");
const QuestionScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    topic: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true,
        unique: true,
    },
    programlang: {
        type: Array,
        required: true
    },
    createdTime: {
        type: Date,
        default: Date.now,
        required: true
    },
    createdby: {
        type: String,
        required: true
    },
    comments: {
        type: Array,
        default: 'comt'
    }
});



module.exports = mongoose.model('Question', QuestionScheme)
