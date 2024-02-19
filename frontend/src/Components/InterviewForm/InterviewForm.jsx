import React, { useState, useEffect } from 'react';
import './InterviewForm.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

const InterviewForm = ({ onSubmit, companies, professions, initialData }) => {
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

  function convertDateToISO(dateStr) {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      // Reorder the date parts to match ISO 8601 format (YYYY-MM-DD)
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr; // Return the original string if it's not in the expected format
  }

  useEffect(() => {
    if (initialData) {
      console.log(initialData)
      const selectedCompany = companies.find(company => company.label === initialData.companyName);
      const selectedProfession = professions.find(profession => profession.label === initialData.professionName);
      console.log(selectedCompany)
      setFormData({
        companyId: selectedCompany ? selectedCompany.value : '',
      professionId: selectedProfession ? selectedProfession.value : '',
      type: initialData.type || '',
      score: initialData.score ? initialData.score.toString() : '', // Convert score to string and ensure it's not null
      opinion: initialData.opinion || '',
      interviewDate: initialData.interviewDate ? new Date(convertDateToISO(initialData.interviewDate)) : new Date(),
      questions: initialData.questions && initialData.questions.length > 0 ? initialData.questions.map(q => ({
        content: q.content || '', // Ensure content and answer are not null
        answer: q.answer || ''
      })) : [{ content: '', answer: '' }]
      });
    }
  }, [initialData]);

  
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
    onSubmit(formData);
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
        value={companies.find(company => company.value === formData.companyId) || ''}
        required
      />

      <label htmlFor="professionId">Profession:</label>
      <Select 
        options={professions} // Ensure professions is in the correct format
        onChange={handleProfessionChange}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        value={professions.find(profession => profession.value === formData.professionId) || ''}
        required
      />

      <label htmlFor="type">Interview Type:</label>
      <Select 
        options={typeOptions} 
        onChange={handleTypeChange} 
        value={typeOptions.find(option => option.value === formData.type)}
        required 
      />

    <div className="score-slider">
      <label htmlFor="score">Score:</label>
      <input
        type="range"
        id="score"
        name="score"
        min="0"
        max="5"
        value={formData.score}
        onChange={handleChange}
        className="slider"
        required
      />
      <span>{formData.score}</span>
    </div>

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
