FROM node:8.6-alpine
LABEL version="0.1"
 
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
 
COPY package.json ./
RUN npm install

 
COPY . .
 
EXPOSE 3000
CMD ["npm", "start"]