//IMPORTING JWT
const JWT = require('jsonwebtoken')
//EXPORTING REQ,RES,NEXT
module.exports = (req, res, next) => {

    let TOKEN = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';//BAERER 

    if (req.headers.authorization === "") {
        res.message = "ERROR: UNAUTHORIZED ACCESS"
        return res.json({ success: false, message: "ERROR: UNAUTHORIZED ACCESS", status: 401 })
    }
    try {
        const decodedToken = JWT.verify(TOKEN, `${process.env.JWT_SECRET_KEY1}`)
        req.Token = decodedToken
        next()
    } catch (error) {
        res.message = "ERROR: UNAUTHORIZED ACCESS"
        return res.json({ success: false, message: "ERROR: UNAUTHORIZED ACCESS", status: 401 })
    }

}