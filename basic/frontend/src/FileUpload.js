import React, { useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3001/upload", formData);
      alert("File uploaded successfully!");
    } catch (error) {
      alert("File upload failed!");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300, margin: 'auto' }}>
      <TextField
        type="file"
        onChange={handleFileChange}
        variant="outlined"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Upload
      </Button>
    </Box>
  );
}

export default FileUpload;
