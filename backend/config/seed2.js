const mongoose = require("mongoose");
const User = require("../models/user");
const connectDB = require("./db");

// Connect to MongoDB
connectDB();

// Generate and seed fake data
const seedData = async () => {
  try {
    // Remove existing data
    await User.deleteMany();

    // Define animal usernames
    const animalUsernames = [
      "tiger",
      "lion",
      "elephant",
      "giraffe",
      "zebra",
      "monkey",
      "panda",
      "koala",
      "dolphin",
      "wolf",
      "bear",
      "deer",
      "kangaroo",
      "rhino",
      "hippo",
      "fox",
      "cheetah",
      "panther",
      "camel",
      "snake",
    ];

    // Generate fake users with animal usernames and randomized points
    const fakeUsers = animalUsernames.map((username, index) => {
      const points = Math.floor(Math.random() * 39) + 7; // Generates random number between 7 and 45
      return {
        username,
        email: `${username}@gmail.com`,
        password: username,
        points,
      };
    });

    // Insert fake users into the database
    await User.insertMany(fakeUsers);

    console.log("Data seeding completed.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

module.exports = seed2Data;
