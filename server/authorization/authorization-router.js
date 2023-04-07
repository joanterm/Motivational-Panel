const authorizationRouter = require("express").Router()
const Users = require("./authorization-model")

authorizationRouter.get("/", (req, res, next) => {
    Users.findAll()
    .then((result) => {
        res.status(200).json(result)
    })
    .catch(next)
})

authorizationRouter.post("/", (req, res, next) => {
    Users.postUser(req.body)
    .then((item) => {
        return Users.findUserById(item.id)
    })
    .then((result) => {
        res.status(201).json(result)
    })
    .catch(next)
})



module.exports = authorizationRouter