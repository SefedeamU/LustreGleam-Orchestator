# Usa una imagen oficial de Node.js como base
FROM node:20

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación NestJS
RUN npm run build

# Expone el puerto 8003
EXPOSE 8003

# Establece la variable de entorno para el puerto
ENV PORT=8003

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]