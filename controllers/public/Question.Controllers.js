//IMPORTING EXPRESS
const bodyParser = require("body-parser");
const express = require("express");
//IMPORTING MONGOOSE
const mongoose = require("mongoose");
//ROUTER IN EXPRESS
const router = express.Router();
//IMPORTING QUESTION SCHEMA
const Question = require("../../models/Question.Model");
// const AuthTokenControllers = require("../middleware/AuthTokenControllers");
// const UserIdControllers = require("../middleware/UserIdControllers");

//API 1:GET ALL THE QUESTION
router.get("/", (req, res, next) => {
    Question.find().then((result) => {
        if (result < 1) {
            return res.status(404).json({ message: "no questions", data: result })
        }
        return res.status(200).json({
            message: "qusetion",
            data: result,
        });
    }
    ).catch((error) => {
        return res.status(200).json({
            message: "error",
            error: error
        })
    })
});
//API 2: GET A SINGLE QUESTION
router.get('/questionID', (req, res, next) => {
    const id = req.params.questionID ? req.params.questionID : null
    Question.findById({ _id: id }).then((result) => {
        if (!result) {
            return res
                .status(404)
                .json({
                    message: "not a complete question"
                })
        }
        return res.status(200).json({ message: "question data", data: result })

    })
        .catch((error) => {
            res.status(200).json({
                message: "something went wrong",
                error: error
            })
        })
});
//API 3: POSTING A QUSETION
router.post('/', (req, res, next) => {
    const question = new Question({
        _id: new mongoose.Types.ObjectId(),
        topic: req.body.topic,
        question: req.body.question,
        programlang: req.body.programlang,
        createdby: req.body.createdby,
        createdTime: req.body.createdTime,
        comments: req.body.comments


    })
    question.save().then(result => {
        res.status(201).json({
            message: "question added", status: "201",
            data: result,
        })
    }
    ).catch(error => {
        res
            .status(200)
            .json({
                message: "question not added ",
                error: error
            })
    })
});
//API 4: DELETE A QUESTION
router.delete('/:questionID', (req, res, next) => {
    const id = req.params.questionID ? req.params.questionID : null
    Question.findOneAndRemove({ _id: id }).then(result => {
        res.status(200)
            .json({
                message: "deleted",
                data: result
            })
    }).catch(error => {
        res.status(200).json({
            message: "something went wrong and couldn't delete",
            error: error
        })
    })
});
module.exports = router;