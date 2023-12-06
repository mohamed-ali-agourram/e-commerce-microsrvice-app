console.clear()
const express = require("express")
const app = express()

const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/commande-service")
const Commande = require("./Commande")

app.get("/", (req, res)=>{
    res.send('HELLO WORLD!');
})

app.listen("4001", ()=>{
    console.log('http://localhost:4001/');
})