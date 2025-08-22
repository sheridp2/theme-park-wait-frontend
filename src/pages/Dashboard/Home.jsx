import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ParksList from "../../components/ParksList";

const Home = () => {
  return (
    <DashboardLayout activeMenu="Home Page">
      <ParksList />
    </DashboardLayout>
  );
};

export default Home;
