import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import RideList from '../../components/Lists/RideList'

const Epcot = () => {
  return (
    <DashboardLayout activeMenu="Epcot">
      <RideList park={"Epcot"}/>
    </DashboardLayout>
  )
}

export default Epcot
