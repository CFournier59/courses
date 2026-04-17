const sharp = require('sharp');
const fs = require('fs');
const path = require('path');


// middleware d'optimisation des images
module.exports = (req, res, next) => {
    // S'il n'y a pas de fichier, passer au middleware suivant
    if (!req.file) {
        return next();
    }
    // Optimiser l'image
    const filePath = req.file.path;
    const { name } = path.parse(req.file.filename);
    const optimizedFileName = `optimized-${name}.webp`;
    const optimizedFilePath = path.join('images', optimizedFileName);
    sharp(filePath)
        .resize(206)
        .toFormat('webp', { quality: 80 })
        .toFile(optimizedFilePath)
        .then(() => {   
            // Supprimer le fichier original
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting original file:', err);
                }
            });
            // mettre à jour les informations du fichier dans la requête
            req.file.filename = optimizedFileName;
            req.file.path = optimizedFilePath;
            req.file.mimetype = 'image/webp';
            next();
        })
        .catch(err => {
            console.error('Error optimizing image:', err);
            next(err);
        });
};