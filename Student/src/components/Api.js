import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'; // Import SweetAlert2

const API_BASE_URL = 'http://localhost:5000'; // Update with your backend URL
// const API_BASE_URL = 'https://student-study-backend.onrender.com'; // Update with your backend URL

// Function to display error using SweetAlert2
const showErrorAlert = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message || 'Something went wrong!',
  });
};

// Get all problems
export const getAllProblems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getallproblem`);
    return response.data;
  } catch (error) {
    showErrorAlert(error.response?.data?.error || 'Error fetching problems');
    throw error; // Re-throw the error after showing alert
  }
};

// Add a new problem
export const addProblem = async (problemData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addproblem`, problemData);
    return response.data;
  } catch (error) {
    showErrorAlert(error.response?.data?.error || 'Error adding problem');
    throw error;
  }
};

// Sign up a user
export const signUp = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, data);
    return response.data;
  } catch (error) {
    showErrorAlert(error.response?.data?.error || 'Error signing up');
    throw error;
  }
};

// Login a user
export const login = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    return response.data;
  } catch (error) {
    showErrorAlert(error.response?.data?.error || 'Error logging in');
    throw error;
  }
};

// Add an answer to a problem
export const addAnswer = async (answerData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addanswer`, answerData);
    return response.data;
  } catch (error) {
    showErrorAlert(error.response?.data?.error || 'Error adding answer');
    throw error;
  }
};

// Add notes
export const addNotes = async (data) => {
    try {
      const token = Cookies.get('token'); // Retrieve the token from cookies
  
      const response = await axios.post(`${API_BASE_URL}/addnotes`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
      });
  
      return response.data;
    } catch (error) {
      showErrorAlert(error.response?.data?.error || 'Error adding notes');
      throw error;
    }
  };

// Get all notes
export const getAllNotes = async (category) => {
  try {

    const response = await axios.get(`${API_BASE_URL}/getnotes?category=${category}`);

    return response.data;
  } catch (error) {
    showErrorAlert(error.response?.data?.error || 'Error fetching notes');
    throw error;
  }
};
