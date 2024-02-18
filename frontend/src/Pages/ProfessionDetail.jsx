import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Css/ProfessionDetail.css'; 
import API from '../Api/axios';

const ProfessionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [professionDetail, setProfessionDetail] = useState(null);

  const goToInterviewDetail = (interviewId) => {
    navigate(`/interview/${interviewId}`);
  };

  useEffect(() => {
    const fetchProfessionDetail = async () => {
      try {
        const response = await API.get(`/v1/profession/${id}`); // Replace 1 with the actual profession ID
        console.log('Profession Detail:', response.data);
        const responseDetail = {
          name: response.data.name,
          averageScore: response.data.averageScore >= 0 ? response.data.averageScore : 'N/A',
          interviews: response.data.interviews.map((interview) => ({
            id: interview.id,
            title: interview.title,
            date: interview.interviewDate,
          })),
        };
        setProfessionDetail(responseDetail);
      } catch (error) {
        console.error('Fetch Profession Detail Error:', error.response ? error.response.data : error.message);
      }
    };

    fetchProfessionDetail();
  }, [id]);

  if (!professionDetail) return <div>Loading...</div>;


  return (
    <div className="profession-detail-container">
      <section className="profession-info">
        <h1>{professionDetail.name}</h1>
        <section className="profession-interviews">
        <h2>Interviews</h2>
        <ul>
          {professionDetail.interviews.map(interview => (
            <li key={interview.id} onClick={() => goToInterviewDetail(interview.id)}>
              <p>{interview.title}</p>
              <p>Date: {interview.date}</p>
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