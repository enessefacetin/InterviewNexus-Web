import React, {useState} from 'react'
import './Css/InterviewDetail.css'; // Assuming you will create CSS for styling
import { useParams } from 'react-router-dom';


// This is a placeholder for the interview detail page
const dummyInterview = {
    id: 1,
    companyName: "Company A",
    professionName: "Software Engineer",
    type: "Technical",
    score: 5,
    opinion: "Great process, but challenging",
    interviewDate: "2023-01-15T14:00:00Z",
    questions: [
      { id: 1, question: "What is polymorphism?", answer: "Polymorphism is a concept in OOP that allows objects to be treated as instances of their parent class rather than their actual class." },
      { id: 2, question: "Explain event delegation in JavaScript.", answer: null }, // Example of an unanswered question
      // Add more questions as needed
    ]
    };

const InterviewDetail = () => {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);
  
  //if (!interview) return <div>Loading...</div>;
  
  return (
    <div className="interview-detail-container">
      <div className="interview-summary">
        <h1>Interview with {dummyInterview.companyName}</h1>
        <p>Profession: {dummyInterview.professionName}</p>
        <p>Type: {dummyInterview.type}</p>
        <p>Score: {dummyInterview.score}</p>
        <p>Opinion: {dummyInterview.opinion}</p>
        <p>Date: {dummyInterview.date}</p>
      </div>
      <div className="interview-questions">
        <h2>Questions</h2>
        <ul>
          {dummyInterview.questions.map((q) => (
            <li key={q.id}>
              <p><strong>Q:</strong> {q.question}</p>
              {q.answer && <p><strong>A:</strong> {q.answer}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default InterviewDetail