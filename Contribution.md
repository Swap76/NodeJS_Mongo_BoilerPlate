## Patching Code

### Steps to be followed:

1. Fork the repository.

2. Perform the changes.

3. Run eslint on the project by the following command:
	```
	npm run lint
	```

4. Fix the linting issues by running the following command:
	```
	npx run fix
	```

5. Push the code to your forked repository on GitHub.
Note: The commit and push may fail due to any linting errors. So make sure to fix all of them before commiting and pushing the code. Most of the linting errors can be resolved by running `npm run fix` commmand but for some errors, you have to manually fix them.

6. Generate a pull request on NodeJS_Mongo_BoilerPlate repository (our repository). Use our [Pull Request Template](https://github.com/Swap76/NodeJS_Mongo_BoilerPlate/blob/master/.github/Pull_Request_Template.md) for making a new pull request.

7. Once the code changes are thoroughly tested, they will be merged into the master of our repository.

### Code changes are welcome and should follow the guidelines given below.

* Always make sure that your code follows this project's [eslint configuration](https://github.com/Swap76/NodeJS_Mongo_BoilerPlate/blob/master/.eslintrc.json).
