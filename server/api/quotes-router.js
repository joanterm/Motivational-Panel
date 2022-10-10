const router = require("express").Router()
const Quotes = require("./quotes-model")

router.get("/", (req, res) => {
    Quotes.findAll()
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((error) => {
        res.status(500).json({message: "Error"})
    })
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    Quotes.findById(id)
    .then((result) => {
        if(!result) {
            res.status(404).json({message: "No result with this id"})
        } else {
            res.status(200).json(result)
        }
    })
    .catch((error) => {
        res.status(500).json({message: "Something went wrong"})
    })
})

router.post("/", (req, res) => {
    console.log(req.body)
    Quotes.postQuote(req.body)
    .then((item) => {
        return Quotes.findById(item.id)
    })
    .then((result) => {
        res.status(201).json(result)
    })
    .catch((error) => {
        res.status(500).json({message: "Something went from with post request"})
    })
})

module.exports = router