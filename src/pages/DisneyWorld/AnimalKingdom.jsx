import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import RideList from '../../components/Lists/RideList'

const AnimalKingdom = () => {
  return (
    <DashboardLayout activeMenu="Animal Kingdom">
      <RideList park={"Animal Kingdom"} />
    </DashboardLayout>
  );
};

export default AnimalKingdom;
