import React from 'react'
import LineChart from '../Table/LineChart'
import RadarGrid from '../Table/RadarGrid'
import ComposedGrid from '../Table/ComposedChart'
import AdminCards from '../Cards/Cards1'
const MainDash = () => {
  return (
    
    <div className='MainDash'>
      
      <AdminCards />
      <div class="chart-container">
        <RadarGrid />
        <LineChart />
        {/* <ComposedGrid /> */}
      </div>
    </div>
  )
}

export default MainDash
