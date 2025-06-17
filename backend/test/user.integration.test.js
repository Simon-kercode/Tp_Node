const request = require("supertest");
const { app, initDB } = require("../server");
const { getDB } = require("../config/db");

describe("POST /users", () => {
  // Avant tous les tests, on initialise la BDD et on récupère le token CSRF et les cookies de session
  beforeAll(async () => {
    await initDB();

    // Récupère le token CSRF et les cookies nécessaires pour la requête POST sécurisée
    const res = await request(app).get("/csrf-token");
    csrfToken = res.body.csrfToken;
    cookies = res.headers['set-cookie'];
  });

  // Après tous les tests, on nettoie la BDD en supprimant l'utilisateur de test et on ferme la connexion
  afterAll(async () => {
    const db = getDB();
    await db.query("DELETE FROM _user WHERE mail = ?", ["test@mail.com"]);
    await db.end();
  });

  // Test principal : vérifie que la création d'un utilisateur fonctionne
  it("doit créer un nouvel utilisateur et retourner un statut 201", async () => {
    // Envoie une requête POST pour créer un utilisateur, avec les bons headers et le body
    const response = await request(app)
      .post("/users")
      .set("Cookie", cookies) // Ajoute les cookies de session
      .set("X-CSRF-Token", csrfToken) // Ajoute le token CSRF pour la sécurité
      .send({
        nom: "Test",
        prenom: "User",
        mail: "test@mail.com",
        pwd: "Password123!"
      });

    // Vérifie que le serveur répond avec un statut 201 (création réussie)
    expect(response.status).toBe(201);
    // Vérifie que la réponse contient le bon message de confirmation
    expect(response.body).toHaveProperty("message", "Votre compte a bien été créé !");
    // Vérifie que la réponse contient un identifiant d'utilisateur
    expect(response.body).toHaveProperty("id");
  });
});