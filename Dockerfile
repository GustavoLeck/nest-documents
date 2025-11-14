FROM node:20-alpine

WORKDIR /usr/app

COPY ./package.json .
COPY prisma ./prisma/
COPY . .

RUN npm cache clean --force
RUN npm install --verbose --omit=dev --no-audit --no-fund --max-sockets=1 --fetch-timeout=300000
RUN npx prisma generate 
RUN npx prisma db push 

RUN npm run build

CMD ["npm", "run", "start"]