FROM node:20-alpine

WORKDIR /usr/app

COPY ./package.json .
COPY prisma ./prisma/
COPY . .

RUN npm cache clean --force
RUN npm install --verbose --production --max-sockets=1 --fetch-timeout=600000 --no-audit
RUN npx prisma generate 
RUN npx prisma db push 

RUN npm run build

CMD ["npm", "run", "start"]