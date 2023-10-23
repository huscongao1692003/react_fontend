import React from 'react'
import Cards from '../Cards/Cards'
import Table from './Table/Table'
import Courses from '../Table/Courses'

const DashStaff = () => {
  return (
    <div className='DashStaff'>
        <h1>Dashboard</h1>
        <Table/>
        <Courses/>
    </div>
  )
}

export default DashStaff
