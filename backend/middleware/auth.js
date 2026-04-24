const jwt = require('jsonwebtoken');


// middleware d'authentification
module.exports = (req, res, next) => {
  console.log("auth...")
  try {
    // extraction et vérification du token
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'oY7iF!qhxi$KytG#ji3!fhbGksyQq?45PpbGr5g!5itTzE8z$m6JbSki46YoTpDJ');
    const userId = decodedToken.userId;
    // ajout de l'userId à la requête
    req.auth = { userId: userId };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }}