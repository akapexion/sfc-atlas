import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import AccountSettings from '../../components/AccountSettings';
import CustomerOverviewTab from '../../components/dashboard/CustomerOverviewTab';
import CustomerOrdersTab from '../../components/dashboard/CustomerOrdersTab';
import FavoriteFarmersTab from '../../components/dashboard/FavoriteFarmersTab';
import CustomerReviewsTab from '../../components/dashboard/CustomerReviewsTab';
import DigitalTicketModal from '../../components/modals/DigitalTicketModal';
import WriteReviewModal from '../../components/modals/WriteReviewModal';
import { ShoppingBag } from 'lucide-react';

// Customer shopper portal dashboard router
export default function CustomerDashboard({ activeTab = 'dashboard' }) {
  const {
    orders,
    reviews,
    products = [],
    farmers = [],
    addReview
  } = useApp();

  const [userName, setUserName] = useState(() => localStorage.getItem('marketlink_user_name') || 'Ali Khan');
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('marketlink_user_email') || 'ali@buyer.com');

  React.useEffect(() => {
    const handleUpdate = () => {
      setUserName(localStorage.getItem('marketlink_user_name') || 'Ali Khan');
      setUserEmail(localStorage.getItem('marketlink_user_email') || 'ali@buyer.com');
    };
    window.addEventListener('marketlink_user_updated', handleUpdate);
    return () => window.removeEventListener('marketlink_user_updated', handleUpdate);
  }, []);

  // Dynamic User-Specific Data Filtering for Customer with static fallback for presentation
  const userOrders = orders.filter(o => {
    if (o.customerEmail && o.customerEmail === userEmail) return true;
    if (o.customer && o.customer.toLowerCase().includes(userName.toLowerCase())) return true;
    return false;
  });
  const customerOrders = userOrders.length > 0 ? userOrders : orders;

  const userReviews = reviews.filter(r => {
    if (r.customerEmail && r.customerEmail === userEmail) return true;
    if (r.customer && r.customer.toLowerCase().includes(userName.toLowerCase())) return true;
    return false;
  });
  const customerReviews = userReviews.length > 0 ? userReviews : reviews;

  // Modal States
  const [selectedOrderForTicket, setSelectedOrderForTicket] = useState(null);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Customer Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <ShoppingBag size={22} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">MarketLink Customer Shopper Portal</h1>
            <p className="text-xs text-gray-500">Welcome, <strong>{userName}</strong> • {customerOrders.length} Total Pre-Order Tickets</p>
          </div>
        </div>
      </div>

      {/* Tab Component Views */}
      {(activeTab === 'dashboard' || activeTab === 'overview') && (
        <CustomerOverviewTab
          orders={customerOrders}
          products={products}
          farmers={farmers}
          onOpenTicket={(order) => setSelectedOrderForTicket(order)}
        />
      )}

      {activeTab === 'orders' && (
        <CustomerOrdersTab
          orders={customerOrders}
          onOpenTicket={(order) => setSelectedOrderForTicket(order)}
        />
      )}

      {activeTab === 'favorites' && (
        <FavoriteFarmersTab farmers={farmers} />
      )}

      {activeTab === 'reviews' && (
        <CustomerReviewsTab
          reviews={customerReviews}
          onOpenWriteReview={() => setShowAddReviewModal(true)}
        />
      )}

      {activeTab === 'settings' && (
        <AccountSettings userRole="customer" />
      )}

      {/* Customer Modals */}
      {selectedOrderForTicket && (
        <DigitalTicketModal
          order={selectedOrderForTicket}
          userName={userName}
          onClose={() => setSelectedOrderForTicket(null)}
        />
      )}

      {showAddReviewModal && (
        <WriteReviewModal
          farmers={farmers}
          userName={userName}
          onSubmit={(reviewData) => {
            addReview(reviewData);
            setShowAddReviewModal(false);
          }}
          onClose={() => setShowAddReviewModal(false)}
        />
      )}

    </div>
  );
}
