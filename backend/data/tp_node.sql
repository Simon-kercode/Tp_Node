-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : lun. 10 mars 2025 à 11:12
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `tp_node`
--

-- --------------------------------------------------------

--
-- Structure de la table `appartenir`
--

CREATE TABLE `appartenir` (
  `id_produit` int(11) NOT NULL,
  `id_categorie` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `appartenir`
--

INSERT INTO `appartenir` (`id_produit`, `id_categorie`) VALUES
(1, 6),
(1, 10),
(2, 7),
(2, 9),
(3, 7),
(3, 8),
(12, 6),
(12, 9),
(21, 7),
(21, 11),
(22, 6),
(22, 8),
(23, 7),
(23, 9),
(24, 6),
(24, 11);

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id_categorie` int(11) NOT NULL,
  `nom` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id_categorie`, `nom`) VALUES
(6, 'chien'),
(7, 'chat'),
(8, 'nourriture'),
(9, 'jouets'),
(10, 'accessoires'),
(11, 'hygiène');

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE `commande` (
  `id_commande` int(11) NOT NULL,
  `statut` varchar(50) DEFAULT NULL,
  `total` decimal(15,2) DEFAULT NULL,
  `date_commande` datetime DEFAULT NULL,
  `moyen_paiement` varchar(50) DEFAULT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id_commande`, `statut`, `total`, `date_commande`, `moyen_paiement`, `id_user`) VALUES
(1, 'Payé', 125.00, '2025-02-26 20:56:44', 'Paypal', 2),
(5, 'Payé', 100.00, '2025-02-26 20:56:44', 'CB', 2);

-- --------------------------------------------------------

--
-- Structure de la table `contenir`
--

CREATE TABLE `contenir` (
  `id_produit` int(11) NOT NULL,
  `id_commande` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `contenir`
--

INSERT INTO `contenir` (`id_produit`, `id_commande`) VALUES
(2, 1),
(2, 5),
(3, 1),
(3, 5);

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE `produit` (
  `id_produit` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prix` decimal(15,2) NOT NULL,
  `illustration` varchar(250) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`id_produit`, `nom`, `prix`, `illustration`, `description`) VALUES
(1, 'Gamelle en or massif', 600.00, 'gammelle_1.webp', 'Une gamelle en or massif, parce que votre chien mérite de manger comme un roi (et de faire des jaloux au parc) ! 🏆🐕 Fini les gamelles banales, place au luxe pour les papilles et les oreilles. 💫🍖 Bonus : il mangera peut-être même avec un peu plus de dignité… ou pas !'),
(2, 'Arbre à chat 100cm', 90.00, 'arbre_chat_2.webp', 'Un arbre à chat si génial que votre félin envisagera d’y élire domicile ! 🌳🐱 Grimper, griffer, faire la sieste en hauteur… il aura enfin un trône digne de sa majesté. 👑😺 Bonus : votre canapé vous dira merci (enfin, s’il pouvait parler) !'),
(3, 'Croquettes chat 10kg', 90.00, 'croquettes_chat_3.webp', 'Des croquettes si délicieuses que votre chat vous regardera enfin avec respect… ou presque ! 🐱🍗 Une recette équilibrée, pleine de saveurs et garantie sans caprices (enfin, on essaie). 😼✨ Parce qu’un chat rassasié, c’est un humain qui garde ses mollets intacts !'),
(12, 'Gros nonos', 60.00, 'os_12.jpg', 'Un os à mâcher si savoureux que votre chien hésitera entre le croquer ou lui écrire une lettre d’amour. 🦴🐶 Poulet, bœuf, ou bacon… un festin longue durée pour des dents heureuses et des chaussures épargnées ! 👞🚫 Bonus : enfin un truc qu’il ne voudra pas enterrer dans le jardin !'),
(21, 'Litière 100% Naturelle ultra absorbante', 25.00, 'litiere_21.jpg', 'Offrez à votre chat le luxe d’un petit coin 5 étoiles : 100 % naturel, ultra-absorbant et garanti sans file d’attente ! 💨🐾 Fini les mauvaises odeurs, votre félin pourra creuser sans réveiller l’apocalypse. 🌿😺 Parce qu’un chat heureux, c’est un humain qui ne pleure pas devant son bac à litière !'),
(22, 'Croquettes chien adulte 25kg', 80.00, 'croquettes_chien_22.webp', 'Des croquettes si savoureuses que votre chien hésitera entre les manger ou les encadrer ! 🍖🐶 Une recette équilibrée, sans chichi, mais avec beaucoup de \'wouf\'. 🦴✨ Parce qu’un chien bien nourri, c’est un canapé qui survit un jour de plus !'),
(23, 'Balle senteur herbe à chat', 12.00, 'balle_chat_23.jpg', 'Une balle si envoûtante que votre chat va croire avoir touché le jackpot de la jungle ! 🍃🐱 Entre roulades, courses-poursuites et coups de pattes ninja, il n’aura plus une minute pour comploter contre vous. 🎾✨ Attention, risque élevé d’hyperactivité féline !'),
(24, 'Shampooing tout doux pour chien', 30.00, 'shampooing_chien_24.webp', '\"Un shampooing si doux que votre chien ressortira du bain en pensant être une star de pub ! 🛁🐶 Fini les mauvaises odeurs et le pelage en mode paillasson, place à la douceur et à la brillance. ✨🌸 Bonus : il sentira meilleur que votre coussin préféré (pour une fois) !');

-- --------------------------------------------------------

--
-- Structure de la table `_user`
--

CREATE TABLE `_user` (
  `id_user` int(11) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `mail` varchar(320) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pwd` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `_user`
--

INSERT INTO `_user` (`id_user`, `isAdmin`, `nom`, `prenom`, `mail`, `pwd`) VALUES
(2, 1, 'lopez', 'Mariana', 'mariana@lopez.fr', '$2b$10$9s8o4YQSqUKOg2BLJ0.A1.pcModbLRXdTjzUdCxLZGN'),
(9, 0, 'Malry', 'Simon', 'simon.malry@gmail.com', '$2b$10$ZsZ72vTIO2b.Kz3AwOeXguJ.vSlK7c2xQ9m1cM0ldU2h4dlSxQwPO'),
(14, 0, 'chien', 'chienchien', 'chien@mail.fr', '$2b$10$btgLBffuHUpErWpWA.Q34uep7NYvHLTzFVpRMavwAGQ0PDVd0HiYi'),
(15, 0, 'chat', 'chatchat', 'chat@email.fr', '$2b$10$Ufo1ot0PZxwgVikuy6e/Je07m/S5NfnV3VlDgiZD8.fv4XtPqrliC'),
(16, 0, 'tom', 'jerry', 'tom@tom.fr', '$2b$10$PT9ocuhew6OLFee4qA8Ax.qvUq08DtXOb7EBl2VgVFKOzldBy90Ri'),
(17, 0, 'truc', 'bidule', 'truc@truc.fr', '$2b$10$f87.XCIcITjD7pNnTEntGuC7NA45S1sFHXqkuKsLr5x5MnKUYtLhm'),
(18, 0, 'test', 'test', 'test@tset.fr', '$2b$10$zJWTmlxakBek2Sikj1orkewvYwsY6XLn6hYwAjJH6ljNQa0RI08xm'),
(19, 0, 'durand', 'benoit', 'benoit@mail.fr', '$2b$10$3X9OBv6X2Ga8ykPSh01rcudJzmZLtDNoE326xmX5AvPlxzUWFDgH.'),
(20, 0, 'truc', 'bidule', 'truc@truce.fr', '$2b$10$eN6WAfikfjos5NbtDcDZxO.StaXICwZiHVFohCP.47V.RbXBYA30i');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `appartenir`
--
ALTER TABLE `appartenir`
  ADD PRIMARY KEY (`id_produit`,`id_categorie`),
  ADD KEY `id_categorie` (`id_categorie`);

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id_categorie`);

--
-- Index pour la table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`id_commande`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `contenir`
--
ALTER TABLE `contenir`
  ADD PRIMARY KEY (`id_produit`,`id_commande`),
  ADD KEY `id_commande` (`id_commande`);

--
-- Index pour la table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`id_produit`);

--
-- Index pour la table `_user`
--
ALTER TABLE `_user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id_categorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `commande`
--
ALTER TABLE `commande`
  MODIFY `id_commande` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `produit`
--
ALTER TABLE `produit`
  MODIFY `id_produit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `_user`
--
ALTER TABLE `_user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `appartenir`
--
ALTER TABLE `appartenir`
  ADD CONSTRAINT `appartenir_ibfk_1` FOREIGN KEY (`id_produit`) REFERENCES `produit` (`id_produit`) ON DELETE CASCADE,
  ADD CONSTRAINT `appartenir_ibfk_2` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id_categorie`) ON DELETE CASCADE;

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `commande_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `_user` (`id_user`);

--
-- Contraintes pour la table `contenir`
--
ALTER TABLE `contenir`
  ADD CONSTRAINT `contenir_ibfk_1` FOREIGN KEY (`id_produit`) REFERENCES `produit` (`id_produit`),
  ADD CONSTRAINT `contenir_ibfk_2` FOREIGN KEY (`id_commande`) REFERENCES `commande` (`id_commande`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
