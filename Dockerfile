FROM node:22

WORKDIR /app

# Copia solo lo necesario para instalar y generar prisma
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
RUN npx prisma generate

# Copia el resto del código
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
