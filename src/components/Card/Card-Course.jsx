import { cardsData } from "@/src/data/Data";
import React from "react";
import Card from "../Card/Card";
import { UilBookOpen } from "@iconscout/react-unicons";

function CardCourse({ open, close }) {
  const Png = UilBookOpen;
  return (
    <div
      className="CompactCard"
      style={{
        background: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      }}
    >
      <div className="title-logo d-flex flex-column" style={{}}>
        {/* <CircularProgressbar value={param.barValue} text={`${param.barValue}%`} /> */}
        <Png style={{ width: "60%", height: "60%" }} />
        <span style={{ fontSize: "1.3rem", fontWeight: "bold" }}>Courses</span>
      </div>
      <div className="d-flex flex-column align-items-center">
        <div className="course-open" style={{ fontSize: "1rem", fontWeight: "bold" }}>
          <span>Open:</span>
          <span >{open}</span>
        </div>
        <div className="course-close" style={{ fontSize: "1rem", fontWeight: "bold" }}>
            <span>Close:</span>
          <span >{close}</span>
        </div>
      </div>
    </div>
  );
}

export default CardCourse;
