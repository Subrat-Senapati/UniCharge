import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";

import Dashboard from "./components/Dashboard";
import Vehicle from "./components/Vehicle";
import Wallet from "./components/Wallet";
import History from "./components/History";
import About from "./pages/About";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import Notification from "./components/Notification";
import ProtectedRoute from "./components/ProtectedRoute";
import EVChargeHub from "./components/EVChargeHub";
import GoogleSuccess from "./utils/GoogleSuccess";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Service />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/google-success" element={<GoogleSuccess />} />

      {/* Protected routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route element={<Home />}>
          <Route index element={<Navigate to="chargehub" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="chargehub" element={<EVChargeHub />} />
          <Route path="vehicle" element={<Vehicle />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="history" element={<History />} />
          <Route path="notifications" element={<Notification />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;