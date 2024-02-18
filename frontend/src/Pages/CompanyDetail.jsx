import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Css/CompanyDetail.css'; // Make sure to create and import the CSS for styling
import API from '../Api/axios';

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [companyDetail, setCompanyDetail] = useState(null);

  useEffect(() => {
    const fetchCompanyDetail = async () => {
      try {
        const response = await API.get(`/v1/company/${id}`); // Replace 1 with the actual company ID
        console.log('Company Detail:', response.data);
        const responseDetail = {
          name: response.data.name,
          averageScore: response.data.averageScore >= 0 ? response.data.averageScore : 'N/A',
          industries: response.data.industries.map((industry) => industry.name),
          interviews: response.data.interviews.map((interview) => ({
            id: interview.id,
            title: interview.title,
            date: interview.interviewDate,
          })),
        };
        setCompanyDetail(responseDetail);
      } catch (error) {
        console.error('Fetch Company Detail Error:', error.response ? error.response.data : error.message);
      }
    };

    fetchCompanyDetail();
  }, [id]);

  if (!companyDetail) return <div>Loading...</div>;

  const goToInterviewDetail = (id) => {
    navigate(`/interview/${id}`);
  };

  return (
    <div className="company-detail-container">
      <section className="company-info">
        <h1>{companyDetail.name}</h1>
        <p>Industry: {companyDetail.industries}</p>
        <p>Average Interview Score: {companyDetail.averageScore}</p>
        {/* Add more company details as needed */}
      </section>
      <section className="company-interviews">
        <h2>Interviews</h2>
        <ul>
          {companyDetail.interviews.map(interview => (
            <li key={interview.id} onClick={() => goToInterviewDetail(interview.id)}>
              <p>Date: {interview.date}</p>
              {/* Add more interview summary details as needed */}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CompanyDetail;