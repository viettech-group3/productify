const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const UserRouter = require("./routes/User.JS");
const seedData = require("./config/seed");
const faker = require("faker");

// set up express server
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/users", UserRouter);

//connect to port
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Seed data
    // await seedData();

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB or seeding data:", error);
    process.exit(1);
  }
};

startServer();
