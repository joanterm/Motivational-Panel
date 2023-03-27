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

//ERROR HANDLING MIDDLEWARE
server.use((err, req, res, next) => {
    res.status(500).json({message: "Something wrong with the server. Error code 500"})
})

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
console.log("test")