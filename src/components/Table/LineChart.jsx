import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 90,
    pv: 240,
    amt: 240
  },
  {
    name: "Page B",
    uv: 150,
    pv: 139,
    amt: 221
  },
  {
    name: "Page C",
    uv: 120,
    pv: 980,
    amt: 229
  },
  {
    name: "Page D",
    uv: 200,
    pv: 390,
    amt: 200
  },
  {
    name: "Page E",
    uv: 150,
    pv: 480,
    amt: 218
  },
  {
    name: "Page F",
    uv: 200,
    pv: 380,
    amt: 250
  },

];

export default function LineChart() {
  if (typeof window === 'undefined') {
    return null;
  }
  const chartStyle = {
    fontSize: "10px", // Set your desired font size here
  };

  const labelStyle = {
    fontSize: "12px", // Set the font size for axis labels
  };

  const tooltipStyle = {
    fontSize: "10px", // Set the font size for tooltip content
  };
  return (
    <><div className="LineChart">
    <h3 style={{ marginTop: "2rem", marginBottom: "2rem" }}>Line Chart</h3>
    
    <AreaChart
    
      width={470}
      height={375}
      data={data}

    >
      <CartesianGrid strokeDasharray="3 3" />
     
      <XAxis dataKey="name" style={labelStyle} />
        <YAxis style={labelStyle} />
        <Tooltip contentStyle={tooltipStyle} />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
    </AreaChart></div></>
  );
}
