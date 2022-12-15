const db = require("../db-config")

function findAll() {
    return db("quotes")
}

function findById(id) {
    return db("quotes")
    .where("id", id)
    .first()
}

function postQuote(quote) {
    return db("quotes")
    .insert(quote)
    .then((id) => {
        return findById(id[0])
    })
}

function updateQuote(id, quotes) {
    return db("quotes")
    .where("id", id)
    .update(quotes)
    .then(() => {
        return findById(id)
    })
}

function deleteQuote(id) {
    return db("quotes")
    .where("id", id)
    .del()
}


module.exports = {
    findAll, 
    findById,
    postQuote,
    deleteQuote,
    updateQuote
}