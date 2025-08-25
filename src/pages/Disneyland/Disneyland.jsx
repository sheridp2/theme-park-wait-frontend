import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import RideList from "../../components/RideList";

const Disneyland = () => {
  return (
    <DashboardLayout activeMenu="Disneyland">
      <RideList park={"Disneyland"}/>
    </DashboardLayout>
  )
}

export default Disneyland
