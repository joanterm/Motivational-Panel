const db = require("../db-config")

function findAll() {
    return db("favorites")
}

function findFavoriteById(id) {
    return db("favorites")
    .where("id", id)
    .first()
}

function postFavoriteQuote(quote) {
    return db("favorites")
    .insert(quote)
    .then((id) => {
        return findFavoriteById(id[0])
    })
}

function deleteFavoriteQuote(id) {
    return db("favorites")
    .where("id", id)
    .del()
}

module.exports = {
    findAll,
    findFavoriteById,
    postFavoriteQuote,
    deleteFavoriteQuote
}