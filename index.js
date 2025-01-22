(async () => {
    const express = require('express')
    const app = express()
    const port = 3000
    const route = require('./src/routeur/route')
    const { initDB }  = require('./config/db')

    app.set('views', './src/view');
    app.set('view engine', 'ejs');

    app.use(express.urlencoded({
        extended: true
    }))

    app.use("/", route)

    try {
        await initDB();
        
        app.listen(port, () => {
            console.log(`Serveur démarré sur le port ${port}`);
        });
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de l\'application:', error);
    }
})();
