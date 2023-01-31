//IMPORTING JWT
const JWT = require('jsonwebtoken')
//JWT SECRET KEY
// const JWT_SECRET_KEY = `${process.env.JWT_SECRET_KEY1}`

module.exports = (req, res, next) => {

    const TOKEN = req.Token
    console.log(TOKEN)
    try {
        next()
    } catch (error) {
        return res
            .status(401)
            .json({ "success": false, code: 401, message: "Un-Authorised Access", token: TOKEN })
    }

}