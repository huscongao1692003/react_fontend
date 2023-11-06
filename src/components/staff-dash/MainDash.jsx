import React from 'react'
import Cards from '../Cards/Cards'
import Table from './Table/Table'
import Courses from '../Table/Courses'
import Order from '../instructor-dash/Table/Orders'

const DashStaff = () => {
  return (
    <div className='DashStaff'>
      <div className="staffDashContainer mt-30">
        <h1>Dashboard</h1>
        <Order/>
        <Courses/>
      </div>
        
    </div>
  )
}

export default DashStaff
