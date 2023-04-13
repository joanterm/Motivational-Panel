const router = require("express").Router()
const Quotes = require("./quotes-model")
const {checkToken} = require("../middleware/check-token")

router.get("/", checkToken, (req, res, next) => {
    Quotes.findAll()
    .then((result) => {
        res.status(200).json(result)
    })
    .catch(next)
})

router.get("/:id", (req, res, next) => {   
    const id = req.params.id
    Quotes.findById(id)
    .then((result) => {
        if(result == null) {
            res.status(404).json({message: "No results with this ID number"})
        } else {
            res.status(200).json(result)
        }
    })
    .catch(next)
})

router.post("/", (req, res, next) => {
    Quotes.postQuote(req.body)
    .then((item) => {
        return Quotes.findById(item.id)
    })
    .then((result) => {
        res.status(201).json(result)
    })
    .catch(next)
})

router.delete("/:id", (req, res, next) => {
    const id = req.params.id
    Quotes.findById(id)
    .then((result) => {
        if (result == null) {
            res.status(404).json({message: "No results with this ID number"})
            return
        }
        Quotes.deleteQuote(id)
        .then(() => {
            res.status(200).json(result)
        })
    })
    .catch(next)
})

router.put("/:id", (req, res, next) => {
    const id = req.params.id
    Quotes.updateQuote(id, req.body)
    .then(() => {
        return Quotes.findById(id)
    })
    .then((result) => {
        res.status(200).json(result)
    })
    .catch(next)
})

module.exports = router