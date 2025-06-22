# Image Node officielle
FROM node:20

# Dossier de travail
WORKDIR /app

# Copie des dépendances
COPY package*.json ./
RUN npm install \
 && chmod +x ./node_modules/.bin/jest \
 && chmod -R 755 node_modules

RUN chmod -R +x node_modules/.bin

# Copie du code source
COPY . .

# Variables d'environnement lues automatiquement si passées via docker-compose
EXPOSE 3000

# Lancement de l'app
CMD ["node", "index.js"]
