# flaguesser-ticket
ticket service para flaguesser realizado en node.js+express.js

Intallar node.js + express.js
  
  ```
  sudo apt install npm
  npm install
  sudo apt install nodejs-legacy
  npm install express.js --save
  npm install --save pg dotenv
  npm install --save sequelize
  ```

Para inciar servidor de forma simple:
  ```
  node app.js
  ```

Para construir e iniciar el container de forma simple:
 ```
  docker build . -t flaguesser-ticket
  docker run -e VERSION=1.1 -p 9000:3000 flaguesser-ticket
  ```

Para conectarse a BD manualmente:
```
sudo -i -u postgres
psql
```
Construir base de datos:
```
CREATE DATABASE ticket;
postgres with encrypted password 'password';
\l #<Para ver si se agrego>
```

Conexión manual y comandos de utilidad:
```
\c tickets
\dt #<ver tablas>
select * from ticket #<ver filas>
DROP DATABASE ticket;
```
