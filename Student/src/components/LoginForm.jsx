import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { login } from './Api';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

const LoginForm = ({ setToken }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setToken(true);
    }
  }, [isLoggedIn, setToken]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const res = await login(values);
    if (res && res.token) {
      Cookies.set('token', res.token);
      navigate('/share/notes');
      setToken(true);
      setIsLoggedIn(true);
      Swal.fire({
        icon: 'success',
        title: res.message,
      });
    }
    setSubmitting(false);
  };

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
      <Formik
        initialValues={{ phone: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box
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
                Login
              </Typography>

              {/* Phone Field */}
              <Field name="phone">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ style: { color: '#ccc' } }}
                    InputProps={{ style: { color: '#fff' } }}
                    error={Boolean(form.errors.phone && form.touched.phone)}
                    helperText={<ErrorMessage name="phone" />}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#fff' },
                        '&:hover fieldset': { borderColor: '#ffd700' },
                        '&.Mui-focused fieldset': { borderColor: '#ffd700' },
                      },
                    }}
                  />
                )}
              </Field>

              {/* Password Field */}
              <Field name="password">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ style: { color: '#ccc' } }}
                    InputProps={{ style: { color: '#fff' } }}
                    error={Boolean(form.errors.password && form.touched.password)}
                    helperText={<ErrorMessage name="password" />}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#fff' },
                        '&:hover fieldset': { borderColor: '#ffd700' },
                        '&.Mui-focused fieldset': { borderColor: '#ffd700' },
                      },
                    }}
                  />
                )}
              </Field>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  backgroundColor: '#ffd700',
                  color: '#000',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#e6c200',
                  },
                }}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>

              {/* Link to Signup */}
              <Typography
                component={Link}
                to="/signup"
                sx={{
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: '#fff',
                  '&:hover': {
                    color: '#ffd700',
                  },
                }}
              >
                Don't have an account? Sign up
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
