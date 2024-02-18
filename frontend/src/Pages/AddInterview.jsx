
// src/components/AddInterview.jsx
import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import InterviewForm from '../Components/InterviewForm/InterviewForm';
import { useAuth } from '../Context/AuthContext';
import API from '../Api/axios';


const AddInterview = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [companies, setCompanies] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    

    useEffect(() => {
      const fetchCompanies = async () => {
        try {
          const response = await API.get('/v1/company');
          setCompanies(response.data.map(company => ({
            value: company.id,
            label: company.name
          })));
        } catch (error) {
          console.error('Error fetching companies:', error);
        }
      };
  
      const fetchProfessions = async () => {
        try {
          const response = await API.get('/v1/profession');
          setProfessions(response.data.map(profession => ({
            value: profession.id,
            label: profession.name
          })));
        } catch (error) {
          console.error('Error fetching professions:', error);
        }
      };
  
      fetchCompanies();
      fetchProfessions();
    }, []);

    if (!isAuthenticated) {
      navigate('/login');
      return null;
    }

    const handleSubmit = async (formData) => {
      setLoading(true);
      setErrorMessage('');
      try {
        console.log('Form Data:', formData.score);
        //formData.interviewDate = formData.interviewDate.toISOString().split('T')[0];
        const response = await API.post('/api/v1/interview', formData);
        console.log('Interview added successfully:', response.data);
        setLoading(false);
  
        navigate('/');

      } catch (error) {
        console.error('Error adding interview:', error.response ? error.response.data : error);
        setErrorMessage('Failed to add interview. Please try again.');
        setLoading(false);
        alert('Failed to add interview');
      }
    };

  
    return (
      <div>
        <h1>Add New Interview</h1>
        <InterviewForm onSubmit={handleSubmit} companies={companies} professions={professions} />
      </div>
    );
};

export default AddInterview;
