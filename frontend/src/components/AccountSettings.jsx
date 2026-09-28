import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Store, 
  MapPin, 
  ShieldCheck, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Save, 
  Key, 
  RefreshCw
} from 'lucide-react';

/**
 * AccountSettings Component
 * Description: Enables Farmers, Customers, and System Admins to manage their profile credentials,
 * contact details, and account security passwords.
 * Location: src/components/AccountSettings.jsx
 * Usage: Embedded dynamically inside AdminDashboard, FarmerDashboard, and CustomerDashboard.
 */
export default function AccountSettings({ userRole = 'vendor' }) {
  
  /**
   * Helper function: Returns default demo profile values based on active user role.
   * Used for initial form population and demo reset functionality.
   */
  const getRoleDefaults = () => {
    switch (userRole) {
      case 'admin':
        return {
          name: 'System Admin',
          email: 'admin@marketlink.com',
          phone: '0300-0000000',
          farm: 'MarketLink Central Admin',
          location: 'Headquarters, Lahore',
          roleTitle: 'Platform Administrator'
        };
      case 'customer':
        return {
          name: 'Ali Khan',
          email: 'ali@buyer.com',
          phone: '0312-3456789',
          farm: 'Regular Shopper',
          location: 'Gulberg III, Lahore',
          roleTitle: 'Verified Shopper Customer'
        };
      case 'vendor':
      default:
        return {
          name: 'Chaudhry Tariq Ahmed',
          email: 'tariq@farm.com',
          phone: '0301-5551234',
          farm: 'Tariq Organic Farms',
          location: 'Raiwind Road, Lahore',
          roleTitle: 'Verified Farmer & Vendor'
        };
    }
  };

  const defaults = getRoleDefaults();

  // State hooks for profile credentials loaded from browser storage or defaults
  const [fullName, setFullName] = useState(() => localStorage.getItem('marketlink_user_name') || defaults.name);
  const [email, setEmail] = useState(() => localStorage.getItem('marketlink_user_email') || defaults.email);
  const [phone, setPhone] = useState(() => localStorage.getItem('marketlink_user_phone') || defaults.phone);
  const [farmName, setFarmName] = useState(() => localStorage.getItem('marketlink_user_farm') || defaults.farm);
  const [location, setLocation] = useState(() => localStorage.getItem('marketlink_user_location') || defaults.location);

  // Password change form states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password visibility toggle states
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Status feedback and loader states
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate initials for the user profile avatar badge
  const initials = fullName
    ? fullName.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'ML';

  /**
   * Submit Handler: Validates input fields and saves updated credentials into localStorage.
   * Dispatches a global event so Topbar and Sidebar update their display live without page refresh.
   */
  const handleSaveCredentials = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Validation Check: Name
    if (!fullName.trim()) {
      setErrorMessage('Full name is required.');
      return;
    }

    // Validation Check: Email format
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email / Gmail address (e.g. user@gmail.com).');
      return;
    }

    // Validation Check: Phone number
    if (!phone.trim()) {
      setErrorMessage('Phone number is required.');
      return;
    }

    // Password authorization check if user attempts to change password
    if (newPassword || confirmPassword || currentPassword) {
      if (!currentPassword) {
        setErrorMessage('Please enter your current password to authorize password update.');
        return;
      }
      if (newPassword.length < 6) {
        setErrorMessage('New password must be at least 6 characters long.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setErrorMessage('New password and confirm password do not match.');
        return;
      }
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Save credentials into browser storage
      localStorage.setItem('marketlink_user_name', fullName.trim());
      localStorage.setItem('marketlink_user_email', email.trim());
      localStorage.setItem('marketlink_user_phone', phone.trim());
      localStorage.setItem('marketlink_user_farm', farmName.trim());
      localStorage.setItem('marketlink_user_location', location.trim());

      if (newPassword) {
        localStorage.setItem('marketlink_user_password', newPassword);
      }

      // Trigger custom window event for real-time topbar/sidebar header sync
      window.dispatchEvent(new Event('marketlink_user_updated'));

      setIsSubmitting(false);
      setSuccessMessage('Account credentials and profile settings updated successfully!');

      // Clear sensitive password input fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      // Automatically hide success notification after 4 seconds
      setTimeout(() => setSuccessMessage(''), 4000);
    }, 400);
  };

  /**
   * Reset Handler: Restores profile fields back to demo initial values.
   */
  const handleResetDefaults = () => {
    setFullName(defaults.name);
    setEmail(defaults.email);
    setPhone(defaults.phone);
    setFarmName(defaults.farm);
    setLocation(defaults.location);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMessage('');
    setSuccessMessage('Profile reset to default demo values.');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Profile Overview Card Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-600 text-white font-bold text-xl flex items-center justify-center shadow-xs">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">{fullName}</h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                <ShieldCheck size={13} />
                {defaults.roleTitle}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
              <span>Gmail: <strong className="text-gray-700">{email}</strong></span>
              <span>•</span>
              <span>Phone: <strong className="text-gray-700">{phone}</strong></span>
            </p>
          </div>
        </div>

        {/* Reset Button */}
        <button
          type="button"
          onClick={handleResetDefaults}
          className="text-xs text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg font-medium flex items-center gap-1.5 transition cursor-pointer"
        >
          <RefreshCw size={14} />
          Reset Demo Defaults
        </button>
      </div>

      {/* System Alert Banners */}
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-800 text-sm font-medium">
          <CheckCircle className="text-green-600 shrink-0" size={20} />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-800 text-sm font-medium">
          <AlertCircle className="text-red-600 shrink-0" size={20} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form Section */}
      <form onSubmit={handleSaveCredentials} className="space-y-6">
        
        {/* Profile & Contact Details Section */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
          <div className="border-b border-gray-100 pb-3 flex items-center gap-2">
            <User className="text-green-600" size={20} />
            <h2 className="text-base font-bold text-gray-900">Personal Credentials & Contact Info</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Full Name / Account Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white text-gray-900 font-medium"
                />
              </div>
            </div>

            {/* Email / Gmail Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address / Gmail *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@gmail.com"
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white text-gray-900 font-medium"
                />
              </div>
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Phone size={16} />
                </div>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0300-1234567"
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white text-gray-900 font-medium"
                />
              </div>
            </div>

            {/* Farm / Business Name Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {userRole === 'vendor' ? 'Farm / Stall Name' : 'Business / Organization'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Store size={16} />
                </div>
                <input
                  type="text"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  placeholder="Enter farm name"
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white text-gray-900 font-medium"
                />
              </div>
            </div>

            {/* Location Input */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Primary City & Market Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <MapPin size={16} />
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, District, or Stall Location"
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white text-gray-900 font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security & Change Password Section */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
          <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="text-green-600" size={20} />
              <h2 className="text-base font-bold text-gray-900">Security & Password Credentials</h2>
            </div>
            <span className="text-[11px] text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
              Optional (Leave blank if keeping existing password)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Current Password Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={16} />
                </div>
                <input
                  type={showCurrentPass ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current password"
                  className="w-full text-xs pl-9 pr-9 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white text-gray-900 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* New Password Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={16} />
                </div>
                <input
                  type={showNewPass ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full text-xs pl-9 pr-9 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white text-gray-900 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showNewPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm New Password Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={16} />
                </div>
                <input
                  type={showConfirmPass ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full text-xs pl-9 pr-9 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white text-gray-900 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Actions Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save & Update Credentials</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
