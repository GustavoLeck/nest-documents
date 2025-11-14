FROM node:20-alpine

WORKDIR /usr/app

COPY ./package.json .
COPY prisma ./prisma/
COPY . .

RUN yarn install
RUN npx prisma generate 
RUN npx prisma db push 

RUN npm run build

CMD ["npm", "run", "start"]