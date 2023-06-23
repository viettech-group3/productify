const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const UserRouter = require('./routes/User');
const EventRouter = require('./routes/Event');
const StudyRouter = require('./routes/StudyWithMe');

// set up express server
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// set up routes
app.use('/api/users', UserRouter);
app.use('/api/events', EventRouter);
app.use('/api/studywithme', StudyRouter);

//connect to port
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB: ', error);
    process.exit(1);
  }
};

startServer();
