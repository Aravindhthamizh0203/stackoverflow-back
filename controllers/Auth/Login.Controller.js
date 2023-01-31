//IMPORTING EXPRESS
const Express = require("express");
//IMPORTING MONGOOSE
const mongoose = require("mongoose");
//USING ROUTER IN EXPRESS
const router = Express.Router();
//IMPORTING USER FROM IN USER MODEL
const User = require("../../models/User.Model");
//IMPORTING BCRYPT
const bcrypt = require("bcrypt");
//IMPORTING JWT
const JWT = require("jsonwebtoken");
//IMPORTING AUTHROUTE FROM MIDDLEWARE
const AuthRoute = require("../middleware/AuthRouteControllers");
//IMPORTING AUTHTOCKEN FROM MIDDLEWARE
const AuthToken = require("../middleware/AuthTokenControllers");

//API 1: GET DATA FOR ALL
router.get("/", (req, res, next) => {
    User.find()
        .then((result) => {
            if (result < 1) {
                res
                    .status(404)
                    .json({ message: "No Entries!! No users!!", data: result });
            }

            res.status(200).json({
                message: "Handling User GET_REQUEST is Successfull",
                data: result,
            });
        })
        .catch((error) => {
            res
                .status(200)
                .json({ message: "Handling User GET_REQUEST is Failed", error: error });
        });
});
//API 2: GET USER SINGLE DATA
router.get("/:userId", (req, res, next) => {
    const id = req.params.userId ? req.params.userId : null;
    User.findById({ _id: id })
        .then((result) => {
            if (!result) {
                res.status(200).json({ message: "Sorry!! we could'nt find the user" });
            }
            res.status(200).json({
                message: "Handling /:userId GET_REQUEST is Successfull",
                count: result.length,
                data: result,
            });
        })
        .catch((error) => {
            res.status(200).json({
                message: "Handling /:userId GET_REQUEST is Failed",
                error: error,
            });
        });
});

//CHECKING PASSWORD IN DATA FROM USER AND SERVER
function checkPassword(userEntered, serverFound) {
    let uE = userEntered ? userEntered : null;
    let sE = serverFound ? serverFound : null;
    if (uE === sE) {
        return true;
    }
    return false;
}

//API 3: DATA TO LOGIN
router.post("/", (req, res, next) => {
    const email = req.body.email !== "" ? req.body.email : "";
    const password = req.body.password !== "" ? req.body.password : "";

    //EMAIL IS AVAILABLE (OR) NOT
    if (email === null) {
        res.message = "ERROR: KINDLY ENTER VALID EMAIL";
        return res.json({
            success: false,
            message: "ERROR: KINDLY ENTER VALID EMAIL",
            status: 401,
        });
    }

    //PASSWORD IS AVAILABLE (OR) NOT
    if (password === null) {
        res.message = "ERROR: KINDLY ENTER PASSWORD";
        return res.json({
            success: false,
            message: "ERROR: KINDLY ENTER PASSWORD",
            status: 401,
        });
    }

    //USER IS AVAILABLE (OR) NOT
    User.find({ email: email }).then((result) => {
        if (result.length < 1) {
            res.message = "ERROR: KINDLY ENTER VALID EMAIL";
            return res.json({
                success: false,
                message: "ERROR: KINDLY ENTER VALID EMAIL",
                status: 404,
            });
        } else if (!checkPassword(password, result[0].password)) {
            res.message = "ERROR: PASSWORD DONT MATCH";
            return res.json({
                success: false,
                message: "ERROR: PASSWORD DONT MATCH",
                status: 404,
            });
        } else {
            let tokenData = {
                email: result[0].email,
                password: result[0].password,
                role: "user",
            };
            let TokenOptions = {
                expiresIn: "1h",
            };
            const Token = JWT.sign(tokenData, `${process.env.JWT_SECRET_KEY}`, TokenOptions);
            return res.json({
                success: true,
                message: "Authenticated Succesfully",
                Token,
                status: 200,
            });
        }
    });
}); 1


//API 4: VERIFICATION FOR DATA IN SERVER AND USER ENTERED DATA
router.post("/verify", AuthToken, (req, res) => {
    let Token = req.headers.authorization;
    res.message = "AUTHORIZATION SUCCESSFULL";
    return res.json({
        code: 200,
        success: true,
        message: "AUTHORIZATION SUCCESSFULL",
        Token,
    });
});
//EXPORTING ROUTER
module.exports = router;
