import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import './upload.css'; 
const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(`File uploaded successfully! File ID: ${response.data.file_id}`);
    } catch (error) {
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred while uploading the file.');
      }
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload pictures of events in gallery</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="file">Select File:</Label>
          <Input type="file" id="file" onChange={handleFileChange} />
        </FormGroup>
        <Button type="submit" color="primary">Upload</Button>
      </Form>
      {message && <Alert className="alert alert-success">{message}</Alert>}
      {error && <Alert className="alert alert-danger">{error}</Alert>}
    </div>
  );
};

export default FileUpload;
