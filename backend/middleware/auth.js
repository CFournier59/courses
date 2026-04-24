const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


// middleware d'authentification
module.exports = (req, res, next) => {
  try {
    // extraction et vérification du token
    const token = req.headers.authorization.split(' ')[1];
    console.log("SECRET:", process.env.JWT_SECRET)

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    // ajout de l'userId à la requête
    req.auth = { userId: userId };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }}