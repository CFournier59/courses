const Book = require('../models/Book');
const fs = require('fs');

exports.getAllBooks = (req, res, next) => {
    Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));}

exports.getBestBooks = (req, res, next) => {
    Book.find().sort({ averageRating: -1 }).limit(3)
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
}

exports.getThisBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
}

exports.rateBook =  (req, res, next) => {
    const userId = req.auth.userId;
    const rating = req.body.rating;
    Book.findOne({ _id: req.params.id })
    .then(book => {
        // Vérifier si l'utilisateur a déjà noté ce livre
        const existingRating = book.ratings.find(r => r.userId === userId);
        if (existingRating) {
            return res.status(400).json({ message: 'Vous avez déjà noté ce livre.' });
        }
        // Ajouter la nouvelle note
        book.ratings.push({ userId : userId, grade: rating });
        // mise à jour de la note moyenne
        const totalRating = book.ratings.reduce((sum, r) => sum + r.grade, 0);
        book.averageRating = (totalRating / book.ratings.length).toFixed(1);
        // Enregistrer les modifications
        book.save()
        .then(() =>  res.status(200).json( book ))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(404).json({ error }));
}

exports.createBook = (req, res, next) => {
    // parsing de l'objet book
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._userId;
    // création d'une instance du modèle Book
    const book = new Book({
         ...bookObject,
         userId: req.auth.userId,
         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
         averageRating: 0,
         ratings: [],
     });
    // enregistrement dans la base de données
     book.save()
     .then(() => res.status(201).json({ message: 'Livre créé !' }))
     .catch(error => res.status(400).json({ error }));
 }

 exports.deleteBook = (req, res, next) => {
    Book.findOne({_id: req.params.id})
    .then(book => {
        // vérifier si l'utilisateur est autorisé à supprimer le livre
        if (book.userId != req.auth.userId) {
            res.status(403).json({message: 'Non-autorisé'});    
        }else{
            // suppression de l'image associée au livre
            const filename = book.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                // suppression du livre dans la base de données
                Book.deleteOne({_id: req.params.id})
                .then(() => { res.status(200).json({message: 'Livre supprimé !'})})
                .catch(error => res.status(401).json({ error }));
            });
        }
    }).catch( error => {
        res.status(500).json({ error });
    });
 }

exports.modifyBook = (req, res, next) => {
    // vérifier si une nouvelle image a été envoyée
    const bookObject = req.file ?
    {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    delete bookObject.userId;
    Book.findOne({_id: req.params.id})
    .then((book) => {
        // vérifier si l'utilisateur est autorisé à modifier le livre
        if (book.userId != req.auth.userId) {
            return res.status(403).json({message: 'Non-autorisé'});
        }
        // supprimer l'ancienne image si une nouvelle a été uploadée 
        if(req.file){
            const filename = book.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, (err) => {
                if (err) console.log(err)
            })}
        // mise à jour du livre dans la base de données
        Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Livre modifié !'}))
        .catch(error => res.status(401).json({ error }));   
    })
    .catch( error => {
        res.status(500).json({ error });
    });   
}




