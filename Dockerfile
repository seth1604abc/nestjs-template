FROM node:18.19-alpine3.18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN ls -l
RUN ls -l dist

EXPOSE 3000

CMD ["node", "dist/main.js"]