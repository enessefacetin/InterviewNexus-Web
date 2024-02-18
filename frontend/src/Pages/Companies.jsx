import React, {useState, useEffect} from 'react';
import CardTable from '../Components/CardTable/CardTable';
import { useNavigate } from 'react-router-dom';
import API from '../Api/axios';

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  const navigate = useNavigate();

  const handleCompanyClick = (id) => {
    navigate(`/company/${id}`);
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await API.get('/v1/company');
        console.log('Companies:', response.data);
        const companies = response.data.map((company) => ({
          id: company.id,
          name: company.name,
          detailList: company.industries.map((industry) => industry.name),
        }));

        setCompanies(companies);
      } catch (error) {
        console.error('Fetch Interviews Error:', error.response ? error.response.data : error.message);
      }
    };

    fetchCompanies();
  }, []);


  return (
    <div>
        <CardTable items={companies} onItemClick={handleCompanyClick} />
    </div>
  );
};

export default Companies;