import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import RideList from '../../components/RideList'

const HollywoodStudios = () => {
  return (
    <DashboardLayout activeMenu="Hollywood Studios">
      <RideList park={"Hollywood Studios"}/>
    </DashboardLayout>
  )
}

export default HollywoodStudios
