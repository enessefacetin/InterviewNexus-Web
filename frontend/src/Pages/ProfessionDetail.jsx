import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Css/ProfessionDetail.css'; // Make sure to create and import the CSS for styling

const dummyProfessionDetail = {
    id: 1,
    name: "Software Engineer",
    interviews: [
        {
        id: 1,
        title: "Software Engineer Interview",
        date: "2021-06-01",
        // Add more interview details as needed
        },
        {
        id: 2,
        title: "Product Manager Interview",
        date: "2021-07-01",
        // Add more interview details as needed
        },
        // Add more interviews as needed
    ],
    
    };

const ProfessionDetail = () => {
  const navigate = useNavigate();

  const goToInterviewDetail = (interviewId) => {
    navigate(`/interview/${interviewId}`);
  };

  return (
    <div className="profession-detail-container">
      <section className="profession-info">
        <h1>{dummyProfessionDetail.name}</h1>
        <section className="profession-interviews">
        <h2>Interviews</h2>
        <ul>
          {dummyProfessionDetail.interviews.map(interview => (
            <li key={interview.id} onClick={() => goToInterviewDetail(interview.id)}>
              <p>{interview.title}</p>
              <p>Date: {new Date(interview.date).toLocaleDateString()}</p>
              {/* Add more interview summary details as needed */}
            </li>
          ))}
        </ul>
      </section>
      </section>
      
    </div>
  );
};

export default ProfessionDetail;