const jwt = require('jsonwebtoken')
const __ = require('../../util/response')
const mongoose = require('mongoose')
const userModel = require('../../models/Users')
const { encryptorToken } = require('./encryptor')
const { decryptorToken } = require('./decryptor')

class Jwt {
  async createToken (userId) {
    userId = userId.toString()
    return jwt.sign({ userId: encryptorToken(userId) }, process.env.SECRET_KEY, { expiresIn: '7d' })
  };

  async authentication (req, res, next) {
    try {
      const decoded = await jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
      if (decoded) {
        const verifyUser = await userModel.__getUserById(mongoose.Types.ObjectId(decryptorToken(decoded.userId)))
        if (!verifyUser) return res.status(401).json({ message: 'Illegal access' })
        req.userId = verifyUser.userId
        next()
      };
    } catch (error) {
      return __.errorMsg(req, res, 401, error.message, error, 'authentication')
    }
  }
};

module.exports = new Jwt()
