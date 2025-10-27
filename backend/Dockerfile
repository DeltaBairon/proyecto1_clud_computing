# Usamos Node oficial
FROM node:18-alpine

# Crear directorio
WORKDIR /app

# Copiar backend y frontend
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm ci --silent

# Copiar todo
WORKDIR /app
COPY . .

WORKDIR /app/backend
RUN npm run build || true

ENV PORT=3000
EXPOSE 3000

CMD ["node", "backend/index.js"]
