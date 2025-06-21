const User = require("../models/User.js");
const { getDB } = require("../config/db.js");
const bcrypt = require("bcryptjs");

// On crée des mocks pour simuler les modules externes
jest.mock("../config/db.js");
jest.mock("bcryptjs");

describe("User.create", () => {
  it("doit insérer un utilisateur avec un mot de passe haché", async () => {
    // On simule le hachage du mot de passe pour qu'il retourne toujours le même résultat
    bcrypt.hash.mockResolvedValue("motdepasse_haché");
    
    // On simule la méthode query de la base de données pour retourner un insertId fictif
    const mockQuery = jest.fn().mockResolvedValue([{ insertId: 1 }]);
    getDB.mockReturnValue({ query: mockQuery });

    // exemple pour la création d'utilisateur
    const data = {
      nom: "Igor",
      prenom: "Mages",
      mail: "igor@mail.com",
      pwd: "Password123!"
    };

    // On appelle la méthode à tester
    const result = await User.create(data);

    // on vérifie que le mot de passe a bien été haché
    expect(bcrypt.hash).toHaveBeenCalledWith("Password123!", 10);
    // on vérifie que la requête SQL a été appelée avec les bons paramètres, dont le mot de passe haché
    expect(mockQuery).toHaveBeenCalledWith(
      `INSERT INTO _user (nom, prenom, mail, pwd) VALUES (?, ?, ?, ?)`,
      ["Igor", "Mages", "igor@mail.com", "motdepasse_haché"]
    );
    // on vérifie que la méthode retourne bien l'insertId attendu
    expect(result).toEqual({ insertId: 1 });
  });
});
