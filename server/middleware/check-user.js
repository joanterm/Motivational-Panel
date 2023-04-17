const Users = require("../authorization/authorization-model")

//UPON LOGIN, CHECKS IF USER EXISTS IN THE DATABASE
const checkIfUserExists = (req, res, next) => {
    const {username} = req.body  
    Users.findByAnyFilter({"username": username})    
    .then((result) => {
        if (result == null) {
            res.status(401).json({message: "We do not recognize this username"})
            return
        }
    })
    next()
}

module.exports = {
    checkIfUserExists
}