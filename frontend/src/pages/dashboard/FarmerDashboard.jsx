import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import AccountSettings from '../../components/AccountSettings';
import FarmerOverviewTab from '../../components/dashboard/FarmerOverviewTab';
import ManageProductsTab from '../../components/dashboard/ManageProductsTab';
import FarmerOrdersTab from '../../components/dashboard/FarmerOrdersTab';
import FarmerReviewsTab from '../../components/dashboard/FarmerReviewsTab';
import MarketStallTab from '../../components/dashboard/MarketStallTab';
import AddProductModal from '../../components/modals/AddProductModal';
import { Store } from 'lucide-react';

export default function FarmerDashboard({ activeTab = 'dashboard' }) {
  const {
    products,
    markets,
    orders,
    reviews,
    updateOrderStatus,
    addProduct,
    updateProduct,
    updateProductStock,
    deleteProduct
  } = useApp();

  const [userName, setUserName] = useState(
    () =>
      localStorage.getItem('marketlink_user_name') ||
      'Chaudhry Tariq Ahmed'
  );

  const [userEmail, setUserEmail] = useState(
    () =>
      localStorage.getItem('marketlink_user_email') ||
      'tariq@farm.com'
  );

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  React.useEffect(() => {
    const handleUpdate = () => {
      setUserName(
        localStorage.getItem('marketlink_user_name') ||
        'Chaudhry Tariq Ahmed'
      );

      setUserEmail(
        localStorage.getItem('marketlink_user_email') ||
        'tariq@farm.com'
      );
    };

    window.addEventListener('marketlink_user_updated', handleUpdate);

    return () => {
      window.removeEventListener(
        'marketlink_user_updated',
        handleUpdate
      );
    };
  }, []);

  const userProducts = products.filter((product) => {
    if (
      product.farmerEmail &&
      product.farmerEmail === userEmail
    ) {
      return true;
    }

    if (
      product.farmer &&
      product.farmer.toLowerCase().includes(userName.toLowerCase())
    ) {
      return true;
    }

    return false;
  });

  const farmerProducts =
    userProducts.length > 0 ? userProducts : products;

  const userOrders = orders.filter((order) => {
    if (
      order.farmerEmail &&
      order.farmerEmail === userEmail
    ) {
      return true;
    }

    if (
      order.farmer &&
      order.farmer.toLowerCase().includes(userName.toLowerCase())
    ) {
      return true;
    }

    return false;
  });

  const farmerOrders =
    userOrders.length > 0 ? userOrders : orders;

  const userReviews = reviews.filter((review) => {
    if (
      review.farmerEmail &&
      review.farmerEmail === userEmail
    ) {
      return true;
    }

    if (
      review.farmer &&
      review.farmer.toLowerCase().includes(userName.toLowerCase())
    ) {
      return true;
    }

    return false;
  });

  const farmerReviews =
    userReviews.length > 0 ? userReviews : reviews;

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (productData) => {
    if (!editingProduct) {
      return;
    }

    await updateProduct(editingProduct.id, productData);

    setEditingProduct(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* Farmer Portal Header */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-bold">
            <Store size={22} />
          </div>

          <div>
            <h1 className="text-xl font-extrabold text-gray-900">
              {userName}'s Farmer Portal
            </h1>

            <p className="text-xs text-gray-500">
              Stall #A4 • {farmerProducts.length} Listed Items •{' '}
              {farmerOrders.length} Incoming Pre-Orders
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={() => setShowAddProductModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs cursor-pointer"
        >
          + Add Produce Item
        </button>

      </div>

      {/* Dashboard */}
      {(activeTab === 'dashboard' || activeTab === 'overview') && (
        <FarmerOverviewTab
          products={farmerProducts}
          orders={farmerOrders}
          reviews={farmerReviews}
          onOpenAddProduct={() => setShowAddProductModal(true)}
          onUpdateOrderStatus={updateOrderStatus}
        />
      )}

      {/* Products */}
      {activeTab === 'products' && (
        <ManageProductsTab
          products={farmerProducts}
          onOpenAddProduct={() => setShowAddProductModal(true)}
          onUpdateStock={updateProductStock}
          onDeleteProduct={deleteProduct}
          onEditProduct={handleEditProduct}
        />
      )}

      {/* Orders */}
      {activeTab === 'orders' && (
        <FarmerOrdersTab
          orders={farmerOrders}
          onUpdateOrderStatus={updateOrderStatus}
        />
      )}

      {/* Reviews */}
      {activeTab === 'reviews' && (
        <FarmerReviewsTab reviews={farmerReviews} />
      )}

      {/* Market Stall */}
      {activeTab === 'stall' && (
        <MarketStallTab />
      )}

      {/* Settings */}
      {activeTab === 'settings' && (
        <AccountSettings userRole="vendor" />
      )}

      {/* Add Product */}
      {showAddProductModal && (
        <AddProductModal
          markets={markets}
          onSubmit={async (productData) => {
            await addProduct(productData);
            setShowAddProductModal(false);
          }}
          onClose={() => setShowAddProductModal(false)}
        />
      )}

      {/* Edit Product */}
      {editingProduct && (
        <AddProductModal
          markets={markets}
          product={editingProduct}
          onSubmit={handleUpdateProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}

    </div>
  );
}