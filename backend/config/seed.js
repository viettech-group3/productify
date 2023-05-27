const mongoose = require("mongoose");
const faker = require("faker");
const User = require("../models/User");
const connectDB = require("./db");

// Connect to MongoDB
connectDB();

// Generate and seed fake data
const seedData = async () => {
  try {
    // Remove existing data
    await User.deleteMany();

    // Generate fake users with animal usernames and randomized points
    const fakeUsers = Array.from({ length: 50 }).map(() => {
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const password = faker.internet.password();
      const points = faker.datatype.number();

      return {
        username,
        email,
        password,
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

// Run the seedData function
seedData();
