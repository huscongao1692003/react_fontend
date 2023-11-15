import { cardsData } from "@/src/data/Data";
import React from "react";
import Card from "../Card/Card";
import CardCourse from "../Card/Card-Course";

const Cards = ({ listDataCard = [], open, close }) => {
  return (
    <>
      <h3 style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        Analytics Data
      </h3>
      <div className="Cards">
        <div className="parentContainer">
          <CardCourse open={open} close={close} />
        </div>
        {listDataCard.map((card, id) => {
          return (
            <div className="parentContainer" key={id}>
              {" "}
              {/* Add a unique key prop */}
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
