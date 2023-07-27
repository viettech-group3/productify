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
const sendPasswordResetEmail = (email, text, subject) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: 'huudangphamt1k11@gmail.com',
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'huudangphamt1k11@gmail.com',
    to: email,
    subject: subject,
    text: text,
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
