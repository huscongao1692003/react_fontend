import React from 'react'
import Cards from '../Cards/Cards'
import Table from './Table/Table'
import Courses from '../Table/Courses'

const DashStaff = () => {
  return (
    <div className='DashStaff'>
      <div className="staffDashContainer">
        <h1>Dashboard</h1>
        <Table/>
        <Courses/>
      </div>
        
    </div>
  )
}

export default DashStaff
