# frontend/Dockerfile

# --- Etapa 1: "Build" ---
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

# La línea de depuración que estaba aquí ya fue eliminada.

COPY . .
RUN npm run build


# --- Etapa 2: "Production" ---
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Añade esta línea para copiar tu configuración personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]