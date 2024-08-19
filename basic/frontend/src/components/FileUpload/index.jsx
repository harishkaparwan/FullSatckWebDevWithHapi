import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography } from '@mui/material';
import axios from "axios";

function FileUploadForm() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Title:', title);
    console.log('Category:', category);
    console.log('Files:', files);
    e.preventDefault();
    const formData = new FormData();
    if(files.length ==1) {
    formData.append("file", files);
    }else if(files.length > 1){
      files.map((file) => {
        formData.append("file", file);
      })
    }

    try {
      const response = await axios.post("http://localhost:3000/upload", formData);
      alert("File uploaded successfully!");
    } catch (error) {
      alert("File upload failed!");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 3,
      }}
    >
      <Typography variant="h6" gutterBottom>
        File Upload Form
      </Typography>

      <TextField
        label="Title"
        fullWidth
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2, maxWidth: '400px' }}
      />

      <FormControl fullWidth variant="outlined" sx={{ mb: 2, maxWidth: '400px' }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
        >
          <MenuItem value="category1">Category 1</MenuItem>
          <MenuItem value="category2">Category 2</MenuItem>
          <MenuItem value="category3">Category 3</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        component="label"
        sx={{ mb: 2 }}
      >
        Upload Files
        <input
          type="file"
          multiple
          hidden
          onChange={handleFileChange}
        />
      </Button>

      {files.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">Files selected:</Typography>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </Box>
      )}

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
}

export default FileUploadForm;