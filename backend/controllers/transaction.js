const Transaction = require('../models/Transaction');
const fs = require('fs');


exports.displayTransactions = (req, res, next) => {
    Transaction.find({ budgetId: req.params.id })
    .then(transactions => res.status(200).json(transactions))
    .catch(error => res.status(400).json({ error }));
}

exports.getThisTransaction = (req, res, next) => {
    Transaction.findOne({ _id: req.params.id })
    .then(transaction => res.status(200).json(transaction))
    .catch(error => res.status(404).json({ error }));
}

exports.createTransaction = (req, res, next) => {
    // création d'une instance du modèle Transaction
    const transaction = new Transaction({
         ...req.body
     });
    // enregistrement dans la base de données
     transaction.save()
     .then(() => res.status(201).json({ message: 'transaction créée !' }))
     .catch(error => res.status(400).json({ error }));
 }

 exports.deleteTransaction = (req, res, next) => {
    Transaction.findOne({_id: req.params.id})
    .then(transaction => {
       Transaction.deleteOne({_id: req.params.id})
                .then(() => { res.status(200).json({message: 'Transaction supprimée !'})})
                .catch(error => res.status(401).json({ error }));
    }).catch( error => {
        res.status(500).json({ error });
    });
 }






