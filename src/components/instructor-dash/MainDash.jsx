import React, { useState, useEffect } from "react";
import GeneralData from "./chart/General-data";
import Cards from "../Cards/Cards";
import { cardsData } from "./chart/Data";
import axios from "axios";

const DashStaff = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const [listDataCard, setListDataCard] = useState(cardsData);
  const [objectData, setObjectData] = useState({});
  console.log("objectData: ", objectData);

  useEffect(() => {
    const url = `https://drawproject-production-012c.up.railway.app/api/v1/dashboard/instructor`;

    // Fetch data for the current year
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setObjectData(response.data.data);
        
      })
      .catch((error) => {
        console.error("Network error: ", error);
      });

      
  }, []); // Use an empty dependency array to mimic componentDidMount

  useEffect(() => {
    if(Object.keys(objectData).length != 0) {
      const newListCard = [...cardsData];
      newListCard[0].value = objectData.numOfStudent;
      newListCard[1].value = objectData.numOfPost;
      newListCard[2].value = objectData.totalIncome;
      newListCard[3].value = objectData.star.toFixed(1);
      setListDataCard(newListCard);
    }
  }, [objectData])

  return (
    <div className="DashInstructor">
      <Cards listDataCard={listDataCard} open={objectData.numOfCourseOpen} close={objectData.numOfCourse - objectData.numOfCourseOpen} />
      <div className="chart-container mt-30">
        <GeneralData />
      </div>
    </div>
  );
};

export default DashStaff;
