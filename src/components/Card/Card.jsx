import React, { useState } from 'react';
import { AnimateSharedLayout } from 'framer-motion';
import { CircularProgressbar } from 'react-circular-progressbar';
import { motion } from 'framer-motion';
import { UilTimes } from '@iconscout/react-unicons';

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded ? (
        <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(false)} />
      )}
    </div>
  );
};

function CompactCard({ param, setExpanded }) {
  const Png = param.png;
  return (
    <div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutid="expandableCard"
      onClick={setExpanded}
      key={param.title} // Add a unique key prop here
    >
      <div className="radialBar">
        <CircularProgressbar value={param.barValue} text={`${param.barValue}%`} />
        <span>{param.title}</span>
      </div>
      <div className="detail">
        <Png />
        <span>${param.value}</span>
        <span>Last 24 hours</span>
      </div>
    </div>
  );
}

function ExpandedCard({ param, setExpanded }) {
  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutid="expandedCard"
      key={param.title} // Add a unique key prop here
    >
      <div>
        <UilTimes onClick={setExpanded} />
      </div>
      <span>{param.title}</span>
      <div className="chartContainer">Chart</div>
      <span>Last 24 hours</span>
    </motion.div>
  );
}

export default Card;