import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import AccountSettings from '../../components/AccountSettings';
import AdminOverviewTab from '../../components/dashboard/AdminOverviewTab';
import FarmerApprovalsTab from '../../components/dashboard/FarmerApprovalsTab';
import ManageMarketsTab from '../../components/dashboard/ManageMarketsTab';
import ContentModerationTab from '../../components/dashboard/ContentModerationTab';
import PlatformReportsTab from '../../components/dashboard/PlatformReportsTab';
import AddFarmerModal from '../../components/modals/AddFarmerModal';
import EditFarmerModal from '../../components/modals/EditFarmerModal';
import AddMarketModal from '../../components/modals/AddMarketModal';
import EditMarketModal from '../../components/modals/EditMarketModal';
import { ShieldCheck } from 'lucide-react';

// Main Admin Panel container page
export default function AdminDashboard({ activeTab = 'dashboard' }) {
  const {
    farmers,
    markets,
    products,
    orders,
    reviews,
    approveFarmer,
    rejectFarmer,
    suspendFarmer,
    deleteFarmer,
    addFarmer,
    updateFarmer,
    addMarket,
    updateMarket,
    deleteMarket,
    deleteReview
  } = useApp();

  // Modal Visibility & Active Edit Item States
  const [showAddFarmerModal, setShowAddFarmerModal] = useState(false);
  const [showEditFarmerModal, setShowEditFarmerModal] = useState(false);
  const [showAddMarketModal, setShowAddMarketModal] = useState(false);
  const [showEditMarketModal, setShowEditMarketModal] = useState(false);

  const [editingFarmer, setEditingFarmer] = useState(null);
  const [editingMarket, setEditingMarket] = useState(null);

  const handleOpenEditFarmer = (farmer) => {
    setEditingFarmer(farmer);
    setShowEditFarmerModal(true);
  };

  const handleOpenEditMarket = (market) => {
    setEditingMarket(market);
    setShowEditMarketModal(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Admin Portal Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">MarketLink Administrator Control Panel</h1>
            <p className="text-xs text-gray-500">Supervising {farmers.length} Farmers • {markets.length} Regional Markets • {orders.length} Pre-Orders</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAddFarmerModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs cursor-pointer"
        >
          + Add New Farmer
        </button>
      </div>

      {/* Tab Component Views */}
      {(activeTab === 'dashboard' || activeTab === 'overview') && (
        <AdminOverviewTab
          farmers={farmers}
          markets={markets}
          products={products}
          orders={orders}
          reviews={reviews}
          onOpenAddFarmer={() => setShowAddFarmerModal(true)}
        />
      )}

      {activeTab === 'farmers' && (
        <FarmerApprovalsTab
          farmers={farmers}
          onApprove={approveFarmer}
          onReject={rejectFarmer}
          onSuspend={suspendFarmer}
          onDelete={deleteFarmer}
          onEdit={handleOpenEditFarmer}
          onOpenAdd={() => setShowAddFarmerModal(true)}
        />
      )}

      {activeTab === 'markets' && (
        <ManageMarketsTab
          markets={markets}
          onOpenAdd={() => setShowAddMarketModal(true)}
          onEdit={handleOpenEditMarket}
          onDelete={deleteMarket}
        />
      )}

      {activeTab === 'moderation' && (
        <ContentModerationTab
          reviews={reviews}
          onDeleteReview={deleteReview}
        />
      )}

      {activeTab === 'reports' && (
        <PlatformReportsTab
          farmers={farmers}
          markets={markets}
          orders={orders}
        />
      )}

      {activeTab === 'settings' && (
        <AccountSettings userRole="admin" />
      )}

      {/* Admin Modals */}
      {showAddFarmerModal && (
        <AddFarmerModal
          onSubmit={(data) => {
            addFarmer(data);
            setShowAddFarmerModal(false);
          }}
          onClose={() => setShowAddFarmerModal(false)}
        />
      )}

      {showEditFarmerModal && editingFarmer && (
        <EditFarmerModal
          farmer={editingFarmer}
          onSubmit={(id, data) => {
            updateFarmer(id, data);
            setShowEditFarmerModal(false);
            setEditingFarmer(null);
          }}
          onClose={() => {
            setShowEditFarmerModal(false);
            setEditingFarmer(null);
          }}
        />
      )}

      {showAddMarketModal && (
        <AddMarketModal
          onSubmit={(data) => {
            addMarket(data);
            setShowAddMarketModal(false);
          }}
          onClose={() => setShowAddMarketModal(false)}
        />
      )}

      {showEditMarketModal && editingMarket && (
        <EditMarketModal
          market={editingMarket}
          onSubmit={(id, data) => {
            updateMarket(id, data);
            setShowEditMarketModal(false);
            setEditingMarket(null);
          }}
          onClose={() => {
            setShowEditMarketModal(false);
            setEditingMarket(null);
          }}
        />
      )}

    </div>
  );
}
