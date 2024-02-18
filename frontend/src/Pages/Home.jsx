import React, { useState, useEffect } from 'react'
import InterviewTable from '../Components/InterviewTable/InterviewTable';
import API from '../Api/axios';

export const Home = () => {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await API.get('/v1/interview');
        console.log('Interviews:', response.data);
        setInterviews(response.data);
      } catch (error) {
        console.error('Fetch Interviews Error:', error.response ? error.response.data : error.message);
      }
    };

    fetchInterviews();
  }, []);
   

  return (
    <div className='home'>
      <InterviewTable interviews={interviews} />
    </div>
  );
}

export default Home