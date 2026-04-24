console.log("App.js chargé");

const express = require('express');
const mongoose = require('mongoose');
const budgetRoutes = require('./routes/budget');
const userRoutes = require('./routes/user');
const transactionRoutes = require('./routes/transaction')
const dotenv = require('dotenv').config();
const path = require('path');

// création de l'application express
const app = express();

// connexion à la base de données MongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB}.okbdkgb.mongodb.net/courses?retryWrites=true&w=majority`)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// configuration des en-têtes CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// routes de l'application - voir les fichiers dans le dossier routes
app.use('/api/budgets', budgetRoutes);
app.use('/api/transactions', transactionRoutes)
app.use('/api/auth', userRoutes);

module.exports = app;