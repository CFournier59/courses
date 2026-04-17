const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB}.okbdkgb.mongodb.net/courses?retryWrites=true&w=majority`)
  .then(async () => {

    // hachage du mot de passe
    bcrypt.hash(CLEM_PASSWORD, 10)
        .then(hash => {
            const user = new User({
                name: "clem",
                password: hash
            });
            // enregistrement dans la base de données
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur clem créé !' }))
                console.log("clem créé")
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));

        bcrypt.hash(CHLO_PASSWORD, 10)
        .then(hash => {
            const user = new User({
                name: "chlo",
                password: hash
            });
            // enregistrement dans la base de données
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur clem créé !' }))
                console.log("chlo créée")
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
   
  })
  .catch(err => console.error(err));