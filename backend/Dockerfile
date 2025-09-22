
# --- Etapa 1: "Build" ---
FROM node:18-alpine

# 2. Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar los archivos de dependencias y luego instalarlas
# Esto aprovecha el caché de Docker para no reinstalar todo en cada cambio de código
COPY package*.json ./
RUN npm install

# 4. Copiar el resto del código de la aplicación
COPY . .

# 5. Exponer el puerto en el que corre nuestro servidor Express
EXPOSE 5000

# 6. El comando para iniciar la aplicación cuando el contenedor se ejecute
CMD ["node", "server.js"]