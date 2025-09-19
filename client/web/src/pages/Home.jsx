import React from 'react'
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-4">
      <Outlet />
    </div>
  )
}

export default Home;