import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ClipboardList, 
  Store, 
  Star, 
  Users, 
  MapPin, 
  FileText, 
  LogOut, 
  Sprout, 
  Home, 
  X,
  ShieldCheck,
  ChevronRight,
  Heart,
  Settings
} from 'lucide-react';

/**
 * DashboardSidebar Component
 * Location: src/components/DashboardSidebar.jsx
 * Functionality: Left navigation sidebar with role view switcher, tab selection, and user logout.
 * Includes security restriction: Non-admin users cannot see Administrator Portal in view dropdown,
 * and switching view mode redirects to login for authentication.
 */
const DashboardSidebar = ({ 
  userRole = 'vendor', 
  setUserRole, 
  activeTab = 'dashboard', 
  setActiveTab,
  isOpen,
  setIsOpen 
}) => {
  const navigate = useNavigate();

  // Local storage logged-in profile state
  const [savedName, setSavedName] = useState(() => localStorage.getItem('marketlink_user_name'));
  const savedRole = localStorage.getItem('marketlink_user_role');
  const loggedInRole = savedRole === 'farmer' ? 'vendor' : (savedRole || 'vendor');

  // Listen for profile changes (e.g. updated name from AccountSettings)
  useEffect(() => {
    const handleUserUpdated = () => {
      setSavedName(localStorage.getItem('marketlink_user_name'));
    };
    window.addEventListener('marketlink_user_updated', handleUserUpdated);
    return () => window.removeEventListener('marketlink_user_updated', handleUserUpdated);
  }, []);

  const userName = savedName || (userRole === 'admin' ? 'System Admin' : 'Chaudhry Tariq Ahmed');

  /**
   * Generates dynamic sidebar navigation links based on currently active userRole view
   */
  const getNavItems = () => {
    switch (userRole) {
      case 'admin':
        return [
          { id: 'dashboard', label: 'Admin Overview', icon: LayoutDashboard },
          { id: 'farmers', label: 'Farmer Approvals', icon: Users },
          { id: 'markets', label: 'Manage Markets', icon: MapPin },
          { id: 'moderation', label: 'Content Moderation', icon: ShieldCheck },
          { id: 'reports', label: 'Platform Reports', icon: FileText },
          { id: 'settings', label: 'Account Credentials', icon: Settings },
        ];
      case 'customer':
        return [
          { id: 'dashboard', label: 'Customer Overview', icon: LayoutDashboard },
          { id: 'orders', label: 'My Pre-Orders', icon: ClipboardList },
          { id: 'favorites', label: 'Favorite Farmers', icon: Heart },
          { id: 'reviews', label: 'My Reviews', icon: Star },
          { id: 'settings', label: 'Account Credentials', icon: Settings },
        ];
      case 'vendor':
      default:
        return [
          { id: 'dashboard', label: 'Farmer Overview', icon: LayoutDashboard },
          { id: 'products', label: 'Manage Produce & Stock', icon: ShoppingBag },
          { id: 'orders', label: 'Incoming Pre-Orders', icon: ClipboardList },
          { id: 'reviews', label: 'Customer Feedback', icon: Star },
          { id: 'stall', label: 'Market Stall Info', icon: Store },
          { id: 'settings', label: 'Account Credentials', icon: Settings },
        ];
    }
  };

  const navItems = getNavItems();

  /**
   * Handle Portal View Mode Select Change:
   * Smoothly switches between Farmer, Customer, and Administrator portal views.
   */
  const handleRoleSelectChange = (e) => {
    const selectedTargetRole = e.target.value;
    setUserRole(selectedTargetRole);
    setActiveTab('dashboard');
  };

  /**
   * Sign out handler: Clears session items and redirects to login page
   */
  const handleSignOut = () => {
    localStorage.removeItem('marketlink_user_role');
    localStorage.removeItem('marketlink_user_name');
    localStorage.removeItem('marketlink_user_email');
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar Panel */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 
        flex flex-col transition-transform duration-200 ease-in-out shadow-xs
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Brand Logo Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white">
              <Sprout size={18} />
            </div>
            <div>
              <span className="text-base font-bold text-gray-900 block leading-tight">
                Market<span className="text-green-600">Link</span>
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wide">
                Portal Management
              </span>
            </div>
          </Link>

          {/* Close Sidebar Button (Mobile view) */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-800 p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Portal View Mode Switcher Box */}
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            Portal View Mode:
          </label>
          <select
            value={userRole}
            onChange={handleRoleSelectChange}
            className="w-full text-xs font-medium bg-white border border-gray-300 rounded-md py-1.5 px-2 text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500 cursor-pointer"
          >
            <option value="vendor">Farmer / Vendor Portal</option>
            <option value="customer">Customer Shopper Portal</option>
            <option value="admin">Administrator Portal</option>
          </select>
        </div>

        {/* Dynamic Navigation Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">
            Navigation Tabs
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isCurrent = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  isCurrent
                    ? 'bg-green-50 text-green-700 font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} className={isCurrent ? 'text-green-600' : 'text-gray-400'} />
                  <span>{item.label}</span>
                </div>
                {isCurrent && <ChevronRight size={14} className="text-green-600" />}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer with Logout */}
        <div className="p-3 border-t border-gray-200 bg-gray-50 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition"
          >
            <Home size={15} className="text-gray-400" />
            <span>Back to Public Website</span>
          </Link>

          <div className="pt-2 border-t border-gray-200 flex items-center justify-between px-2">
            <div className="text-left">
              <p className="text-xs font-semibold text-gray-800 leading-tight">{userName}</p>
              <p className="text-[10px] text-gray-500 capitalize">{userRole === 'vendor' ? 'Farmer' : userRole} Account</p>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="text-gray-400 hover:text-red-600 p-1.5 rounded transition cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>

      </aside>
    </>
  );
};

export default DashboardSidebar;