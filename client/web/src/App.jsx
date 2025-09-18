import { Route, Routes } from 'react-router-dom'
import './App.css'

import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App