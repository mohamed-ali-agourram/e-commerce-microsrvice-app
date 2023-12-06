console.clear()
const express = require("express")
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("PRODCUTS SERVICE")
})

app.listen(4000, () => {
    console.log('http://localhost:4000/');
})