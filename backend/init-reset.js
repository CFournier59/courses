// script d'initialisation/réinitialisation des données dans la base MongoDB

const mongoose = require('mongoose');
const Budget = require('./models/Budget');
const Transaction = require('./models/Transaction');
const User = require('./models/User');
require('dotenv').config();
const bcrypt = require('bcrypt');

async function run() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB}.okbdkgb.mongodb.net/courses?retryWrites=true&w=majority`
    );

    console.log('Connecté à MongoDB');

    await Budget.deleteMany();
    await User.deleteMany();
    await Transaction.deleteMany();

    console.log("Collections vidées");

    // Création de Clem
    const clemHash = await bcrypt.hash(process.env.CLEM_PASSWORD, 10);
    await User.create({
      name: "clem",
      password: clemHash
    });
    console.log("Utilisateur clem créé");

    // Création de Chlo
    const chloHash = await bcrypt.hash(process.env.CHLO_PASSWORD, 10);
    await User.create({
      name: "chlo",
      password: chloHash
    });
    console.log("Utilisateur chlo créé");

  } catch (err) {
    console.error("Erreur :", err);
  } finally {
    mongoose.connection.close();
    process.exit();
  }
}

run();
