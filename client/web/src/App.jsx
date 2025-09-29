import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'

import Header from './components/Header'
import Footer from './components/Footer'

import Dashboard from './components/Dashboard'
import Location from './components/Location'
import Vehicle from './components/Vehicle'
import Wallet from './components/Wallet'
import History from './components/History'
import About from './pages/About'
import Service from './pages/Service'
import Contact from './pages/Contact'
import Notification from './components/Notification'

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

      {/* Protected/Home routes */}
      <Route
        path="/home"
        element={
          <>
            <Header />
            <main className="main-content">
              <Home />
            </main>
            <Footer />
          </>
        }
      >
        {/* ✅ Default redirect to /home/location */}
        <Route index element={<Navigate to="location" replace />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="location" element={<Location />} />
        <Route path="vehicle" element={<Vehicle />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="history" element={<History />} />
        <Route path="notifications" element={<Notification />} />
      </Route>
    </Routes>
  )
}

export default App