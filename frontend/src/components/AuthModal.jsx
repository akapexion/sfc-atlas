import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Mail,
  Lock,
  User,
  Phone,
  Sprout,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * AuthModal Component
 * Location: src/components/AuthModal.jsx
 * Functionality: Lightweight inline login/register modal triggered when a guest user
 * tries to pre-order a product. Keeps the user on the same page after authentication.
 *
 * Props:
 *   initialMode  - 'login' | 'register'  (defaults to 'login')
 *   onClose      - called when user dismisses the modal
 *   onSuccess    - called after successful authentication (user continues their action)
 *   productName  - optional product name to show context ("Sign in to pre-order X")
 */
export default function AuthModal({ initialMode = 'login', onClose, onSuccess, productName }) {
  const navigate = useNavigate();

  const [mode, setMode] = useState(initialMode);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  // States
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setErrors({});
    setServerError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email (e.g. name@domain.com)';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (mode === 'register') {
      if (!fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^[0-9\-+\s()]{10,15}$/.test(phone)) {
        newErrors.phone = 'Enter a valid phone number (e.g. 0300-1234567)';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validateForm()) return;

    setIsLoading(true);

    const emailPrefix = email.split('@')[0];
    const derivedName = emailPrefix
      ? emailPrefix.replace(/[._-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
      : 'User';
    const submittedName = fullName.trim() || derivedName;

    try {
      const endpoint =
        mode === 'login'
          ? `${API_BASE_URL}/users/login`
          : `${API_BASE_URL}/users/register`;

      const payload =
        mode === 'login'
          ? { email, password }
          : { name: submittedName, email, password, role: 'customer', phone };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      const resolvedRole = data.user?.role || 'customer';
      const finalUserName = data.user?.name || submittedName;

      localStorage.setItem('marketlink_user_role', resolvedRole === 'farmer' ? 'vendor' : resolvedRole);
      localStorage.setItem('marketlink_user_email', email);
      localStorage.setItem('marketlink_user_name', finalUserName);
      window.dispatchEvent(new Event('marketlink_user_updated'));

      setIsLoading(false);
      setFormSuccess(true);

      setTimeout(() => {
        onSuccess?.();
      }, 700);
    } catch (err) {
      // Demo fallback
      console.log('Auth modal demo fallback:', err.message);
      localStorage.setItem('marketlink_user_role', 'customer');
      localStorage.setItem('marketlink_user_email', email);
      localStorage.setItem('marketlink_user_name', submittedName);
      window.dispatchEvent(new Event('marketlink_user_updated'));

      setIsLoading(false);
      setFormSuccess(true);
      setTimeout(() => {
        onSuccess?.();
      }, 700);
    }
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-green-600 flex items-center justify-center text-white">
              <ShoppingBag size={16} />
            </div>
            <span className="text-lg font-extrabold text-gray-900 tracking-tight">
              Market<span className="text-green-600">Link</span>
            </span>
          </div>
          <h2 className="text-sm font-bold text-gray-800 mt-2">
            {mode === 'login' ? 'Sign in to continue' : 'Create a customer account'}
          </h2>
          {productName && (
            <p className="text-xs text-gray-500 mt-0.5">
              to pre-order <span className="font-semibold text-gray-700">{productName}</span>
            </p>
          )}
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-gray-50 border-b border-gray-100 text-xs font-bold">
          <button
            type="button"
            onClick={() => switchMode('login')}
            className={`flex-1 py-3 transition ${
              mode === 'login'
                ? 'text-green-700 border-b-2 border-green-600 bg-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => switchMode('register')}
            className={`flex-1 py-3 transition ${
              mode === 'register'
                ? 'text-green-700 border-b-2 border-green-600 bg-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            New Account
          </button>
        </div>

        {/* Form Body */}
        <div className="px-6 py-5">

          {/* Server Error */}
          {serverError && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 font-medium border border-red-200">
              <AlertCircle size={15} className="text-red-600 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Success */}
          {formSuccess && (
            <div className="mb-4 p-3 bg-green-50 text-green-800 text-xs rounded-xl flex items-center gap-2 font-medium border border-green-200">
              <CheckCircle2 size={15} className="text-green-700 shrink-0" />
              <span>Signed in! Opening your pre-order...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">

            {/* Full Name (Register only) */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <User size={12} className="text-gray-400" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => { setFullName(e.target.value); if (errors.fullName) setErrors({ ...errors, fullName: null }); }}
                  placeholder="e.g. Salman Khan"
                  className={`w-full text-xs px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 ${
                    errors.fullName
                      ? 'border-red-400 focus:ring-red-400 bg-red-50/30'
                      : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                    <AlertCircle size={11} />{errors.fullName}
                  </p>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <Mail size={12} className="text-gray-400" />
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: null }); }}
                placeholder="salman@example.com"
                autoComplete="email"
                className={`w-full text-xs px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-400 focus:ring-red-400 bg-red-50/30'
                    : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                  <AlertCircle size={11} />{errors.email}
                </p>
              )}
            </div>

            {/* Phone (Register only) */}
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <Phone size={12} className="text-gray-400" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); if (errors.phone) setErrors({ ...errors, phone: null }); }}
                  placeholder="0300-1234567"
                  className={`w-full text-xs px-3.5 py-2.5 border rounded-xl focus:outline-none focus:ring-2 ${
                    errors.phone
                      ? 'border-red-400 focus:ring-red-400 bg-red-50/30'
                      : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                    <AlertCircle size={11} />{errors.phone}
                  </p>
                )}
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <Lock size={12} className="text-gray-400" />
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors({ ...errors, password: null }); }}
                  placeholder="••••••••"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  className={`w-full text-xs px-3.5 py-2.5 pr-10 border rounded-xl focus:outline-none focus:ring-2 ${
                    errors.password
                      ? 'border-red-400 focus:ring-red-400 bg-red-50/30'
                      : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-[11px] text-red-600 flex items-center gap-1">
                  <AlertCircle size={11} />{errors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || formSuccess}
              className="w-full mt-1 py-2.5 px-4 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Sign In & Continue' : 'Register & Continue'}</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Footer link */}
          <p className="mt-4 text-center text-[11px] text-gray-400">
            Want a Farmer account?{' '}
            <a
              href="/login?mode=register"
              className="text-green-700 font-semibold hover:underline"
              onClick={(e) => { e.preventDefault(); onClose(); navigate('/login?mode=register'); }}
            >
              Full registration page →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
