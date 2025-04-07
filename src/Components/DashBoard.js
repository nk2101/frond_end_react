import React from "react";
import { logout } from "../Utils/auth";
import { useNavigate } from "react-router-dom";
import OptimizedRouteMap from "./RequestedOptimizeRoute";
import DriverDashboard from "./DriverDashboard";
import RideRequestMap from "./SingleComponent";
import Sidebar from "./SideBarComponent";

const Dashboard = () => {
  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default Dashboard;
