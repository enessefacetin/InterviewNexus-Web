import React, { useState, useEffect } from 'react'
import InterviewTable from '../Components/InterviewTable/InterviewTable';

export const Home = () => {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    // Here, fetch the interviews data from your backend and update the state
    // For demonstration, using static data
    const fetchedInterviews = [
      // Your fetched interviews data
      {
        id: 1,
        companyName: "Company A",
        professionName: "Software Engineer",
        type: "Technical",
        score: 8,
        opinion: "Great process and interesting challenges.",
        interviewDate: "2022-01-10T14:00:00"
      },
      {
        companyName: "Company B",
        professionName: "Product Manager",
        type: "Behavioral",
        score: 7,
        opinion: "Very thorough and engaging.",
        interviewDate: "2022-03-15T10:00:00"
      },
      {
        companyName: "Company C",
        professionName: "Data Scientist",
        type: "Technical",
        score: 9,
        opinion: "Questions were relevant and thought-provoking.",
        interviewDate: "2022-02-20T16:00:00"
      },
      {
        companyName: "Company D",
        professionName: "UX Designer",
        type: "Portfolio Review",
        score: 6,
        opinion: "Feedback was constructive, but the process was lengthy.",
        interviewDate: "2022-04-25T09:00:00"
      },
  
    ];
    setInterviews(fetchedInterviews);
  }, []);

  return (
    <div className='home'>
      <InterviewTable interviews={interviews} />
    </div>
  );
}


export default Home