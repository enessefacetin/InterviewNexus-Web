import React, {useState, useEffect} from 'react'
import './Css/InterviewDetail.css'; // Assuming you will create CSS for styling
import { useParams } from 'react-router-dom';
import API from '../Api/axios';


const InterviewDetail = () => {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await API.get(`/v1/interview/${id}`);
        setInterview(response.data);
      } catch (error) {
        console.error('Fetch Interview Error:', error.response ? error.response.data : error.message);
      }
    };

    fetchInterview();
  }, [id]); 

  if (!interview) return <div>Loading...</div>;

  
  return (
    <div className="interview-detail-container">
      <div className="interview-summary">
        <h1>Interview with {interview.companyName}</h1>
        <p>Profession: {interview.professionName}</p>
        <p>Type: {interview.type}</p>
        <p>Score: {interview.score}</p>
        <p>Opinion: {interview.opinion}</p>
        <p>Date: {interview.interviewDate}</p>
      </div>
      <div className="interview-questions">
        <h2>Questions</h2>
        <ul>
          {interview.questions.map((q) => (
            <li key={q.id}>
              <p><strong>Q:</strong> {q.content}</p>
              {q.answer && <p><strong>A:</strong> {q.answer}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default InterviewDetail