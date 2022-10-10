const express = require("express")
const server = express()
server.use(express.json({extended: false}))

const PORT = process.env.PORT || 9000
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})

//ROUTER
const router = require("./api/quotes-router")
server.use("/api", router)

//SANITY CHECK
server.get("/", (req, res) => {
    res.send("Express working!")
})

//FOR FRONT END TESTING PURPOSES ONLY
// server.get("/api", (req, res) => {
//     res.json({
//         "users":["test1", "test2", "test3"]
//     })
// })