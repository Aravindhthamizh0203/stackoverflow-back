//IMPORTING EXPRESS
const express = require("express");
//IMPORTING MONGOOSE
const mongoose = require("mongoose");
//ROUTER IN EXPRESS
const router = express.Router();
//IMPORTING USER FROM MODEL
const User = require("../../models/User.Model");
//IMPORTING BCRYPT
const bcrypt = require("bcrypt");

//API 1:LOGIN USER DATA
router.get("/", (req, res, next) => {
    User.find()
        .then((result) => {
            if (result < 1) {
                return res
                    .status(404)
                    .json({ message: "No Entries!! No users!!", data: result });
            }

            return res.status(200).json({
                message: "Handling User GET_REQUEST is Successfull",
                data: result,
            });
        })
        .catch((error) => {
            return res
                .status(200)
                .json({ message: "Handling User GET_REQUEST is Failed", error: error });
        });
});

// API 2:DATA FOR SINGLE USER
router.get("/:userId", (req, res, next) => {
    const id = req.params.userId ? req.params.userId : null;

    User.findById({ _id: id })
        .then((result) => {
            if (!result) {
                return res
                    .status(200)
                    .json({ message: "Sorry!! we could'nt find the product" });
            }

            return res.status(200).json({
                message: "Handling /:userId GET_REQUEST is Successfull",
                count: result.length,
                data: result,
            });
        })
        .catch((error) => {
            return res.status(200).json({
                message: "Handling /:userId GET_REQUEST is Failed",
                error: error,
            });
        });
});

// API 3:DATA TO SIGN UP
router.post("/", (req, res, next) => {
    User.find({ email: req.body.email })
        .then((result) => {
            if (result.length >= 1) {
                return res
                    .status(303)
                    .json({ message: "Sorry the account already exists" });
            }

            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: req.body.password,
            });

            return user.save();
        })
        .then((result) => {
            return res.status(201).json({
                message: "Handling / POST_REQUEST is Successfull",
                status: "201",
                response: result,
            });
        })
        .catch((error) => {
            return res
                .status(200)
                .json({ message: "Handling / POST_REQUEST is Failed", error: error });
        });
});

// API 4:DELETE USER FROM DATABASE
router.delete("/:userId", (req, res, next) => {
    const id = req.params.productId ? req.params.productId : null;

    User.deleteOne({ id })
        .then((result) => {
            res.status(200).json({
                message: "Handling /:userId DELETE_REQUEST is successfull",
                data: result,
            });
        })
        .catch((error) => {
            res.status(200).json({
                message: "Handling /:userId DELETE_REQUEST is Failed",
                error: error,
            });
        });
});

module.exports = router;
