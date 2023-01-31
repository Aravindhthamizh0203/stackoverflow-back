//IMPORTING EXPRESS
const express = require("express");
//IMPORTING MONGOOSE
const mongoose = require("mongoose");
//ROUTER IN EXPRESS
const router = express.Router();
//IMPORTING USER MODEL
const User = require("../../models/User.Model")
//GET DATA
router.get('/', (req, res, next) => {
    User
        .find()
        .then(result => {
            res
                .status(200)
                .json({
                    message: "user data",
                    data: result
                })
        })
        .catch(error => {
            res
                .status(400)
                .json({
                    message: "no user data",
                    error: error
                })
        })
})
router.get('/:UserId', (req, res, next) => {
    const id = req.params.UserId ? req.params.UserId : null
    Company
        .findById({ _id: id })
        .then(result => {
            res
                .status(200)
                .json({
                    message: "single user data",
                    data: result
                })
        })
        .catch(error => {
            res.status(400).json({
                message: "data not found",
                error: error
            })
        })
})


// router.post('/', (req, res, next) => {
//     const user = new User({
//         _id: new mongoose.Types.ObjectId(),
//         name: req.body.name,
//         desp: req.body.desp,
//         image: req.body.image,
//         address: req.body.address,
//         programlang: req.body.programlang,
//         country: req.body.country,
//         state: req.body.state
//     })

//     user.save()
//         .then(result => {
//             res
//                 .status(200)
//                 .json({
//                     message: "user data saved",
//                     data: result
//                 })
//         })
//         .catch(error => {
//             res
//                 .status(404)
//                 .json({
//                     message: "unable to post user data",
//                     error: error
//                 })
//         })
// })




// router.put('/:UserId', (req, res, next) => {
//     const id = req.params.UserId ? req.params.UserId : null;
//     User
//         .findOneAndUpdate({ _id: id })
//         .then(result => {
//             res
//                 .status(200)
//                 .json({
//                     message: "user upadated",
//                     data: result
//                 })
//         }).catch(error => {
//             res
//                 .status(404)
//                 .json({
//                     message: "unable to update user data",
//                     error: error
//                 })
//         })
// })

// router.delete('/:UserId', (req, res, next) => {
//     const id = req.params.UserId ? req.params.UserId : null;
//     User
//         .deleteOne({ _id: id })
//         .then(result => {
//             res
//                 .status(200)
//                 .json({
//                     message: "user delete",
//                     data: result
//                 })
//         }).catch(error => {
//             res
//                 .status(404)
//                 .json({
//                     message: "unable to delete user data ",
//                     error: error
//                 })
//         })
// })







module.exports = router;