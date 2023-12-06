console.clear()
const express = require("express")
const app = express()

app.get("/", (req, res) => {
    res.send("ORDERS SERVICE")
})

app.listen(4001, () => {
    console.log('http://localhost:4001/');
})