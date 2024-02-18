
// src/components/AddInterview.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import InterviewForm from '../Components/InterviewForm/InterviewForm';


const AddInterview = () => {
    const navigate = useNavigate();

    const handleFormSubmit = async (formData) => {
      // Here you would typically send the formData to your backend API
      console.log('Form Data:', formData);
      // Assume the API call is successful and navigate to the homepage or a confirmation page
      navigate('/');
    };
  
    return (
      <div>
        <h1>Add New Interview</h1>
        <InterviewForm onSubmit={handleFormSubmit} />
      </div>
    );
};

export default AddInterview;
