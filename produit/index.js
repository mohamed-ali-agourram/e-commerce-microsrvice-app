console.clear()
const express = require("express")
const app = express()

const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/produit-service")
const Produit = require("./Produit")

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello");
});


app.post("/produit/ajouter", async (req, res) => {
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
        res.status(400).send(e.message);
    }
});

app.post('/produit/acheter', (req, res) => {
    const { ids } = req.body;
    Produit.find({ _id: { $in: ids } })
        .then(produits => res.status(201).json(produits))
        .catch(error => res.status(400).json({ error }));
});

app.listen(4000, () => {
    console.log('http://localhost:4000/');
})