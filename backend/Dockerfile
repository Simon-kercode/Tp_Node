# Image Node officielle
FROM node:20

# Dossier de travail
WORKDIR /app

# Copie des dépendances
COPY package*.json ./
RUN npm install

# Copie du code source
COPY . .

# Variables d'environnement lues automatiquement si passées via docker-compose
EXPOSE 3000

# Lancement de l'app
CMD ["node", "index.js"]
