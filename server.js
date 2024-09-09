const express = require('express');
const multer = require('multer');
const path = require('path');

// Initialize express app
const app = express();

// Set up storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Name the file uniquely
  },
});

// Initialize Multer with the storage config
const upload = multer({ storage: storage });

// Middleware to serve static files
app.use(express.static('public'));

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    res.send({
      status: 'success',
      message: 'File uploaded successfully!',
      file: req.file, // Returns file info like file name, path, etc.
    });
  } catch (error) {
    res.sendStatus(400);
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
