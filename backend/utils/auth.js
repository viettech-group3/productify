const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');

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
const sendPasswordResetEmail = (email, token) => {
  const transporter = nodemailer.createTransport({
    // Configure your email service provider here
    service: 'Outlook',
    auth: {
      user: 'huudangphamt1k11@outlook.com',
      pass: '@Phamhuudangt1k11',
    },
  });

  const mailOptions = {
    from: 'huudangphamt1k11@outlook.com',
    to: email,
    subject: 'Password Reset',
    text: `This is the link to change your password: http://localhost:3000/forgotpassword?email=${email}&token=${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(`Error sending email1: ${mailOptions.from}`);
      console.log(`Error sending email: ${error}`);
    } else {
      console.log(`Email sent: ${info.response}`);
      console.log(`Email sent:${email}`);
    }
  });
};

module.exports = { generateToken, protect, parseJwt, sendPasswordResetEmail };
