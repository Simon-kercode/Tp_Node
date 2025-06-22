# Image Node officielle
FROM node:20

# Dossier de travail
WORKDIR /app

# Copie des dépendances
COPY package*.json ./

# Installation des dépendances et droits d'exécution pour jest
RUN npm install && \
    chmod -R 755 node_modules && \
    chmod +x node_modules/.bin/jest

# Copie du code source
COPY . .

# Variables d'environnement lues automatiquement si passées via docker-compose
EXPOSE 3000

# Lancement de l'app
CMD ["node", "index.js"]
