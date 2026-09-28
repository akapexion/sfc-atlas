import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardTopbar from '../components/DashboardTopbar';
import { Outlet, useSearchParams, useNavigate } from 'react-router-dom';
import DashboardFooter from '../components/DashboardFooter';

/**
 * DashboardLayout Component
 * Location: src/layout/DashboardLayout.jsx
 * Functionality: Main layout wrapper for all authenticated dashboard portals.
 * Renders DashboardSidebar, DashboardTopbar, main content Outlet, and DashboardFooter.
 * Enforces role security checking to prevent unauthorized access via URL parameter manipulation.
 */
const DashboardLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Determine initial role from URL query parameter or localStorage
  const getInitialRole = () => {
    const urlRole = searchParams.get('role');
    const savedRole = localStorage.getItem('marketlink_user_role');
    const normalizedSaved = savedRole === 'farmer' ? 'vendor' : (savedRole || 'vendor');

    if (urlRole && ['vendor', 'farmer', 'customer', 'admin'].includes(urlRole)) {
      return urlRole === 'farmer' ? 'vendor' : urlRole;
    }

    return normalizedSaved;
  };

  const [userRole, setUserRoleState] = useState(getInitialRole);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync role smoothly when query param changes
  useEffect(() => {
    const urlRole = searchParams.get('role');
    if (urlRole && ['vendor', 'farmer', 'customer', 'admin'].includes(urlRole)) {
      const normalizedRole = urlRole === 'farmer' ? 'vendor' : urlRole;
      if (normalizedRole !== userRole) {
        setUserRoleState(normalizedRole);
      }
    }
  }, [searchParams]);

  const setUserRole = (newRole) => {
    const normalizedRole = newRole === 'farmer' ? 'vendor' : newRole;
    setUserRoleState(normalizedRole);
    localStorage.setItem('marketlink_user_role', normalizedRole);
    setSearchParams({ role: normalizedRole });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col font-sans">
      
      {/* Sidebar with role selection & navigation */}
      <DashboardSidebar 
        userRole={userRole} 
        setUserRole={setUserRole}
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-64 transition-all duration-200">
        
        {/* Topbar */}
        <DashboardTopbar 
          userRole={userRole} 
          setUserRole={setUserRole}
          setActiveTab={setActiveTab}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet context={{ userRole, setUserRole, activeTab, setActiveTab }} />
        </main>

        {/* Footer */}
        <DashboardFooter />

      </div>

    </div>
  );
};

export default DashboardLayout;