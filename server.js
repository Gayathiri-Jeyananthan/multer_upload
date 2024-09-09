const express = require('express');
const multer = require('multer');
const cors = require('cors'); // Import CORS

// Initialize express app
const app = express();

// Use CORS middleware
app.use(cors()); // Enable CORS for all routes

// Set up storage for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    res.send({
      status: 'success',
      message: 'File uploaded successfully!',
      file: req.file,
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
