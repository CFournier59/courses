const Budget = require('../models/Budget');
const fs = require('fs');

exports.displayBudgets = (req, res, next) => {
    Budget.find()
    .then(budgets => res.status(200).json(budgets))
    .catch(error => res.status(400).json({ error }));
}

exports.getThisBudget = (req, res, next) => {
    Budget.findOne({ _id: req.params.id })
    .then(budget => res.status(200).json(budget))
    .catch(error => res.status(404).json({ error }));
}

exports.createBudget = (req, res, next) => {
    // parsing de l'objet budget
    const budget = new Budget({
         ...req.body
     });
    // enregistrement dans la base de données
     budget.save()
     .then(() => res.status(201).json({ message: 'Budget créé !' }))
     .catch(error => res.status(400).json({ error }));
 }

exports.classifyBudget = (req, res, next) => {
    
        // mise à jour du budget dans la base de données
        console.log("requête en cours")
        Budget.updateOne({ _id: req.params.id}, { classified: true})
        .then(() => res.status(200).json({message: 'Budget cloturé !'}))
        .catch(error => res.status(401).json({ error }));   

   
}




