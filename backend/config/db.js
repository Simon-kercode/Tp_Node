// On fait appel au dotenv pour saisir les variables d'environnement 
// Importation de mysql2 avec support des promesses pour gérer la base de données MySQL

const dotenv = require('dotenv');
const mysql = require('mysql2/promise')

// Chargement des variables d'environnement définies dans le fichier .env
dotenv.config();

let connection;

/**
 * Fonction asynchrone pour initialiser la connexion à la base de données.
 * Vérifie si une connexion existe déjà avant d'en créer une nouvelle.
 */

const initDB = async () => {
  if (!connection) {
    try {
      // Création d'une connexion MySQL avec les informations stockées dans les variables d'environnement
      connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
      });

      console.log('Connexion MySQL établie avec succès.');
    } catch (error) {
      // Gestion des erreurs en cas d'échec de connexion à MySQL
      console.error('Erreur de connexion à MySQL :', error);
    }
  }
};

// Fonction pour récupérer la connexion
const getDB = () => {
  if (!connection) {
    throw new Error('La connexion à la base de données n\'a pas été initialisée.');
  }
  return connection;
};

module.exports = { initDB, getDB };