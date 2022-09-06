const express = require("express")
const server = express()

server.listen(9000, () => {
    console.log("Listening on port 9000...")
})

server.get("/api", (req, res) => {
    res.json({
        "users":["quote1", "quote2", "quote3"]
    })
})