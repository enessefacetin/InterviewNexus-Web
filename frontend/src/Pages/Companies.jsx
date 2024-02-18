import React from 'react';
import CardTable from '../Components/CardTable/CardTable';
import { useNavigate } from 'react-router-dom';

const companies = [
    {
      id: 1,
      name: "Company A",
      detailList: ["Technology", "San Francisco, CA"],
    },
    {
      id: 2,
      name: "Company B",
      detailList: ["Finance", "New York, NY"],
    },
    // Add more companies as needed
  ];

const Companies = () => {
    const navigate = useNavigate();

  const handleCompanyClick = (id) => {
    navigate(`/company/${id}`);
  };

  return (
    <div>
        <CardTable items={companies} onItemClick={handleCompanyClick} />
    </div>
  );
};

export default Companies;