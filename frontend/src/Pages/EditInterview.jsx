
// src/components/AddInterview.jsx
import React,{useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InterviewForm from '../Components/InterviewForm/InterviewForm';
import { useAuth } from '../Context/AuthContext';
import API from '../Api/axios';


const EditInterview = () => {

    const { id } = useParams(); // Assuming you're using react-router-dom
    const [interviewData, setInterviewData] = useState(null);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [companies, setCompanies] = useState([]);
    const [professions, setProfessions] = useState([]);
    

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

      const fetchInterviewDetails = async () => {
        try {
          const response = await API.get(`/v1/interview/user/${id}`);
          setInterviewData(response.data);
          // Fetch companies and professions if not passed as props
        } catch (error) {
          console.error('Error fetching interview details:', error);
        }
      };


  
      fetchCompanies();
      fetchProfessions();
        fetchInterviewDetails();
    }, [id]);

    if (!isAuthenticated) {
      navigate('/login');
      return null;
    }

    const handleSubmit = async (formData) => {
      try {
        console.log('Form Data:', formData);
        const response = await API.put(`/v1/interview/${id}`, formData);
        console.log('Interview updated successfully:', response.data);
  
        navigate('/');
  
      } catch (error) {
        console.error('Error adding interview:', error.response ? error.response.data : error);
        
        alert('Failed to add interview');
      }
    };

    if (!interviewData) return <div>Loading...</div>; // Loading state

    return (
      <div>
        <h1>Add New Interview</h1>
        <InterviewForm onSubmit={handleSubmit} companies={companies} professions={professions} initialData={interviewData} />
      </div>
    );
};

export default EditInterview;
