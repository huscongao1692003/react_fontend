import React, { useState, useEffect } from "react";
import GeneralData from "./chart/General-data";
import Cards from "../Cards/Cards";
import { cardsData } from "./chart/Data";
import axios from "axios";
import RadarAnalystCourse from "./chart/Analyst-course";

const DashStaff = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const [listDataCard, setListDataCard] = useState(cardsData);
  const [objectData, setObjectData] = useState({});
  const [categories, setCategories] = useState([]);
  const [styles, setStyles] = useState([]);
  const [courseClosers, setCourseClosers] = useState(0);

  useEffect(() => {
    const url = `https://drawproject-production-012c.up.railway.app/api/v1/dashboard/instructor`;

    // Fetch data for the current year
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setObjectData(response.data.data);
        setCategories(response.data.data.numOfCourseByCategory);
        setStyles(response.data.data.numOfCourseByStyle);
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
      setCourseClosers(objectData.numOfCourse - objectData.numOfCourseOpen);
      setListDataCard(newListCard);
    }
  }, [objectData])

  return (
    <div className="DashInstructor">
      <Cards listDataCard={listDataCard} open={objectData.numOfCourseOpen} close={courseClosers} />
      <GeneralData />
      <div className="d-flex mt-30 ">
        <div className="chart-category" style={{width: "50%"}}>
          <RadarAnalystCourse list={ categories } title={"Category"} />
        </div>
        <div className="chart-style" style={{width: "50%"}}>
          <RadarAnalystCourse list={ styles } title={"Style"} />
        </div>
        
      </div>
    </div>
  );
};

export default DashStaff;
