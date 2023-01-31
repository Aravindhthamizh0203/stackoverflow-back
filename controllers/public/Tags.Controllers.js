//IMPORTING EXPRESS
const express = require("express");
//IMPORTING MONGOOSE
const mongoose = require("mongoose");
//ROUTER IN EXPRESS
const router = express.Router();
//IMPORTING TAGS FROM TAGSCHEMA
const Tags = require("../../models/Tags.Model");
// const AuthTokenControllers = require("../middleware/AuthTokenControllers");
// const UserIdControllers = require("../middleware/UserIdControllers");

router.get('/', (req, res, next) => {
    Tags.find().then(result => {
        res
            .status(200)
            .json({
                message: "data found",
                data: result
            })

    })
        .catch((error) => {
            return res
                .status(400)
                .json({
                    message: "unable get data",
                    error: error
                })
        })
});


router.post('/', (req, res, next) => {
    const tags = new Tags({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        desp: req.body.desp
    })
    tags.save().then(result => {
        res.status(200)
            .json({
                message: "unbale to post data",
                data: result
            })

    }).catch(error => {
        res
            .status(200)
            .json({
                message: "error in post data",
                error: error
            })
    })
});


router.put('/:tagID', (req, res, next) => {
    const id = req.params.tagID ? req.params.tagID : null
    Tags.findOneAndUpdate({ _id: id })
        .then(result => {
            res.status(200)
                .json({
                    message: "updated",
                    data: result
                })
        }).catch((error) => {
            return res
                .status(200)
                .json({
                    message: "not able to add data",
                    error: error
                })
        })
});


router.delete('/:tagID', (req, res, next) => {
    const id = req.params.tagID ? req.params.tagID : null
    Tags.findOneAndDelete({ _id: id })
        .then((result) => {
            if (result) {
                return res
                    .status(400)
                    .json({
                        message: "unable to delete",
                        data: result
                    })
            }
            return res
                .status(200
                ).json({
                    message: "data deleted"
                })
        }).catch((error) => {
            return res
                .status(200)
                .json({
                    message: "not able to delete data",
                    error: error
                })
        })
});



module.exports = router;