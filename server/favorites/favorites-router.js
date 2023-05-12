const favoritesRouter = require("express").Router()
const Favorites = require("./favorites-model")

favoritesRouter.get("/", (req, res, next) => {
    Favorites.findAll()
    .then((result) => {
        res.status(200).json(result)
    })
    .catch(next)
})

favoritesRouter.post("/", (req, res, next) => {
    Favorites.postFavoriteQuote(req.body)
    .then((item) => {
        return Favorites.findFavoriteById(item.id)
    })
    .then((result) => {
        res.status(201).json(result)
    })
    .catch(next)
})

module.exports = favoritesRouter