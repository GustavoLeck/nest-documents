FROM node:20-alpine

WORKDIR /usr/app

COPY ./package.json .
COPY prisma ./prisma/
COPY . .

RUN npm cache clean --force
RUN npm install --verbose --no-audit --no-fund --max-sockets=1 --fetch-timeout=300000
RUN npx prisma generate 

RUN npm run build

CMD npx prisma db push && npm run start