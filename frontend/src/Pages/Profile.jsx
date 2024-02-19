import React, { useEffect, useState } from 'react';
import API from '../Api/axios';
import { useNavigate } from 'react-router-dom'; 
import './Css/Profile.css'

const Profile = () => {
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await API.get('/v1/interview/user');
        setInterviews(response.data);
      } catch (error) {
        console.error('Error fetching interviews:', error);
      }
    };

    fetchInterviews();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/v1/interview/${id}`);
      // Filter out the deleted interview from the interviews state
      setInterviews(interviews.filter(interview => interview.id !== id));
    } catch (error) {
      console.error('Error deleting interview:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-interview/${id}`);
  };

  return (
    <div className='profile-container'>
      <h1 className='profile-header'>My Interviews</h1>
      {interviews.length > 0 ? (
        <ul>
          {interviews.map((interview) => (
            <li key={interview.id}>
              {interview.companyName} - {interview.interviewDate} - {interview.type} - {interview.status}
              <div className="button-group">
                <button name='edit' onClick={() => handleEdit(interview.id)}>Edit</button>
                <button name='remove' onClick={() => handleDelete(interview.id)}>Delete</button>
              </div>
              
            </li>
          ))}
        </ul>
      ) : (
        <p>No interviews found.</p>
      )}
    </div>
  );
};

export default Profile;
