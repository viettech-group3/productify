const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const UserRouter = require("./routes/User.JS");

// set up express server
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/users", UserRouter);

//connect to port
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server started on port ${PORT}`);
});
