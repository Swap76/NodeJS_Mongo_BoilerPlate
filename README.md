# NodeJS_Blog_RestAPI
CRUD API using NodeJS, Experss, MongoDB

## About

This Repo is for beginners of NodeJS who wants to make a full API service. This repo has a good folder structure. Joi for validation of incoming data. Passport for encrypting passwords.  

### Prerequisites

Following are the softwares requried to get this api up and running.
* [Node.js](https://nodejs.org) - Chrome's V8 Javascript Engine
* [MongoDB](https://mongodb.org) - NoSQL Database

### Installing

- Getting the configuration ready <br>
  Copy the .env.example file at the same location and save as .env
  ```
  cp .env.example .env
  ```
- Create account on MongoDB Atlas and paste the       database URL in .env file

- Create account on Sentry and paste the Sentry DNS   into .env file (Only for production to get emails about errors)

- Install the packages mentioned in package.json file for getting all dependencies of the project.
  ```
  npm install --save
  ```
- Starting the application
  <br/>
  
  ```
  npm start
  ```
  
## Developers

* **Swapnil Shinde** - [Swap76](https://github.com/Swap76)
