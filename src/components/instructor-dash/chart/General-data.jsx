import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

function GeneralData() {
    const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const [options, setOptions] = useState({
    chart: {
      id: "spline-line-chart",
      type: "line",
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    
  });

  const [series, setSeries] = useState([]);
  const currentYear = new Date().getFullYear();
  useEffect(() => {
    
    
    const thisYearIncome = `https://drawproject-production-012c.up.railway.app/api/v1/dashboard/instructor/income-month?year=${currentYear}`;
    
    // Fetch data for the current year
    axios.get(thisYearIncome, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        const thisYear = response.data.data;
        
        setSeries(prev=>[
            ...prev,
          {
            name: currentYear,
            data: thisYear,
          },
        ]);
      })
      .catch((error) => {
        console.error("Network error: ", error);
      });
  }, []); // Use an empty dependency array to mimic componentDidMount

  useEffect(() => {


      const lastYearIncome = `https://drawproject-production-012c.up.railway.app/api/v1/dashboard/instructor/income-month?year=${currentYear - 1}`;
    
    // Fetch data for the current year
    axios.get(lastYearIncome, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => {
        const lastYear = response.data.data;
        
        setSeries(prev=>[
            ...prev,
          {
            name: currentYear - 1,
            data: lastYear,
          },
        ]);
      })
      .catch((error) => {
        console.error("Network error: ", error);
      });
  }, []); // Use an empty dependency array to mimic componentDidMount


  return (
    <div className="app mt-60">
        <div className="spline-line-chart custom-chart-line">
          <Chart
            options={options}
            series={series}
            type="line"
            width="80%"
          />
      </div>
    </div>
  );
}

export default GeneralData;
