import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sprout, Menu, X, ShoppingBag, ArrowRight, LogIn, LayoutDashboard, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState('');

  // Sync authentication state from localStorage whenever route or location changes
  const syncAuth = () => {
    const savedRole = localStorage.getItem('marketlink_user_role');
    const savedName = localStorage.getItem('marketlink_user_name');
    if (savedRole) {
      const normalizedRole = savedRole === 'farmer' ? 'vendor' : savedRole;
      setUserRole(normalizedRole);
      setUserName(savedName || (normalizedRole === 'admin' ? 'System Admin' : 'User'));
    } else {
      setUserRole(null);
      setUserName('');
    }
  };

  useEffect(() => {
    syncAuth();
    const handleUserUpdated = () => syncAuth();
    window.addEventListener('marketlink_user_updated', handleUserUpdated);
    return () => window.removeEventListener('marketlink_user_updated', handleUserUpdated);
  }, [location.pathname]);

  const handleSignOut = () => {
    localStorage.removeItem('marketlink_user_role');
    localStorage.removeItem('marketlink_user_name');
    localStorage.removeItem('marketlink_user_email');
    setUserRole(null);
    setUserName('');
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const getDashboardLabel = () => {
    if (userRole === 'admin') return 'Admin Dashboard';
    if (userRole === 'vendor') return 'Farmer Dashboard';
    if (userRole === 'customer') return 'Customer Dashboard';
    return 'Go to Dashboard';
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Platform Name */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center text-white shadow-xs">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-1">
                Market<span className="text-green-600">Link</span>
              </div>
              <p className="text-xs text-gray-500 font-medium -mt-1">
                eGreen Basket Initiative
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                isActive('/')
                  ? 'text-green-700 bg-green-50 border border-green-200'
                  : 'text-gray-600 hover:text-green-700 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>

            <Link
              to="/markets"
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                isActive('/markets')
                  ? 'text-green-700 bg-green-50 border border-green-200'
                  : 'text-gray-600 hover:text-green-700 hover:bg-gray-50'
              }`}
            >
              Farmers Markets
            </Link>

            <Link
              to="/products"
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                isActive('/products')
                  ? 'text-green-700 bg-green-50 border border-green-200'
                  : 'text-gray-600 hover:text-green-700 hover:bg-gray-50'
              }`}
            >
              Produce Catalog
            </Link>

            <Link
              to="/about"
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                isActive('/about')
                  ? 'text-green-700 bg-green-50 border border-green-200'
                  : 'text-gray-600 hover:text-green-700 hover:bg-gray-50'
              }`}
            >
              About Project
            </Link>
          </nav>

          {/* Action Buttons (Dynamic based on Auth State) */}
          <div className="hidden md:flex items-center gap-3">
            {userRole ? (
              <>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-xl text-xs font-semibold text-gray-700">
                  <User className="w-3.5 h-3.5 text-green-600" />
                  <span className="truncate max-w-[120px]">{userName}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-100 text-green-800 uppercase font-bold">
                    {userRole === 'vendor' ? 'Farmer' : userRole}
                  </span>
                </div>

                <Link
                  to={`/dashboard/home?role=${userRole}`}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{getDashboardLabel()}</span>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-red-600 px-3 py-2 rounded-xl border border-gray-200 hover:border-red-200 hover:bg-red-50 transition cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-green-700 px-3.5 py-2 rounded-xl border border-gray-200 hover:border-gray-300 transition"
                >
                  <LogIn className="w-3.5 h-3.5 text-green-600" />
                  <span>Log In</span>
                </Link>

                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Pre-Order Fresh</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700"
          >
            Home
          </Link>

          <Link
            to="/markets"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700"
          >
            Farmers Markets
          </Link>

          <Link
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700"
          >
            Produce Catalog
          </Link>

          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700"
          >
            About Project
          </Link>

          <div className="pt-4 border-t border-gray-200 space-y-2">
            {userRole ? (
              <>
                <div className="px-3 py-2 bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 flex items-center justify-between">
                  <span>Logged in as: <strong>{userName}</strong></span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-green-100 text-green-800 uppercase font-bold">
                    {userRole === 'vendor' ? 'Farmer' : userRole}
                  </span>
                </div>

                <Link
                  to={`/dashboard/home?role=${userRole}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-green-600 text-xs font-bold text-white hover:bg-green-700 shadow-xs"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{getDashboardLabel()}</span>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-red-200 text-xs font-bold text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full block text-center py-2.5 px-4 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50"
                >
                  Log In
                </Link>

                <Link
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-green-600 text-xs font-bold text-white hover:bg-green-700"
                >
                  <span>Pre-Order Fresh</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}