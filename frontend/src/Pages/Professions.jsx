import React from 'react';
import CardTable from '../Components/CardTable/CardTable';
import { useNavigate } from 'react-router-dom';

const professions = [
  {
    id: 1,
    name: "Software Engineer",
    detailList: ["Designs and develops software applications."],
  },
  {
    id: 2,
    name: "Product Manager",
    detailList: ["Oversees product development from conception to launch."],
  },
  // Add more professions as needed
];


const Professions = () => {
  const navigate = useNavigate();

  const handleProfessionClick = (id) => {
    navigate(`/profession/${id}`);
  };

  return (
    <CardTable items={professions} onItemClick={handleProfessionClick} />
  );
};

export default Professions;