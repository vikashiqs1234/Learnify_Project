import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signUp } from './Api';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    phone: Yup.string()
      .required('Phone is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    studentYear: Yup.string().required('Student Year is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      studentYear: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const res = await signUp(values);
      if (res && res.token) {
        Cookies.set('token', res.token);
        navigate('/share/notes');
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 100px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
        fontFamily: "'Poppins', sans-serif",
        p: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          maxWidth: 400,
          width: '100%',
          p: 4,
          borderRadius: 2,
          background: 'linear-gradient(90deg, #0f2027, #203a43, #2c5364)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          color: '#fff',
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ fontWeight: 'bold', fontFamily: "'Poppins', sans-serif" }}
        >
          Sign Up
        </Typography>

        {['name', 'phone', 'studentYear', 'password'].map((field) => (
          <TextField
            key={field}
            label={field === 'studentYear' ? 'Student Year' : field.charAt(0).toUpperCase() + field.slice(1)}
            name={field}
            type={field === 'password' ? 'password' : 'text'}
            value={formik.values[field]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched[field] && Boolean(formik.errors[field])}
            helperText={formik.touched[field] && formik.errors[field]}
            fullWidth
            required
            InputLabelProps={{ style: { color: '#ccc' } }}
            InputProps={{ style: { color: '#fff' } }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#fff',
                },
                '&:hover fieldset': {
                  borderColor: '#ffd700',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ffd700',
                },
              },
            }}
          />
        ))}

        <Button
          type="submit"
          variant="contained"
          disabled={formik.isSubmitting}
          sx={{
            backgroundColor: '#ffd700',
            color: '#000',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#e6c200',
            },
          }}
        >
          {formik.isSubmitting ? 'Submitting...' : 'Sign Up'}
        </Button>

        <Typography
          component={Link}
          to="/login"
          sx={{
            textAlign: 'center',
            textDecoration: 'none',
            color: '#fff',
            '&:hover': {
              color: '#ffd700',
            },
          }}
        >
          Already have an account? Login
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpForm;
