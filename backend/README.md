# Mon vieux Grimoire


## Comment lancer la partie backend du projet ? 

Dans le terminal, placez vous dans le dossier backend en tapant la commande `cd backend`, puis...

### 1 installation des dépendances

Pour installer les dépendances, lancez-la commande:
`npm install`

Le paquet "mongoose-unique-validator" n'étant pas à jour, il peut y avoir des erreurs de dépendances dans le script d'installation. Le cas échéant, lancez la commande: 
`npm install --force`

### 2 utilisation des identifiants d'accès à la base de données

Dans le dossier backend, créez un fichier et nommez-le `.env`, puis collez-y le contenu du fichier `.env.example`

### 3 lancement du server

Lancez la commande : `node server`
le serveur backend est configuré à: http://localhost:4000

### (Optionnel) nettoyage de la base de données

Pour réinitialiser la base de données, lancez depuis le dossier backend la commande: 
`node seed.js`

