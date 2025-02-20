(async () =>  {
require ('dotenv');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { initDB }  = require('./config/db')

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

const produitRoutes = require('./routes/produitRoutes');
app.use('/produits', produitRoutes);

try {
    await initDB();
    
    app.listen(port, () => {
        console.log(`Serveur démarré sur le port ${port}`);
    });
} catch (error) {
    console.error('Erreur lors de l\'initialisation de l\'application:', error);
}
})();
