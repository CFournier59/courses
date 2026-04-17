const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.signup = (req, res, next) => {
    // hachage du mot de passe
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // enregistrement dans la base de données
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        // vérifier si l'utilisateur existe
        if(!user){
            return res.status(401).json({ error: 'paire email/mot de passe incorrecte !' });
        }
        // vérifier si le mot de passe est correct
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid){
                return res.status(401).json({ error: 'paire email/mot de passe incorrecte !' });
            }
            res.status(200).json({
                userId: user._id,
                // génération d'un token d'authentification
                token: jwt.sign(
                    { userId: user._id },
                    'oY7iF!qhxi$KytG#ji3!fhbGksyQq?45PpbGr5g!5itTzE8z$m6JbSki46YoTpDJ',
                    { expiresIn: '24h' }
                )
            })
        }).catch(error => res.status(500).json({ error }));
    }) .catch(error => res.status(500).json({ error }));    
}