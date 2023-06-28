const jwt = require('jsonwebtoken');
const User = require('../models/User');

// generateToken function create

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// protect function create
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //token la 1 cai ma
      token = req.headers.authorization.split(' ')[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401).json('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401).json('Not authorized, no token');
  }
};
const parseJwt = token => {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
};

module.exports = { generateToken, protect, parseJwt };
