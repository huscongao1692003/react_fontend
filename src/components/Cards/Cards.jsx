import { cardsData } from '@/src/data/Data';
import React from 'react';
import Card from '../Card/Card';

const Cards = () => {
  return (
    <>
      <h3 style={{ marginTop: "2rem", marginBottom: "2rem" }}>Analytics Card</h3>
      <div className='Cards'>
        {cardsData.map((card, id) => {
          return (
            <div className='parentContainer' key={id}> {/* Add a unique key prop */}
              <Card
                title={card.title}
                color={card.color}
                barValue={card.barValue}
                value={card.value}
                png={card.png}
                series={card.series}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Cards;