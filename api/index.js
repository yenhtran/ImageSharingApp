const express = require('express');
const app = express();

const mongoose = require('mongoose');

const dotenv = require('dotenv'); // load environment variables
const helmet = require('helmet'); // security- helps set HTTP headers
const morgan = require('morgan'); // logs incoming HTTP requests
const multer = require('multer'); // handling multipart/form-data
const path = require('path'); // provides various utility functions for working with file and directory paths in a platform-independent way
const cors = require('cors');

dotenv.config();

const port = 8080;
app.use(cors());

// Import Auth Route
const authRoute = require('./routes/auth');

// Import Post Route
const postRoute = require('./routes/posts');

// Import User Route
const userRoute = require('./routes/users');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

// Multer
const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: imgStorage });

// Upload image to server and save to MongoDB database
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('File uploaded!!!');
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
