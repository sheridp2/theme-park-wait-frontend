import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

import { useUserAuth } from "../../hooks/useUserAuth";
import ParksList from "../../components/Lists/ParksList";

const Home = () => {
  useUserAuth();

  return (
    <DashboardLayout activeMenu="Home">
      <ParksList />
    </DashboardLayout>
  );
};

export default Home;
