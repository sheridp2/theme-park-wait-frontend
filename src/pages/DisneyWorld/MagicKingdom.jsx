import React from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import RideList from '../../components/RideList'

const MagicKingdom = () => {
  return (
    <DashboardLayout activeMenu="Magic Kingdom">
      <RideList park={"Magic Kingdom"}/>
    </DashboardLayout>
  )
}

export default MagicKingdom
