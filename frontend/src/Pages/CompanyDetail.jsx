import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Css/CompanyDetail.css'; // Make sure to create and import the CSS for styling

const dummyCompanyDetail = {
    id: 1,
    name: "Company A",
    industry: "Technology",
    location: "San Francisco, CA",
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
    // Add more company details as needed
    };

const CompanyDetail = () => {
  const navigate = useNavigate();

  const goToInterviewDetail = (interviewId) => {
    navigate(`/interview/${interviewId}`);
  };

  return (
    <div className="company-detail-container">
      <section className="company-info">
        <h1>{dummyCompanyDetail.name}</h1>
        <p>Industry: {dummyCompanyDetail.industry}</p>
        <p>Location: {dummyCompanyDetail.location}</p>
        {/* Add more company details as needed */}
      </section>
      <section className="company-interviews">
        <h2>Interviews</h2>
        <ul>
          {dummyCompanyDetail.interviews.map(interview => (
            <li key={interview.id} onClick={() => goToInterviewDetail(interview.id)}>
              <p>{interview.title}</p>
              <p>Date: {new Date(interview.date).toLocaleDateString()}</p>
              {/* Add more interview summary details as needed */}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CompanyDetail;