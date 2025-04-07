import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Register from "./register";
import Timer from "./Components/Timer";
import Signup from "./Components/SingUp";
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./Components/LogIn";
import Dashboard from "./Components/DashBoard";
import RideRequestMap from "./Components/SingleComponent";
import DriverDashboard from "./Components/DriverDashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/passenger" element={<RideRequestMap />} />
          <Route path="/driver" element={<DriverDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
