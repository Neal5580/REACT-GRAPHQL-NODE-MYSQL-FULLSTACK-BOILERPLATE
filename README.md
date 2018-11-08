# FULLSTACK PROJECT BOILERPLATE #

## Project Features ##
* GraphQL with Apollo Client & Server
* Sequelize ORM with MySql on Node.js
* User Authentication and Authorization
* File Upload with Authorization to S3 Bucket
* Docker container

## Technology Stacks ##
* REACT 
* REACT APOLLO 
* APOLLO CLIENT 
* EXPRESS 
* GRAPHQL 
* APOLLO_SERVER 
* SEQUELIZE 
* MYSQL  

## How do I start? ##

* Server:  
    * Site: localhost:9000
    * Command: npm start
    
* Client:
    * Site: localhost:3000
    * Command: npm start
    
* GraphQL:
    * localhost:9000/graphql

* Start Both: 
    * docker-compose up --build

## Useful example commands for sequelize-cli ##

* node_modules/.bin/sequelize init

* node_modules/.bin/sequelize db:migrate

* node_modules/.bin/sequelize model:generate --name company --attributes name:string,description:text

* node_modules/.bin/sequelize db:seed:all

* node_modules/.bin/sequelize seed:generate --name user