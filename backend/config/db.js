// Importation de mysql2 avec support des promesses pour gérer la base de données MySQL

const mysql = require('mysql2/promise')

let connection;

/**
 * Fonction asynchrone pour initialiser la connexion à la base de données.
 * Vérifie si une connexion existe déjà avant d'en créer une nouvelle.
 */

const initDB = async (retries = 10, delay = 3000) => {
  if (!connection) {
    for (let i = 0; i < retries; i++) {
      try {
        // Création d'une connexion MySQL avec les informations stockées dans les variables d'environnement
        connection = await mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME
        });

        console.log('Connexion MySQL établie avec succès.');
        break;
      } catch (error) {
        // Gestion des erreurs en cas d'échec de connexion à MySQL
        console.error(`Erreur de connexion à MySQL (tentative ${i + 1}/${retries}) :`, error.message);
        if (i < retries - 1) {
          await new Promise(res => setTimeout(res, delay));
        } else {
          throw new Error('Impossible de se connecter à MySQL après plusieurs tentatives.');
        }
      }
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