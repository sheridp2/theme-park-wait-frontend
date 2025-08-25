import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ParksList from "../../components/ParksList";
import { useUserAuth } from "../../hooks/useUserAuth";

const Home = () => {
  useUserAuth();
  return (
    <DashboardLayout activeMenu="Home Page">
      <ParksList />
    </DashboardLayout>
  );
};

export default Home;
