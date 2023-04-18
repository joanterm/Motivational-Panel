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

//WHEN REGISTERING, CHECKS IF CERTAIN CONDITIONS ARE MET TO PROCEED
const checkRegistrationReqs = (req, res, next) => {
    if (req.body.username.trim() === "" && req.body.password.trim() === "" ) {
        res.status(422).json({message: "Both username and password need to be created"})
        return
    }
    if (req.body.username.trim().length < 3) {
        res.status(422).json({message: "Username must be at least 3 characters long"})
        return
    } 
    if (req.body.password.trim().length < 3) {
        res.status(422).json({message: "Password must be at least 3 characters long"})
        return
    }
    next()
}


module.exports = {
    checkIfUserExists,
    checkRegistrationReqs
}