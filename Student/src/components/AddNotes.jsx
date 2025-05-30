import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2';
import { addNotes } from './Api'; // Your API function

const categories = ['Books', 'Notes', 'Previous Year', 'Other'];

const AddNotes = () => {
  const [formData, setFormData] = useState({
    subjectCode: '',
    subjectName: '',
    year: '',
    category: '',
    file: '', // store file URL as string
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleFileChange = async (e) => {
    try {
      const selectedFile = e.target.files[0];
      if (!selectedFile) throw new Error('No file selected.');

      const uploadData = new FormData();
      uploadData.append('file', selectedFile);
      uploadData.append('upload_preset', 'l3shyrzx');

      setLoading(true);
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/vikashcloud/raw/upload',
        uploadData
      );
      setLoading(false);
      setUploadedFileName(selectedFile.name);
      setFormData((prev) => ({
        ...prev,
        file: res.data.secure_url,
      }));
    } catch (error) {
      setLoading(false);
      console.error('Upload error:', error);
      Swal.fire('Upload Failed', 'Could not upload file.', 'error');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) newErrors[key] = 'This field is required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const res = await addNotes(formData);
      setLoading(false);
      if (res) {
        Swal.fire('Success', 'Notes uploaded!', 'success');
        setFormData({
          subjectCode: '',
          subjectName: '',
          year: '',
          category: '',
          file: '',
        });
        setUploadedFileName('');
        setErrors({});
      }
    } catch (err) {
      setLoading(false);
      console.error('Submission error:', err);
      Swal.fire('Error', 'Failed to submit notes.', 'error');
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 5,
        p: 4,
        borderRadius: 3,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 8px 24px rgba(103, 58, 183, 0.3)',
        color: 'white',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <Typography variant="h4" fontWeight={700} align="center" mb={3}>
        Add Notes
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          name="subjectCode"
          label="Subject Code"
          value={formData.subjectCode}
          onChange={handleChange}
          error={!!errors.subjectCode}
          helperText={errors.subjectCode}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: 'white' } }}
          sx={{
            '& .MuiInputBase-root': {
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: 1,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: errors.subjectCode
                ? '#ff6b6b'
                : 'rgba(255,255,255,0.4)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
          }}
        />

        <TextField
          name="subjectName"
          label="Subject Name"
          value={formData.subjectName}
          onChange={handleChange}
          error={!!errors.subjectName}
          helperText={errors.subjectName}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: 'white' } }}
          sx={{
            '& .MuiInputBase-root': {
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: 1,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: errors.subjectName
                ? '#ff6b6b'
                : 'rgba(255,255,255,0.4)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
          }}
        />

        <TextField
          name="year"
          label="Year"
          value={formData.year}
          onChange={handleChange}
          error={!!errors.year}
          helperText={errors.year}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: 'white' } }}
          sx={{
            '& .MuiInputBase-root': {
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: 1,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: errors.year
                ? '#ff6b6b'
                : 'rgba(255,255,255,0.4)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
          }}
        />

        <TextField
          select
          name="category"
          label="Category"
          value={formData.category}
          onChange={handleChange}
          error={!!errors.category}
          helperText={errors.category}
          fullWidth
          margin="normal"
          InputLabelProps={{ style: { color: 'white' } }}
          sx={{
            '& .MuiInputBase-root': {
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: 1,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: errors.category
                ? '#ff6b6b'
                : 'rgba(255,255,255,0.4)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '& .MuiSvgIcon-root': {
              color: 'white',
            },
          }}
        >
          {categories.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <label
          htmlFor="file-upload"
          style={{
            display: 'block',
            width: '100%',
            padding: '14px',
            borderRadius: 8,
            border: errors.file
              ? '2px solid #ff6b6b'
              : '2px dashed rgba(255,255,255,0.6)',
            color: 'white',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: 'rgba(255,255,255,0.1)',
            fontWeight: 600,
            marginTop: 16,
            marginBottom: 8,
          }}
        >
          {uploadedFileName
            ? `Uploaded: ${uploadedFileName}`
            : 'Click or Drag & Drop your file here'}
          <input
            type="file"
            id="file-upload"
            hidden
            onChange={handleFileChange}
          />
        </label>
        {errors.file && (
          <Typography
            variant="caption"
            sx={{ color: '#ff6b6b', mt: 0.5, display: 'block', textAlign: 'center' }}
          >
            {errors.file}
          </Typography>
        )}

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 700,
              background:
                'linear-gradient(45deg, #6a11cb 30%, #2575fc 90%)',
              color: 'white',
              '&:hover': {
                background:
                  'linear-gradient(45deg, #2575fc 30%, #6a11cb 90%)',
              },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Submit'}
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default AddNotes;
