FROM node:20

# Crée un répertoire de travail
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tout le reste (dont .env s'il est nécessaire en local)
COPY . .

# Expose le port (à adapter selon .env)
EXPOSE 3000

# Démarre l'application
CMD ["node", "server.js"]
