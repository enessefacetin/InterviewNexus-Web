import React, { useState } from 'react';
import './InterviewForm.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import API from '../../Api/axios';

const InterviewForm = ({ onSubmit, companies, professions }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyId: '', // Expecting an ID
    professionId: '', // Expecting an ID
    type: '',
    score: '',
    opinion: '',
    interviewDate: new Date(),
    questions: [{ content: '', answer: '' }], // Start with one empty question
  });

  const typeOptions = [
    { value: 'HR', label: 'İnsan Kaynakları' },
    { value: 'TECHNICAL', label: 'Teknik' }
  ];
  
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTypeChange = (selectedOption) => {
    console.log(selectedOption)
    setFormData(prevState => ({
      ...prevState,
      type: selectedOption.value
    }));
  };

  const handleCompanyChange = (selectedOption) => {
    console.log(selectedOption)
    setFormData(prevState => ({
      ...prevState,
      companyId: selectedOption.value
    }));
  };

  const handleProfessionChange = (selectedOption) => {
    console.log(selectedOption)
    setFormData(prevState => ({
      ...prevState,
      professionId: selectedOption.value
    }));
  };

  const handleDateChange = (date) => {
    console.log(date)
    setFormData(prevState => ({
      ...prevState,
      interviewDate: date.toISOString().split('T')[0]
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    console.log(index)
    console.log(field)
    console.log(value)
    const updatedQuestions = formData.questions.map((question, qIndex) => {
      if (index === qIndex) {
        return { ...question, [field]: value };
      }
      return question;
    });
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { content: '', answer: '' }],
    });
  };

  const handleRemoveQuestion = (index) => {
    const filteredQuestions = formData.questions.filter((_, qIndex) => index !== qIndex);
    setFormData({ ...formData, questions: filteredQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form Data:', formData);
      const response = await API.post('/v1/interview', formData);
      console.log('Interview added successfully:', response.data);

      navigate('/');

    } catch (error) {
      console.error('Error adding interview:', error.response ? error.response.data : error);
      
      alert('Failed to add interview');
    }
  };
  

  return (
    <div className="interview-form">
      <div className="form-sections">
        <div className="form-general-info">
      <label htmlFor="companyId">Company:</label>
      <Select 
        options={companies} // Ensure companies is in the correct format
        onChange={handleCompanyChange}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        required
      />

      <label htmlFor="professionId">Profession:</label>
      <Select 
        options={professions} // Ensure professions is in the correct format
        onChange={handleProfessionChange}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        required
      />

      <label htmlFor="type">Interview Type:</label>
      <Select 
        options={typeOptions} 
        onChange={handleTypeChange} 
        value={typeOptions.find(option => option.value === formData.type)}
        required 
      />

      <label htmlFor="score">Score:</label>
      <input type="number" id="score" name="score" value={formData.score} onChange={handleChange} min="0" max="5" required />

      <label htmlFor="opinion">Opinion:</label>
      <textarea id="opinion" name="opinion" value={formData.opinion} onChange={handleChange} required />

      <label htmlFor="interviewDate">Interview Date:</label>
      <DatePicker 
        selected={formData.interviewDate} 
        onChange={handleDateChange} 
        dateFormat="dd-MM-yyyy"
        required
      />
      </div>

      <div className="form-questions">
        {formData.questions.map((question, index) => (
          <div key={index} className="question-item">
            <input
              type="text"
              placeholder="Question"
              value={question.content}
              onChange={(e) => handleQuestionChange(index, 'content', e.target.value)}
            />
            <input
              type="text"
              placeholder="Answer"
              value={question.answer}
              onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
            />
            <button type="button" name='remove' onClick={() => handleRemoveQuestion(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion}>Add Question</button>
      </div>

      </div>
      <button onClick={handleSubmit}>Add Interview</button>
    </div>
  );
};

export default InterviewForm;
