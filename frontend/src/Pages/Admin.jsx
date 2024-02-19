import React, { useState, useEffect } from 'react';
import API from '../Api/axios'; // Adjust the import path as necessary
import './Css/Admin.css'; // Make sure the path matches your file structure

const Admin = () => {
    const [interviews, setInterviews] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPendingInterviews = async () => {
            try {
                const response = await API.get('/v1/admin/interviews');
                console.log('Pending Interviews:', response.data)
                setInterviews(response.data);
            } catch (error) {
                setError(error.response.status);
                console.error('Failed to fetch pending interviews', error);
            }
        };

        fetchPendingInterviews();
    }, []);

    const handleApprove = async (interviewId) => {
        try {
            await API.put(`/v1/admin/interviews/${interviewId}/approve`);
            setInterviews(interviews.filter(interview => interview.id !== interviewId));
        } catch (error) {
            setError(error.response.status);
            console.error('Failed to approve interview', error);
        }
    };

    const handleReject = async (interviewId) => {
        try {
            await API.put(`/v1/admin/interviews/${interviewId}/reject`);
            setInterviews(interviews.filter(interview => interview.id !== interviewId));
        } catch (error) {
            setError(error.response.status);
            console.error('Failed to reject interview', error);
        }
    };

    if (error == 403) {
        return <div className="admin-container">Yetkiniz bulunmamaktadır!</div>;
    }

    return (
        <div className="admin-container">
            <h1>Admin - Review Interviews</h1>
            <div className="interview-list">
                {interviews.map((interview) => (
                    <div key={interview.id} className="interview-card">
                        <h2>{interview.companyName} - {interview.professionName}</h2>
                        <p>Status: {interview.status}</p>
                        <div className="questions">
                            <h3>Questions:</h3>
                            <ul>
                                {interview.questions.map((question, index) => (
                                    <li key={index}>{question.content}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="actions">
                            <button onClick={() => handleApprove(interview.id)} className="approve">Approve</button>
                            <button onClick={() => handleReject(interview.id)} className="reject">Reject</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Admin;
