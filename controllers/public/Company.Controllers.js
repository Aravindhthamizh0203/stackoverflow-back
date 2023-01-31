//IMPORTING EXPRESS
const { json } = require("body-parser");
const express = require("express");
//IMPORTING MONGOOSE
const mongoose = require("mongoose");
//ROUTER IN EXPRESS
const router = express.Router();
//
const Company = require("../../models/Company.Model");
// const AuthTokenControllers = require("../middleware/AuthTokenControllers");
// const UserIdControllers = require("../middleware/UserIdControllers");
//GET DATA
router.get('/', (req, res, next) => {
    Company.find().then(result => {
        res.status(200).json({ message: "company data", data: result })
    }).catch(error => {
        res.status(400).json({ message: "no company data", error: error })
    })
})

router.get('/:CompanyId', (req, res, next) => {
    const id = req.params.CompanyId ? req.params.CompanyId : null
    Company.findById({ _id: id }).then(result => {
        res.status(200).json({
            message: "single company data",
            data: result
        })
    }).catch(error => {
        res.status(400).json({
            message: "data not fund",
            error: error
        })
    })
})


router.post('/', (req, res, next) => {
    const company = new Company({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        desp: req.body.desp,
        image: req.body.image,
        address: req.body.address,
        programlang: req.body.programlang,
        country: req.body.country,
        state: req.body.state
    })

    company.save()
        .then(result => {
            res
                .status(200)
                .json({
                    message: "company saved",
                    data: result
                })
        })
        .catch(error => {
            res
                .status(404)
                .json({
                    message: "unable to post",
                    error: error
                })
        })
})




router.put('/:CompanyId', (req, res, next) => {
    const id = req.params.CompanyId ? req.params.CompanyId : null;
    Company
        .findOneAndUpdate({ _id: id })
        .then(result => {
            res
                .status(200)
                .json({
                    message: "company upadated",
                    data: result
                })
        }).catch(error => {
            res
                .status(404)
                .json({
                    message: "unable to update",
                    error: error
                })
        })
})

router.delete('/:CompanyId', (req, res, next) => {
    const id = req.params.CompanyId ? req.params.CompanyId : null;
    Company
        .deleteOne({ _id: id })
        .then(result => {
            res
                .status(200)
                .json({
                    message: "company delete",
                    data: result
                })
        }).catch(error => {
            res
                .status(404)
                .json({
                    message: "unable to delete",
                    error: error
                })
        })
})







module.exports = router;