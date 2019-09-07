# NodeJS_Blog_RestAPI
CRUD API using NodeJS, Experss, MongoDB

## About

This Repo is for beginners of NodeJS who wants to make a full API service. This repo will be showing the cleaner way of coding. Folder Structure to follow etc.

### Prerequisites

Following are the softwares requried to get this api up and running.
* [Node.js](https://nodejs.org) - Chrome's V8 Javascript Engine
* [MongoDB](https://mongodb.org) - NoSQL Database

This project uses MongoDB Atlas as database .Connecting to it is pretty simple , make sure you have .env file along with a proper net connection .

In this project joi is used for validation and for encrypting the password bcryptjs is used along with validator to check the id coming from incoming request.

### Installing

- Getting the configuration ready <br>
  Copy the .env.example file at the same location and save as .env
  ```
  cp .env.example .env
  ```
- Create account on MongoDB Atlas and paste the       database URL in .env file

- Create account on Sentry and paste the Sentry DNS   into .env file (Only for production to get emails   about errors)

- Install the packages mentioned in package.json file for getting all dependencies of the project.
  ```
  npm install --save
  ```
- Starting the application
  <br/>
  
  ```
  npm start
  ```
### Testing

Import the file Blog.postman_collection_v2.json into postman for testing API endpoints.

  
## Developers

* **Swapnil Shinde** - [Swap76](https://github.com/Swap76)
