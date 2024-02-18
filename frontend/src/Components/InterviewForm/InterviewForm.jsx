import React, { useState } from 'react';
import './InterviewForm.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InterviewForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    professionName: '',
    type: '',
    score: '',
    opinion: '',
    interviewDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if(name === "score") {
      const score = Math.max(0, Math.min(5, Number(value))); 
      setFormData(prevState => ({
        ...prevState,
        [name]: score
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleDateChange = (date) => {
    setFormData(prevState => ({
      ...prevState,
      interviewDate: date
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Call the onSubmit prop passed down from the parent component
  };


  return (
    <form onSubmit={handleSubmit} className="interview-form">
      <label htmlFor="companyName">Company Name:</label>
      <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required />

      <label htmlFor="professionName">Profession:</label>
      <input type="text" id="professionName" name="professionName" value={formData.professionName} onChange={handleChange} required />

      <label htmlFor="type">Interview Type:</label>
      <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} required />

      <label htmlFor="score">Score:</label>
      <input type="number" id="score" name="score" value={formData.score} onChange={handleChange} min="0" max="5" required />

      <label htmlFor="opinion">Opinion:</label>
      <textarea id="opinion" name="opinion" value={formData.opinion} onChange={handleChange} required />

      <label htmlFor="interviewDate">Interview Date:</label>
      <DatePicker 
        selected={formData.interviewDate} 
        onChange={handleDateChange} 
        className="date-picker"
        dateFormat="MMMM d, yyyy" 
        placeholderText='Click to select a date'
      />

      <button type="submit">Add Interview</button>
    </form>
  );
};

export default InterviewForm;
