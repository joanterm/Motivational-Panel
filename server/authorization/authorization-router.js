const authorizationRouter = require("express").Router()
const Users = require("./authorization-model")
const bcrypt = require("bcrypt")

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


module.exports = authorizationRouter