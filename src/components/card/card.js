import React from 'react';
import './card.sass';


const Card = ({ name, value, isSelected, chooseOrChangeCard }) => {
  let classNames = 'card';
  if (isSelected) classNames = 'card card-selected';

  return (
    <div className={classNames} onClick={chooseOrChangeCard}>
      <div className="custom-card-header">{name}</div>
      <div className="card-inner">
        <p>{value}</p>
      </div>
    </div>
  );
};

export default Card;
