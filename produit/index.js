console.clear()
const express = require("express")
const app = express()

const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/produit-service")
const Produit = require("./Produit")

app.use(express.json())

app.get("/", (req, res) => {
    res.send("PRODCUTS SERVICE")
})

app.listen(4000, () => {
    console.log('http://localhost:4000/');
})