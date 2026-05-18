import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import RideList from '../../components/Lists/RideList'

const UniversalStudiosFlorida = () => {
  return (
    <DashboardLayout activeMenu="Universal Studios Florida">
      <RideList park={"Universal Studios Florida"} />
    </DashboardLayout>
  );
};

export default UniversalStudiosFlorida;
