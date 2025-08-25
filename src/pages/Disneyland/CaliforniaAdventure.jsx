import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import RideList from "../../components/RideList";

const CaliforniaAdventure = () => {
  return (
    <DashboardLayout activeMenu="CaliforniaAdventure">
      <RideList park={"CaliforniaAdventure"}/>
    </DashboardLayout>
  )
}

export default CaliforniaAdventure
