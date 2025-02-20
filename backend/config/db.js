const dotenv = require('dotenv');
const mysql = require('mysql2/promise')

dotenv.config();

let connection;

const initDB = async () => {
  if (!connection) {
    try {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
      });

      console.log('Connexion MySQL établie avec succès.');
    } catch (error) {
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