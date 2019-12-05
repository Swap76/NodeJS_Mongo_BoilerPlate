/**
 * Main page of API
 * @route /
 * @method GET
 */

module.exports.index = async (req, res) => {
  res.status('200').send('Welcome to NodeJS Mongo BoilerPlate API');
};