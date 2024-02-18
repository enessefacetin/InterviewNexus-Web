import React from 'react';
import './CardTable.css';

const CardTable = ({ items, onItemClick }) => {
    return (
      <div className="card-table-container">
        {items.map((item) => (
          <div
            key={item.id}
            className="card"
            onClick={() => onItemClick(item.id)}
          >
            <h2>{item.name}</h2>
            {item.detailList.slice(0, 5).map((detail, index) => ( // Limit to 5 details
              <p key={index}>{detail}</p>
            ))}
          </div>
        ))}
      </div>
    );
  };
  

export default CardTable