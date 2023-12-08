console.clear()
const express = require("express")
const app = express()

const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/commande-service")
const Commande = require("./Commande")
const isAuthenticated = require("./isAuthenticated")

const axios = require('axios');

app.use(express.json());

function prixTotal(produits) {
    let total = 0;
    for (let t = 0; t < produits.length; ++t) {
        total += produits[t].prix;
    }
    return total;
}

async function httpRequest(ids) {
    const url = "http://localhost:4000/produit/acheter";
    try {
        const response = await axios.post(url, { ids });
        return prixTotal(response.data);
    } catch (error) {
        throw error;
    }
}

app.post('/commande/ajouter', isAuthenticated, async (req, res) => {
    try {
        const { ids } = req.body;
        const prix_total = await httpRequest(ids);
        const newCommande = new Commande({
            produits: ids,
            email_utilisateur: req.user.email,
            prix_total,
        });
        newCommande.save()
            .then(commande => res.status(201).json(commande))
            .catch(error => res.status(400).json({ error }));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen("4001", () => {
    console.log('http://localhost:4001/');
})