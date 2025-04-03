# PawShop

PawShop est une application e-commerce dédiée aux accessoires et produits pour animaux de compagnie. Elle permet aux utilisateurs de naviguer, ajouter des articles à leur panier et finaliser leurs commandes de manière intuitive.

## 🚀 Fonctionnalités

- 🛒 Gestion du panier (ajout, suppression, modification des quantités)
- 💳 Paiement (fictif) par carte bancaire
- 📦 Suivi des commandes
- 📂 Gestion des produits et catégories
- 🧑‍💼 Interface administrateur pour la gestion du catalogue et des utilisateurs

## 📦 Installation

### Prérequis

- Node.js & npm
- MySQL

### Installation du projet

```sh
# Cloner le projet
git clone https://github.com/ton-profil/pawshop.git
cd pawshop

# Installer les dépendances du frontend
cd frontend
npm install

# Installer les dépendances du backend
cd ../backend
npm install
```

## 🖥️ Configuration

### Base de données

Créer une base de données MySQL et exécuter le script SQL fourni dans `backend/database/schema.sql`.

Mettre à jour le fichier `.env` du backend avec vos informations de connexion :

```env
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
JWT_SECRET
```

### Lancement du projet

```sh
# Démarrer le backend
cd backend
npm start

# Démarrer le frontend
cd ../frontend
npm run dev
```

Le projet sera disponible sur `http://localhost:3000/`.

## 📖 API Endpoints

### Authentification

- `POST /api/auth/register` : Inscription
- `POST /api/auth/login` : Connexion

### Utilisateurs

- `GET /api/users` : Récupérer tous les utilisateurs(admin)
- `GET /api/users/:id` : Récupérer un utilisateur par ID
- `POST /api/users` : Ajouter un utilisateur
- `PUT /api/users/:id` : Modifier un utilisateur
- `DELETE /api/users/login/:id` : Supprimer un utilisateur (admin)

### Produits

- `GET /api/produits` : Récupérer tous les produits
- `GET /api/produits/categories` : Récupérer tous les produits et leurs catégories associées
- `GET /api/produits/:id` : Récupérer un produit par ID
- `POST /api/produits` : Ajouter un produit (admin)
- `PUT /api/produits/:id` : Modifier un produit (admin)
- `DELETE /api/produits/:id` : Supprimer un produit (admin)

### Commandes

- `GET /api/orders` : Récupérer toutes les commandes (admin)
- `GET /api/orders/produits` : Récupérer toutes les commandes et leurs produits associés (admin)
- `GET /api/orders/:id` : Récupérer une commande
- `POST /api/orders` : Créer une commande
- `PUT /api/orders/:id` : Modifier une commande (admin)
- `DELETE /api/orders/:id` : Supprimer une commande (admin)

### Catégories

- `GET /api/categories` : Récupérer toutes les catégories
- `GET /api/categories/:id` : Récupérer une catégorie
- `POST /api/categories` : Créer une catégorie (admin)
- `PUT /api/categories/:id` : Modifier une catégorie (admin)
- `DELETE /api/categories/:id` : Supprimer une catégorie (admin)


## 🛠️ Technologies

- **Frontend** : Vue.js (Vuetify, Vite.js)
- **Backend** : Node.js, Express.js
- **Base de données** : MySQL
