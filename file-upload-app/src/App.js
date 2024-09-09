import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null); // State to store the selected file
  const [message, setMessage] = useState(''); // State to store success/error message

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file to state
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create form data object
    formData.append('file', file); // Append the file to form data

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Content-Type for file upload
        },
      });
      setMessage('File uploaded successfully!'); // Show success message
      console.log(res.data);
    } catch (err) {
      setMessage('Failed to upload file!'); // Show error message
      console.error(err);
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUpload;
