const router = require("express").Router()
const findAll = require("./quotes-model")

router.get("/", (req, res) => {
    findAll()
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((error) => {
        res.status(500).json({message: "Error"})
    })
})

module.exports = router