# flaguesser-ticket
ticket service para flaguesser realizado en node.js+express.js

Intallar node.js + express.js
  
  ```
  sudo apt install npm
  npm install
  sudo apt install nodejs-legacy
  npm install express.js --save
  ```

Para inciar servidor de forma simple:
  ```
  node app.js
  ```

Para construir e iniciar el container de forma simple:
 ```
  docker build . -t flaguesser-ticket
  docker run -e 9000:3000 flaguesser-ticket
  ```

