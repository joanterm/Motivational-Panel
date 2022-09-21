const router = require("express").Router()

router.get("/", (req, res) => {
    res.send("Router working")
})

module.exports = router