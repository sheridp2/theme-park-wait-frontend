import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import RideList from "../../components/RideList";

const CaliforniaAdventure = () => {
  return (
    <DashboardLayout activeMenu="California Adventure">
      <RideList park={"California Adventure"}/>
    </DashboardLayout>
  )
}

export default CaliforniaAdventure
