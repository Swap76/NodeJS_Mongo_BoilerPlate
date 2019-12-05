# NodeJS Mongo BoilerPlate
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

## Getting started with the project with Docker

* Fork the repository on GitHub.

* Navigate to the folder of the repository.

* To run this project, you should have Docker installed on your system.
If you don't have Docker, you can visit [The official site of Docker](https://docs.docker.com/docker-for-mac/install/)
to install them on your system.

* Building the Docker Image for Docker Hub
	```
	docker build -t your_dockerhub_username/your-project-name .
	```
	The . specifies that the build context is the current directory.

* It will take a minute or two to build the image. Once it is complete, check your images:
	```
	docker images
	```
	You will see the image listed in the list.

* Run the following command to build the container:
	```
	docker run -p 5000:5000 <your_dockerhub_username>/testcase-generator
	```
	All requests of port 5000 will be forwarded to port 5000 of container

* Once your container is up and running, you can inspect a list of your running containers with following command:
	```
	docker ps
	```
	You will see the image listed in the list.

* With your container running, you can now visit your application by navigating your browser to ` http://your_server_ip`. You will see your application landing page once again:

* For stoping the container you can use following command:
	```
	docker stop <Container_Id>
	```

## Developers

* **Swapnil Shinde** - [Swap76](https://github.com/Swap76)
