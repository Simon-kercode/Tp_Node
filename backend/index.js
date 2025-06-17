const { app, initDB } = require("./server");
const port = process.env.PORT || 3000;

(async () => {
    try {
        await initDB();
        app.listen(port, () => {
            console.log(`Serveur démarré sur le port ${port}`);
        });
    } catch (error) {
        console.error("Erreur lors de l'initialisation :", error);
    }
})();
