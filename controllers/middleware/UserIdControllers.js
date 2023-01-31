//IMPORTING USERMODEL
const User = require('../../models/User.Model')
//EXPORTING AND AUTH
module.exports = (req, res, next) => {

    let email = req.Token.email ? req.Token.email : null
    if (email === "") {//NO DETAILS ABOUT TOKEN
        res.message = "ALAS: TOKEN DOESNOT HAVE ANY DETAILS"
        return res.json(
            { success: false, message: "ALAS: TOKEN DOESNOT HAVE ANY DETAILS", status: 401 }
        )
    }
    else {//DETAILS ABOUT TOKEN

        User
            .find({ email: email })
            .exec()
            .then((result) => {
                req.userUniqueId = result[0]._id
                next()
            }).catch(error => {
                console.log("AUTH : " + error)
            })
        //req.userUniqueId = decodedToken

    }
}