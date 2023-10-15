import React from 'react'
import Cards from '../Cards/Cards'
import Table from '../Table/Table'
import Customer from '../Table/Customer'

const MainDash = () => {
  return (
    <div className='MainDash'>
        <h1>Dashboard</h1>
        <Cards/>
        <Table/>
        <Customer/>
    </div>
  )
}

export default MainDash
