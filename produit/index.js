console.clear()
const express = require("express")
const app = express()

const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/produit-service")
const Produit = require("./Produit")

app.use(express.json())

app.post("/produit/ajouter", async (req, res, next) => {
    const { nom, description, prix } = req.body;
    try {
        const newProduit = new Produit({
            nom,
            description,
            prix
        });
        const resultat = await newProduit.save()
        res.status(201).send(resultat)
    } catch (e) {
        res.status(400).send({ error });
    }
});

app.get("/produit/acheter", async (req, res) => {
    const { ids } = req.body;
    // in mongosh: db.produits.find({_id: {$in: [ObjectId("657049f163cada5dd4e506c9"), ObjectId("65704ad263cada5dd4e506d4")]}})
    try {
        const produits = await Produit.find({ _id: { $in: ids } })
        res.status(201).send(produits)
    } catch (e) {
        res.status(400).send(e.message)
    }
});

app.listen(4000, () => {
    console.log('http://localhost:4000/');
})