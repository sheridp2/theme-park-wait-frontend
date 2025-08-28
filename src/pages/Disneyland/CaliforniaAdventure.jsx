import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import RideList from '../../components/Lists/RideList'


const CaliforniaAdventure = () => {
  return (
    <DashboardLayout activeMenu="California Adventure">
      <RideList park={"California Adventure"}/>
    </DashboardLayout>
  )
}

export default CaliforniaAdventure
