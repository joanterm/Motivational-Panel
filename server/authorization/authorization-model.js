const db = require("../db-config")

function findAll() {
    return db("users")
}

function findUserByUsername(username) {
    return db("users")
    .where("username", username)
    .first()
}

function findUserById(id) {
    return db("users")
    .where("id", id)
    .first()
}

function postUser(user) {
    return db("users")
    .insert(user)
    .then((id) => {
        return findUserById(id[0])
    })
}

module.exports = {
    findAll,
    findUserByUsername,
    findUserById,
    postUser
}