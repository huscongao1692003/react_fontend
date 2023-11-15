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
      type: "pie",
    },
    series: mapToList(1),
    labels: mapToList(0),
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
    plotOptions: {
      pie: {
        customScale: 0.8
      }
    },
  };

  return (
      <Chart
        options={chartOptions}
        series={chartOptions.series}
        type="pie"
        width={"100%"}
        
      />
  );
};

export default RadarAnalystCourse;
