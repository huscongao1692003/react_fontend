import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const RadarAnalystCourse = ({ list=[], title }) => {

  function mapToList(j) {
    let data = [];
    for (let i = 0; i < list.length; i++) {
      data.push(list[i][j]);
    }
    return data;
  }

  const chartOptions = {
    chart: {
      type: "radar",
    },
    series: [
      {
        name: "Series 1",
        data: mapToList(1),
      },
    ],
    title: {
      text: title,
      align: 'left',
      offsetX: 20,
      offsetY: 20,
      floating: false,
      style: {
        fontSize: "1rem",
      }
    },
    labels: mapToList(0),
  };

  return (
      <Chart
        options={chartOptions}
        series={chartOptions.series}
        type="radar"
        width={"100%"}
        
      />
  );
};

export default RadarAnalystCourse;
