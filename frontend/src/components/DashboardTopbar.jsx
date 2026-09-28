import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Menu, User, Settings, LogOut, Check, Globe, ShoppingBag, MapPin, ClipboardList, Sprout, X, Info, ArrowRight, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

/**
 * DashboardTopbar Component
 * Location: src/components/DashboardTopbar.jsx
 * Functionality: Global header bar with live search, dynamic notifications generator per role,
 * outside-click auto-close for dropdowns, and interactive notification detail popup modal.
 */
const DashboardTopbar = ({ onMenuToggle, userRole = 'vendor', setUserRole, setActiveTab }) => {
  const navigate = useNavigate();
  const { products = [], markets = [], farmers = [], orders = [], reviews = [] } = useApp();

  // Dropdown States
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [dismissedNotifIds, setDismissedNotifIds] = useState([]);

  // Notification Detail Modal State
  const [selectedNotificationDetail, setSelectedNotificationDetail] = useState(null);
  
  // Search state
  const [topbarSearchQuery, setTopbarSearchQuery] = useState('');

  // Refs for outside-click auto-close handlers
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  const [savedName, setSavedName] = useState(() => localStorage.getItem('marketlink_user_name'));
  const [savedEmail, setSavedEmail] = useState(() => localStorage.getItem('marketlink_user_email'));

  useEffect(() => {
    const handleUserUpdated = () => {
      setSavedName(localStorage.getItem('marketlink_user_name'));
      setSavedEmail(localStorage.getItem('marketlink_user_email'));
    };
    window.addEventListener('marketlink_user_updated', handleUserUpdated);
    return () => window.removeEventListener('marketlink_user_updated', handleUserUpdated);
  }, []);

  /**
   * Outside-Click Event Listener: Automatically closes notification & profile dropdowns
   * whenever user clicks anywhere outside their container element.
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const userName = savedName || (
    userRole === 'admin' ? 'System Admin' : 'Chaudhry Tariq Ahmed'
  );
  const userEmail = savedEmail || (
    userRole === 'admin' ? 'admin@marketlink.com' : 'tariq@farm.com'
  );

  const initials = userName
    ? userName.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'SM';

  /**
   * Dynamic Notifications Generator based on active userRole & real MongoDB data
   */
  const getDynamicNotifications = () => {
    const list = [];

    if (userRole === 'admin') {
      const pendingCount = farmers.filter(f => f.status === 'pending').length;
      if (pendingCount > 0) {
        list.push({
          id: 'admin-1',
          title: `${pendingCount} Pending Farmer Applications`,
          desc: 'Farmer stall registrations awaiting administrative verification and approval.',
          time: 'Just now',
          badge: 'bg-amber-100 text-amber-800',
          type: 'farmer_approval',
          targetTab: 'farmers'
        });
      }

      const flaggedCount = reviews.filter(r => r.rating <= 3).length;
      if (flaggedCount > 0) {
        list.push({
          id: 'admin-2',
          title: `${flaggedCount} Low Rating Customer Complaint(s)`,
          desc: 'Shopper feedback flagged for review in Content Moderation panel.',
          time: '10m ago',
          badge: 'bg-red-100 text-red-800',
          type: 'moderation',
          targetTab: 'moderation'
        });
      }

      list.push({
        id: 'admin-3',
        title: 'MongoDB Server Connected Successfully',
        desc: `Database active with ${orders.length} pre-orders & ${products.length} listed produce items.`,
        time: '1h ago',
        badge: 'bg-green-100 text-green-800',
        type: 'system',
        targetTab: 'dashboard'
      });
    } else if (userRole === 'customer') {
      orders.forEach((o, index) => {
        list.push({
          id: `cust-${o.id}`,
          title: `Pre-Order Pass #${o.id} (${o.status})`,
          desc: `${o.items} reserved with ${o.farmer} for pickup window (${o.pickupSlot}).`,
          time: index === 0 ? '5m ago' : '1h ago',
          badge: o.status === 'Ready for Pickup' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800',
          type: 'order_status',
          targetTab: 'orders',
          orderData: o
        });
      });

      if (list.length === 0) {
        list.push({
          id: 'cust-welcome',
          title: 'Welcome to MarketLink Shopper Portal!',
          desc: 'Explore seasonal harvest produce, reserve items, and collect at local farmers market stalls.',
          time: 'Today',
          badge: 'bg-gray-100 text-gray-800',
          type: 'welcome',
          targetTab: 'dashboard'
        });
      }
    } else {
      // Farmer Role
      const pendingOrders = orders.filter(o => o.status === 'Pending').length;
      if (pendingOrders > 0) {
        list.push({
          id: 'farm-1',
          title: `${pendingOrders} New Incoming Pre-Order(s)`,
          desc: 'Shoppers reserved harvest produce items for upcoming market stall pickup.',
          time: '2m ago',
          badge: 'bg-amber-100 text-amber-800',
          type: 'farmer_orders',
          targetTab: 'orders'
        });
      }

      orders.slice(0, 2).forEach((o) => {
        list.push({
          id: `farm-${o.id}`,
          title: `Pre-Order #${o.id} — ${o.customer}`,
          desc: `PKR ${o.total} payable in cash at Stall #A4 during pickup slot (${o.pickupSlot}).`,
          time: '15m ago',
          badge: 'bg-green-100 text-green-800',
          type: 'farmer_orders',
          targetTab: 'orders',
          orderData: o
        });
      });

      if (reviews.length > 0) {
        const rev = reviews[0];
        list.push({
          id: 'farm-rev',
          title: `New ${rev.rating}-Star Customer Feedback`,
          desc: `"${rev.comment.substring(0, 50)}..." by shopper ${rev.customer}.`,
          time: '1h ago',
          badge: 'bg-purple-100 text-purple-800',
          type: 'farmer_reviews',
          targetTab: 'reviews'
        });
      }
    }

    return list.filter(n => !dismissedNotifIds.includes(n.id));
  };

  const dynamicNotifications = getDynamicNotifications();

  const handleSignOut = () => {
    localStorage.removeItem('marketlink_user_role');
    localStorage.removeItem('marketlink_user_name');
    localStorage.removeItem('marketlink_user_email');
    navigate('/login');
  };

  // Live search filtering across products, markets, farmers, orders
  const searchResultsProducts = topbarSearchQuery.trim() ? products.filter(p => 
    p.name.toLowerCase().includes(topbarSearchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(topbarSearchQuery.toLowerCase()) ||
    p.farmer.toLowerCase().includes(topbarSearchQuery.toLowerCase())
  ).slice(0, 3) : [];

  const searchResultsMarkets = topbarSearchQuery.trim() ? markets.filter(m =>
    m.name.toLowerCase().includes(topbarSearchQuery.toLowerCase()) ||
    m.location.toLowerCase().includes(topbarSearchQuery.toLowerCase())
  ).slice(0, 3) : [];

  const searchResultsOrders = topbarSearchQuery.trim() ? orders.filter(o =>
    o.id.toLowerCase().includes(topbarSearchQuery.toLowerCase()) ||
    o.customer.toLowerCase().includes(topbarSearchQuery.toLowerCase()) ||
    o.farmer.toLowerCase().includes(topbarSearchQuery.toLowerCase())
  ).slice(0, 3) : [];

  const handleNotificationClick = (notif) => {
    setNotificationsOpen(false);
    setDismissedNotifIds((prev) => (prev.includes(notif.id) ? prev : [...prev, notif.id]));
    setSelectedNotificationDetail(notif);
  };

  const handleMarkAllRead = () => {
    const allIds = dynamicNotifications.map((n) => n.id);
    setDismissedNotifIds((prev) => [...prev, ...allIds]);
  };

  const handleNavigateToNotificationTarget = (targetTab) => {
    setSelectedNotificationDetail(null);
    if (setActiveTab && targetTab) {
      setActiveTab(targetTab);
    }
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-xs">
        
        {/* Left Side: Mobile Menu Button & Search Input */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button 
            type="button"
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
          >
            <Menu size={20} />
          </button>

          {/* Live Topbar Search Input */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input 
              type="text"
              value={topbarSearchQuery}
              onChange={(e) => setTopbarSearchQuery(e.target.value)}
              placeholder="Search produce, markets, orders, or farmers..."
              className="w-full text-xs pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white text-gray-900"
            />
            {topbarSearchQuery && (
              <button 
                type="button"
                onClick={() => setTopbarSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}

            {/* Live Floating Search Results Dropdown */}
            {topbarSearchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl p-3 z-50 text-xs space-y-3 max-h-80 overflow-y-auto animate-in fade-in duration-150">
                {searchResultsProducts.length === 0 && searchResultsMarkets.length === 0 && searchResultsOrders.length === 0 ? (
                  <p className="text-center text-gray-400 py-3">No matching results found for "{topbarSearchQuery}".</p>
                ) : (
                  <div className="space-y-3">
                    {searchResultsProducts.length > 0 && (
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                          Produce Items
                        </span>
                        {searchResultsProducts.map(p => (
                          <div 
                            key={p.id} 
                            className="p-2 hover:bg-gray-50 rounded-lg transition cursor-pointer flex items-center justify-between"
                            onClick={() => { setTopbarSearchQuery(''); navigate('/products'); }}
                          >
                            <span className="font-semibold text-gray-900">{p.name}</span>
                            <span className="text-green-700 font-bold">PKR {p.price} / {p.unit}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {searchResultsMarkets.length > 0 && (
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                          Farmers Markets
                        </span>
                        {searchResultsMarkets.map(m => (
                          <div 
                            key={m.id || m.name} 
                            className="p-2 hover:bg-gray-50 rounded-lg transition cursor-pointer flex items-center justify-between"
                            onClick={() => { setTopbarSearchQuery(''); navigate('/markets'); }}
                          >
                            <span className="font-semibold text-gray-900">{m.name}</span>
                            <span className="text-gray-500 text-[10px]">{m.location}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {searchResultsOrders.length > 0 && (
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                          Pre-Orders
                        </span>
                        {searchResultsOrders.map(o => (
                          <div 
                            key={o.id} 
                            className="p-2 hover:bg-gray-50 rounded-lg transition cursor-pointer"
                            onClick={() => { 
                              setTopbarSearchQuery(''); 
                              if (setActiveTab) setActiveTab('orders');
                            }}
                          >
                            <p className="font-bold text-gray-900">{o.id} — {o.farmer}</p>
                            <p className="text-[10px] text-gray-500">{o.items} • PKR {o.total}</p>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side Actions: Notifications & Profile */}
        <div className="flex items-center gap-3">
          
          {/* Dynamic Notifications Dropdown (With Outside-Click Auto-Close Ref) */}
          <div className="relative" ref={notificationsRef}>
            <button 
              type="button"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                setProfileOpen(false);
              }}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative cursor-pointer"
              aria-label="Notifications"
            >
              <Bell size={18} />
              {dynamicNotifications.length > 0 && (
                <span className="absolute top-1 right-1 bg-green-600 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {dynamicNotifications.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Container */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in duration-150 text-xs space-y-1">
                <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-900">
                    Live Notifications ({dynamicNotifications.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleMarkAllRead}
                    className="text-[11px] text-green-700 font-bold hover:underline cursor-pointer"
                  >
                    Mark read
                  </button>
                </div>

                <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto text-xs">
                  {dynamicNotifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-400">
                      No active notifications right now.
                    </div>
                  ) : (
                    dynamicNotifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        onClick={() => handleNotificationClick(notif)}
                        className="p-3 hover:bg-green-50/50 cursor-pointer space-y-1 transition group"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-bold text-gray-900 group-hover:text-green-700 leading-tight">
                            {notif.title}
                          </p>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 uppercase ${notif.badge}`}>
                            {notif.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-600 leading-snug line-clamp-2">{notif.desc}</p>
                        <span className="text-[10px] text-green-700 font-semibold inline-flex items-center gap-1 pt-0.5">
                          <span>View Full Details</span>
                          <ArrowRight size={10} />
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu (With Outside-Click Auto-Close Ref) */}
          <div className="relative" ref={profileRef}>
            <button 
              type="button"
              onClick={() => {
                setProfileOpen(!profileOpen);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-green-600 text-white font-semibold flex items-center justify-center text-xs shadow-xs">
                {initials}
              </div>
              <div className="hidden sm:block">
                <span className="text-xs font-semibold text-gray-800 block leading-tight">{userName}</span>
                <span className="text-[10px] text-gray-500 capitalize">{userRole === 'vendor' ? 'Farmer' : userRole} Account</span>
              </div>
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50 text-xs">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="font-semibold text-gray-800">{userName}</p>
                  <p className="text-[10px] text-gray-500">{userEmail}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (setActiveTab) setActiveTab('settings');
                    setProfileOpen(false);
                  }}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700 cursor-pointer"
                >
                  <Settings size={14} className="text-gray-400" />
                  <span>Account Credentials</span>
                </button>
                <Link 
                  to="/" 
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-green-700"
                >
                  <Globe size={14} className="text-gray-400" />
                  <span>Public Website</span>
                </Link>
                <div className="border-t border-gray-100"></div>
                <button 
                  type="button"
                  onClick={handleSignOut}
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 font-medium cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

        </div>

      </header>

      {/* NOTIFICATION DETAIL POPUP MODAL */}
      {selectedNotificationDetail && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-gray-200 space-y-4 text-xs">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-bold">
                  <Bell size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-gray-900">Notification Detail</h3>
                  <p className="text-[10px] text-gray-500">Live MarketLink Platform Alert</p>
                </div>
              </div>

              <button 
                type="button" 
                onClick={() => setSelectedNotificationDetail(null)} 
                className="text-gray-400 hover:text-gray-700 p-1.5 rounded-xl hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Notification Content Box */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${selectedNotificationDetail.badge}`}>
                  {selectedNotificationDetail.time}
                </span>
                <span className="text-[10px] font-semibold text-gray-400 capitalize">
                  {userRole} Account Notice
                </span>
              </div>

              <h4 className="text-sm font-bold text-gray-900">
                {selectedNotificationDetail.title}
              </h4>

              <p className="text-xs text-gray-700 leading-relaxed">
                {selectedNotificationDetail.desc}
              </p>

              {/* Order payload details if available */}
              {selectedNotificationDetail.orderData && (
                <div className="p-3 bg-white rounded-xl border border-gray-200 space-y-1 text-[11px] text-gray-800">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-semibold">Ticket Pass ID:</span>
                    <span className="font-mono font-bold text-green-700">{selectedNotificationDetail.orderData.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-semibold">Pickup Slot:</span>
                    <span className="font-bold text-gray-900">{selectedNotificationDetail.orderData.pickupSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-semibold">Stall Location:</span>
                    <span className="font-bold text-gray-900">{selectedNotificationDetail.orderData.market || 'Lahore Central Market'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Actions Footer */}
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setSelectedNotificationDetail(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium"
              >
                Close Notice
              </button>

              {selectedNotificationDetail.targetTab && (
                <button
                  type="button"
                  onClick={() => handleNavigateToNotificationTarget(selectedNotificationDetail.targetTab)}
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Go to Section</span>
                  <ArrowRight size={14} />
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default DashboardTopbar;