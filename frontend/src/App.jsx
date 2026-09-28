import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppLayout from './layout/AppLayout';
import Home from './pages/Home';
import Markets from './pages/Markets';
import Products from './pages/Products';
import About from './pages/About';
import Login from './pages/Login';
import DashboardHome from './pages/dashboard/DashboardHome';
import DashboardLayout from './layout/DashboardLayout';

const App = () => {
  return (
    <AppProvider>
      <Routes>
        {/* Public Layout */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="markets" element={<Markets />} />
          <Route path="products" element={<Products />} />
          <Route path="about" element={<About />} />
        </Route>

        {/* Standalone Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="home" element={<DashboardHome />} />
        </Route>
      </Routes>
    </AppProvider>
  );
};

export default App;
