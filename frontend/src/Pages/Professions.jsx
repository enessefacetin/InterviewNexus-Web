import React, {useState, useEffect} from 'react';
import CardTable from '../Components/CardTable/CardTable';
import { useNavigate } from 'react-router-dom';
import API from '../Api/axios';



const Professions = () => {
  const navigate = useNavigate();
  const [professions, setProfessions] = useState([]);

  const handleProfessionClick = (id) => {
    navigate(`/profession/${id}`);
  };

  useEffect(() => {
    const fetchProfessions = async () => {
      try {
        const response = await API.get('/v1/profession');
        console.log('Professions:', response.data);
        const professions = response.data.map((profession) => ({
          id: profession.id,
          name: profession.name,
          detailList: []
        }));

        setProfessions(professions);
      } catch (error) {
        console.error('Fetch Interviews Error:', error.response ? error.response.data : error.message);
      }
    };

    fetchProfessions();
  }, []);

  if (!professions) return <div>Loading...</div>;

  return (
    <CardTable items={professions} onItemClick={handleProfessionClick} />
  );
};

export default Professions;