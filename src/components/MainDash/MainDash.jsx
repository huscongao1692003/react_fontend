import React from 'react'
import Cards from '../Cards/Cards'
import LineChart from '../Table/LineChart'
import RadarGrid from '../Table/RadarGrid'
import ComposedGrid from '../Table/ComposedChart'
const MainDash = () => {
  return (
    
    <div className='MainDash'>
      
      <Cards />
      <div class="chart-container">
        <RadarGrid />
        <LineChart />
        {/* <ComposedGrid /> */}
      </div>
    </div>
  )
}

export default MainDash
