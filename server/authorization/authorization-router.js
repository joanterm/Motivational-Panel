const authorizationRouter = require("express").Router()
const Users = require("./authorization-model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../secret")
require('dotenv').config()

authorizationRouter.get("/", (req, res, next) => {
    Users.findAll()
    .then((result) => {
        res.status(200).json(result)
    })
    .catch(next)
})

authorizationRouter.post("/", (req, res, next) => {
    const {username, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, 12)//12 represents 12 salt rounds
    const user = {
        username: username, 
        password: hashedPassword
    }
    Users.postUser(user)
    .then((item) => {       
        return Users.findUserById(item.id)
    })
    .then((result) => {       
        res.status(201).json(result)
    })
    .catch(next)
})

authorizationRouter.post("/login", (req, res, next) => {   
    const {username, password} = req.body
    console.log("Req.body", req.body);   
    Users.findUserByUsername(username)
    .then((result) => {
        console.log("RESULT", result)
        if (bcrypt.compareSync(password, result.password)) {
            console.log("SAME PASSWORD")
           const jwtToken = generateToken(result) 
           console.log("TOKEN:", jwtToken);                
           res.status(200).json({message: `Welcome back ${result.username}`, jwtToken: jwtToken})
        } else {
            res.status(401).json({message: "We do not recognize this password"})
        }
    })
})

const generateToken = (user) => {
    const payload = {
        subject: user.id,
        username: user.username
    }
    // const secret = JWT_SECRET
    const options = {
        expiresIn: "1h"
    }
    return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = authorizationRouter