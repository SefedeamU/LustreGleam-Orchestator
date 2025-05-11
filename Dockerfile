FROM node:20

WORKDIR /app

# Copia solo los archivos de dependencias primero
COPY package*.json ./

# Instala dependencias (esto se cachea si package*.json no cambia)
RUN npm install

# Ahora copia el resto del código de la aplicación
COPY . .

# Construye la aplicación NestJS
RUN npm run build

EXPOSE 8003
ENV PORT=8003

CMD ["npm", "run", "start:prod"]