#  build du frontend
FROM node:20 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# utilise nginx pour servir le build
FROM nginx:alpine

# Copie les fichiers buildés
COPY --from=build /app/dist /usr/share/nginx/html

# Copie un fichier nginx.conf personnalisé si besoin
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
