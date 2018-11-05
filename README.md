FULLSTACK PROJECT BOILERPLATE

Project Features:
1. GraphQL with Apollo Client & Server
2. Sequelize ORM with MySql on Node.js
3. User Authentication and Authorization
4. File Upload with Authorization to S3 Bucket

REACT <=> REACT APOLLO <=> APOLLO CLIENT <=> EXPRESS <=> GRAPHQL <=> APOLLO_SERVER <=> SEQUELIZE <=> MYSQL

How to start project?

1. Server: 
        Site: localhost:9000
        Command: npm start
    
2. Client:
        Site: localhost:3000
        Command: npm start
    
3. GraphQL:
        localhost:9000/graphql


Useful example commands for sequelize-cli

node_modules/.bin/sequelize init

node_modules/.bin/sequelize db:migrate

node_modules/.bin/sequelize model:generate --name company --attributes name:string,description:text

node_modules/.bin/sequelize db:seed:all

node_modules/.bin/sequelize seed:generate --name user