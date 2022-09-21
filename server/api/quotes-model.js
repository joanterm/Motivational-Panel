const db = require("../db-config")

function findAll() {
    return db("quotes")
}

module.exports = findAll