const express = require("express")
const server = express()
server.use(express.json({extended: false}))

server.listen(9000, () => {
    console.log("Listening on port 9000...")
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