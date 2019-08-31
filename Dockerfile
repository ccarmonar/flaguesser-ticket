FROM node:8.6-alpine
LABEL version="0.1"
 
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
 
COPY package.json ./
RUN npm install
RUN apt install nodejs-legacy
RUN apt install express.js --save
RUN apt install --save pg dotenv
RUN apt install --save sequelize

 
COPY . .
 
EXPOSE 3000
CMD ["npm", "start"]