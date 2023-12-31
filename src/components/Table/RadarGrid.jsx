import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

const data = [
  {
    subject: "Pop Art",
    A: 120,
    B: 110,
    fullMark: 150
  },
  {
    subject: "Simplify",
    A: 98,
    B: 130,
    fullMark: 150
  },
  {
    subject: "Abstract",
    A: 86,
    B: 130,
    fullMark: 150
  },
  {
    subject: "Realistic",
    A: 99,
    B: 100,
    fullMark: 150
  },
  {
    subject: "Surreal",
    A: 85,
    B: 90,
    fullMark: 150
  },

];

export default function RadarGrid() {
  return (
    <>
      <div className="RadarGrid">
      <h3 style={{ marginTop: "2rem", marginBottom: "2rem" }}>Radar Chart</h3>
        <RadarChart
          outerRadius={150}
          width={400}
          height={400}
          data={data}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar
            name="Mike"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </div>
    </>
  );
}
