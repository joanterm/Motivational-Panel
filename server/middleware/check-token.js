const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../secret")

const checkToken = (req, res, next) => {  
    const token = req.headers.authorization   
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if(err) {
                res.status(401).json({message: "Token doesn't match"})
                return
            }     
            req.decodedToken = decodedToken
            next()
        })
    } else {
       res.status(401).json({message: "Token required"})
    }  
}

module.exports = {checkToken}
