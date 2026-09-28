import React from 'react';
import { useOutletContext } from 'react-router-dom';
import FarmerDashboard from './FarmerDashboard';
import CustomerDashboard from './CustomerDashboard';
import AdminDashboard from './AdminDashboard';

export default function DashboardHome() {
  const context = useOutletContext();
  const userRole = context?.userRole || 'vendor';
  const activeTab = context?.activeTab || 'dashboard';

  // Render role-specific dashboard dynamically
  if (userRole === 'admin') {
    return <AdminDashboard activeTab={activeTab} />;
  }

  if (userRole === 'customer') {
    return <CustomerDashboard activeTab={activeTab} />;
  }

  // Default to Farmer / Vendor Dashboard
  return <FarmerDashboard activeTab={activeTab} />;
}
