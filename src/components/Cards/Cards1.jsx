import React from "react";
import { cardsData } from "@/src/data/Data";
import Card from "../Card/Card";

const AdminCards = () => {
  return (
    <>
          <h3 style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        Analytics Data
      </h3>
    <div className="Cards">
      {cardsData.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
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
    </div></>
  );
};

export default AdminCards;