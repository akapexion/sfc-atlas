import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS_DATA, MARKETS_DATA } from '../data/mockData';
import ToastNotification from '../components/ToastNotification';

// Global state context for products, markets, pre-orders, and user accounts
const AppContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const AppProvider = ({ children }) => {
  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (title, message, type = 'success') => {
    setToast({ title, message, type });
  };

  const clearToast = () => {
    setToast(null);
  };

  // Products State with persistent localStorage fallback
  const [products, setProducts] = useState(() => {
    const local = localStorage.getItem('marketlink_custom_products');

    if (local) {
      try {
        const parsed = JSON.parse(local);

        if (Array.isArray(parsed) && parsed.length > 0) {
          const combined = [...parsed];

          PRODUCTS_DATA.forEach(p => {
            if (!combined.some(c => c.id === p.id || c.name === p.name)) {
              combined.push(p);
            }
          });

          return combined;
        }
      } catch (e) {
        console.error('Error parsing custom products:', e);
      }
    }

    return PRODUCTS_DATA;
  });

  // Markets State
  const [markets, setMarkets] = useState(MARKETS_DATA);

  // Farmers List State
  const [farmers, setFarmers] = useState([
    {
      id: 'FARM-101',
      name: 'Chaudhry Tariq Ahmed',
      email: 'tariq@farm.com',
      phone: '0301-5551234',
      farmName: 'Sargodha Citrus & Vegetable Farms',
      farmLocation: 'Sargodha, Punjab',
      status: 'approved',
      verified: true,
      rating: 4.9
    },
    {
      id: 'FARM-102',
      name: 'Ghulam Rasool',
      email: 'ghulam@farm.com',
      phone: '0302-8884321',
      farmName: 'Green Valley Organic Produce',
      farmLocation: 'Sahiwal, Punjab',
      status: 'approved',
      verified: true,
      rating: 4.8
    },
    {
      id: 'FARM-103',
      name: 'Zainab Bibi',
      email: 'zainab@farm.com',
      phone: '0303-7779988',
      farmName: 'KP Dairy & Honey Farm',
      farmLocation: 'Mardan, KP',
      status: 'pending',
      verified: false,
      rating: 4.7
    }
  ]);

  // Dynamic Orders State
  const [orders, setOrders] = useState([
    {
      id: 'ORD-1001',
      dbId: '65e1234567890abcdef1001',
      customer: 'Ali Khan',
      phone: '0312-3456789',
      items: '3 kg Farm Fresh Organic Tomatoes, 2 dozen Kinnow',
      total: 1040,
      pickupSlot: 'Saturday (09:00 AM - 11:00 AM)',
      market: 'Lahore Central Farmers Market',
      farmer: 'Chaudhry Tariq Ahmed',
      status: 'Confirmed',
      createdAt: 'Today'
    },
    {
      id: 'ORD-1002',
      dbId: '65e1234567890abcdef1002',
      customer: 'Sara Ahmed',
      phone: '0321-9988776',
      items: '1 kg Pure Wildflower Honey',
      total: 1400,
      pickupSlot: 'Sunday (05:00 PM - 07:00 PM)',
      market: 'Model Town Sunday Bazaar',
      farmer: 'Ghulam Rasool',
      status: 'Ready for Pickup',
      createdAt: 'Yesterday'
    },
    {
      id: 'ORD-1003',
      dbId: '65e1234567890abcdef1003',
      customer: 'Usman Malik',
      phone: '0300-1122334',
      items: '5 kg Crisp Honeycrisp Apples',
      total: 2100,
      pickupSlot: 'Saturday (11:00 AM - 01:00 PM)',
      market: 'Lahore Central Farmers Market',
      farmer: 'Chaudhry Tariq Ahmed',
      status: 'Processing',
      createdAt: 'Today'
    },
    {
      id: 'ORD-1004',
      dbId: '65e1234567890abcdef1004',
      customer: 'Fatima Noor',
      phone: '0333-4455667',
      items: '2 dozen Farm Fresh Free-Range Eggs',
      total: 1000,
      pickupSlot: 'Sunday (09:00 AM - 11:00 AM)',
      market: 'Model Town Sunday Bazaar',
      farmer: 'Ghulam Rasool',
      status: 'Completed',
      createdAt: '3 days ago'
    },
    {
      id: 'ORD-1005',
      dbId: '65e1234567890abcdef1005',
      customer: 'Zohaib Hassan',
      phone: '0345-7788990',
      items: '2 kg Fresh Baby Spinach',
      total: 560,
      pickupSlot: 'Wednesday (04:00 PM - 06:00 PM)',
      market: 'Lahore Central Farmers Market',
      farmer: 'Chaudhry Tariq Ahmed',
      status: 'Pending',
      createdAt: 'Just now'
    }
  ]);

  // Pending Farmers Queue
  const [pendingFarmers, setPendingFarmers] = useState([
    {
      id: 'FARM-103',
      businessName: 'KP Dairy & Honey Farm',
      contactPerson: 'Zainab Bibi',
      phone: '0303-7779988',
      email: 'zainab@farm.com',
      requestedMarket: 'Islamabad F-6 Organic Hub',
      category: 'Fresh Milk & Honey',
      status: 'Pending'
    },
    {
      id: 'FARM-104',
      businessName: 'Multan Mango & Fruit Groves',
      contactPerson: 'Malik Tanveer',
      phone: '0305-6677889',
      email: 'tanveer@multanfarm.com',
      requestedMarket: 'Lahore Central Farmers Market',
      category: 'Organic Fruits',
      status: 'Pending'
    }
  ]);

  // Customer Reviews & Feedback State
  const [reviews, setReviews] = useState([
    {
      id: '1',
      customer: 'Ali Khan',
      farmer: 'Chaudhry Tariq Ahmed',
      rating: 5,
      comment: 'Extremely fresh Kinnow oranges and tomatoes! High quality harvest.',
      date: 'Yesterday'
    },
    {
      id: '2',
      customer: 'Ali Khan',
      farmer: 'Ghulam Rasool',
      rating: 5,
      comment: 'Pure honey is genuine and taste is amazing. Highly recommended!',
      date: '3 days ago'
    },
    {
      id: '3',
      customer: 'Sara Ahmed',
      farmer: 'Chaudhry Tariq Ahmed',
      rating: 5,
      comment: 'Very prompt stall pickup and clean packaging. Loved the fresh produce!',
      date: '2 days ago'
    },
    {
      id: '4',
      customer: 'Usman Malik',
      farmer: 'Ghulam Rasool',
      rating: 4,
      comment: 'Great organic greens and fresh eggs. Will order again next weekend.',
      date: '4 days ago'
    },
    {
      id: '5',
      customer: 'Zohaib Hassan',
      farmer: 'Chaudhry Tariq Ahmed',
      rating: 5,
      comment: 'Best citrus farm produce in Lahore Central Market!',
      date: 'Today'
    }
  ]);

  // Fetch initial data from Express Backend
  const fetchBackendData = async () => {
    try {
      // Fetch Users / Farmers
      const userRes = await fetch(`${API_BASE_URL}/users?role=farmer`);
      let fetchedFarmers = [];

      if (userRes.ok) {
        const userData = await userRes.json();

        if (userData && userData.length > 0) {
          fetchedFarmers = userData.map((f) => ({
            id: f._id,
            name: f.name,
            email: f.email,
            phone: f.phone || '0300-0000000',
            farmName: f.farmName || (f.name + ' Farm'),
            farmLocation: f.farmLocation || f.address || 'Pakistan',
            status: f.status || 'approved',
            verified: f.verified ?? true,
            rating: f.rating || 4.8
          }));
        }
      }

      // Read current registered user from localStorage
      const localRole = localStorage.getItem('marketlink_user_role');
      const localName = localStorage.getItem('marketlink_user_name');
      const localEmail = localStorage.getItem('marketlink_user_email');

      let combinedFarmers = [...fetchedFarmers];

      if ((localRole === 'vendor' || localRole === 'farmer') && localName) {
        if (!combinedFarmers.some(f => f.email === localEmail || f.name === localName)) {
          combinedFarmers.unshift({
            id: 'FARM-LOCAL-' + Date.now(),
            name: localName,
            email: localEmail || 'user@farm.com',
            phone: '0301-5551234',
            farmName: localName + ' Farm',
            farmLocation: 'Lahore, Punjab',
            status: 'approved',
            verified: true,
            rating: 5.0
          });
        }
      }

      // Read custom added farmers from localStorage
      const localCustomFarmers = localStorage.getItem('marketlink_custom_farmers');
      let customFarmersList = [];

      if (localCustomFarmers) {
        try {
          customFarmersList = JSON.parse(localCustomFarmers) || [];
        } catch (e) {}
      }

      customFarmersList.forEach(cf => {
        if (!combinedFarmers.some(f => f.email === cf.email || f.name === cf.name || f.id === cf.id)) {
          combinedFarmers.push(cf);
        }
      });

      const MOCK_FARMERS = [
        {
          id: 'FARM-101',
          name: 'Chaudhry Tariq Ahmed',
          email: 'tariq@farm.com',
          phone: '0301-5551234',
          farmName: 'Sargodha Citrus & Vegetable Farms',
          farmLocation: 'Sargodha, Punjab',
          status: 'approved',
          verified: true,
          rating: 4.9
        },
        {
          id: 'FARM-102',
          name: 'Ghulam Rasool',
          email: 'ghulam@farm.com',
          phone: '0302-8884321',
          farmName: 'Green Valley Organic Produce',
          farmLocation: 'Sahiwal, Punjab',
          status: 'approved',
          verified: true,
          rating: 4.8
        }
      ];

      MOCK_FARMERS.forEach(mf => {
        if (!combinedFarmers.some(f => f.email === mf.email || f.name === mf.name)) {
          combinedFarmers.push(mf);
        }
      });

      setFarmers(combinedFarmers);

      setPendingFarmers(
        combinedFarmers
          .filter(f => f.status === 'pending')
          .map(f => ({
            id: f.id,
            businessName: f.farmName,
            contactPerson: f.name,
            phone: f.phone,
            email: f.email,
            requestedMarket: f.farmLocation,
            category: 'Fresh Produce & Organic',
            status: 'Pending'
          }))
      );

      // Fetch Products
      const prodRes = await fetch(`${API_BASE_URL}/products`);

      if (prodRes.ok) {
        const prodData = await prodRes.json();

        const formattedProducts = (prodData && prodData.length > 0)
          ? prodData.map((p) => ({
              id: p._id,
              name: p.name,
              category: p.category,
              price: p.price,
              unit: p.unit || 'kg',
              stock: p.stockQuantity,
              market: p.market?.name || 'Lahore Central Farmers Market',
              marketId: p.market?._id,
              farmer: p.farmer?.farmName || p.farmer?.name || 'Local Farmer',
              farmerId: p.farmer?._id,
              farmerRating: p.rating || 4.8,
              isOrganic: p.organic ?? true,
              image: p.image || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=500',
              description: p.description
            }))
          : [];

        // Read local custom products backup
        const localCustom = localStorage.getItem('marketlink_custom_products');
        let customList = [];

        if (localCustom) {
          try {
            customList = JSON.parse(localCustom) || [];
          } catch (e) {}
        }

        const merged = [...formattedProducts];

        customList.forEach(cp => {
          if (!merged.some(m => m.id === cp.id || m.name === cp.name)) {
            merged.push(cp);
          }
        });

        PRODUCTS_DATA.forEach(mp => {
          if (!merged.some(m => m.id === mp.id || m.name === mp.name)) {
            merged.push(mp);
          }
        });

        setProducts(merged);
      }

      // Fetch Markets
      const mktRes = await fetch(`${API_BASE_URL}/markets`);

      if (mktRes.ok) {
        const mktData = await mktRes.json();

        if (mktData && mktData.length > 0) {
          const formattedMarkets = mktData.map((m) => ({
            id: m._id,
            name: m.name,
            location: m.location,
            address: m.address || m.location,
            schedule: m.schedule || 'Every Saturday',
            day: m.day || m.schedule || 'Every Saturday',
            hours: m.hours || m.timing || '08:00 AM - 01:00 PM',
            timing: m.timing || '08:00 AM - 01:00 PM',
            tagline: m.tagline || 'Regional Weekly Farmers Gathering',
            status: m.status === 'active' ? 'Active' : 'Closed',
            statusBadge: m.pickupAvailable ? 'Open for Pre-Orders' : 'Walk-in Only',
            stallsCount: m.stallsCount || 35,
            activeFarmersCount: m.activeFarmersCount || 18,
            pickupZone: m.pickupZone || 'Stall #A1-A12 Pre-Order Collection Booth',
            farmers: m.farmers && m.farmers.length > 0
              ? m.farmers
              : ['Chaudhry Tariq Ahmed', 'Ghulam Rasool'],
            image: m.image || 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=600',
            description: m.description || 'Featuring certified local growers every weekend. Pre-order your weekly greens, fruits and dairy for fast stall collection.',
            isFeatured: true
          }));

          setMarkets(formattedMarkets);
        }
      }

      // Fetch PreOrders
      const orderRes = await fetch(`${API_BASE_URL}/orders`);

      if (orderRes.ok) {
        const orderData = await orderRes.json();

        if (orderData && orderData.length > 0) {
          const formattedOrders = orderData.map((o) => ({
            id: o.orderNumber || o._id,
            dbId: o._id,
            customer: o.customerName || o.customer?.name || 'Customer',
            phone: o.customerPhone || '0300-0000000',
            items: o.items
              ? o.items.map(i => `${i.quantity}x ${i.productName || i.product?.name || 'Produce'}`).join(', ')
              : 'Fresh Harvest',
            total: o.totalAmount,
            pickupSlot: o.pickupDate || 'Tomorrow Morning',
            market: o.marketName || o.market?.name || 'Local Market',
            farmer: o.farmerName || o.farmer?.name || 'Local Farmer',
            status: o.status
              ? (o.status === 'ready_for_pickup'
                ? 'Ready for Pickup'
                : o.status.charAt(0).toUpperCase() + o.status.slice(1))
              : 'Pending',
            createdAt: new Date(o.createdAt).toLocaleDateString()
          }));

          setOrders(formattedOrders);
        }
      }

      // Fetch Reviews
      const reviewRes = await fetch(`${API_BASE_URL}/reviews`);

      if (reviewRes.ok) {
        const reviewData = await reviewRes.json();

        if (reviewData && reviewData.length > 0) {
          const formattedReviews = reviewData.map((r) => ({
            id: r._id,
            customer: r.customer?.name || 'Shopper',
            farmer: r.farmer?.farmName || r.farmer?.name || 'Local Farmer',
            rating: r.rating,
            comment: r.comment,
            date: new Date(r.createdAt).toLocaleDateString()
          }));

          setReviews(formattedReviews);
        }
      }

    } catch (err) {
      console.log('Backend sync offline or running in mock mode:', err.message);
    }
  };

  useEffect(() => {
    fetchBackendData();

    const handleUserUpdate = () => {
      fetchBackendData();
    };

    window.addEventListener('marketlink_user_updated', handleUserUpdate);

    return () => window.removeEventListener('marketlink_user_updated', handleUserUpdate);
  }, []);

  // Admin Farmer Actions
  const approveFarmer = async (farmerId) => {
    setFarmers(prev =>
      prev.map(f =>
        f.id === farmerId
          ? { ...f, status: 'approved', verified: true }
          : f
      )
    );

    setPendingFarmers(prev => prev.filter(f => f.id !== farmerId));

    showToast(
      'Farmer Verified',
      'Farmer account has been approved and verified.',
      'success'
    );

    if (typeof farmerId === 'string' && farmerId.length === 24) {
      try {
        await fetch(`${API_BASE_URL}/users/${farmerId}/farmer-status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'approved' })
        });
      } catch (e) {
        console.log('Farmer approved locally:', e.message);
      }
    }
  };

  const rejectFarmer = async (farmerId) => {
    setFarmers(prev =>
      prev.map(f =>
        f.id === farmerId
          ? { ...f, status: 'rejected', verified: false }
          : f
      )
    );

    setPendingFarmers(prev => prev.filter(f => f.id !== farmerId));

    showToast(
      'Farmer Rejected',
      'Farmer application status set to rejected.',
      'error'
    );

    if (typeof farmerId === 'string' && farmerId.length === 24) {
      try {
        await fetch(`${API_BASE_URL}/users/${farmerId}/farmer-status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'rejected' })
        });
      } catch (e) {
        console.log('Farmer rejected locally:', e.message);
      }
    }
  };

  const suspendFarmer = async (farmerId) => {
    setFarmers(prev =>
      prev.map(f =>
        f.id === farmerId
          ? { ...f, status: 'suspended', verified: false }
          : f
      )
    );

    setPendingFarmers(prev => prev.filter(f => f.id !== farmerId));

    showToast(
      'Farmer Suspended',
      'Farmer account has been suspended.',
      'error'
    );

    if (typeof farmerId === 'string' && farmerId.length === 24) {
      try {
        await fetch(`${API_BASE_URL}/users/${farmerId}/farmer-status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'suspended' })
        });
      } catch (e) {
        console.log('Farmer suspended locally:', e.message);
      }
    }
  };

  const deleteFarmer = async (farmerId) => {
    setFarmers(prev => prev.filter(f => f.id !== farmerId));
    setPendingFarmers(prev => prev.filter(f => f.id !== farmerId));

    if (typeof farmerId === 'string' && farmerId.length === 24) {
      try {
        await fetch(`${API_BASE_URL}/users/${farmerId}`, {
          method: 'DELETE'
        });
      } catch (e) {
        console.log('Farmer deleted locally:', e.message);
      }
    }
  };

  const addFarmer = async (farmerData) => {
    const newFarmer = {
      id: Date.now().toString(),
      name: farmerData.name,
      email: farmerData.email,
      phone: farmerData.phone,
      farmName: farmerData.farmName,
      farmLocation: farmerData.farmLocation,
      status: 'approved',
      verified: true,
      rating: 5.0
    };

    setFarmers(prev => {
      const updated = [newFarmer, ...prev];

      try {
        localStorage.setItem(
          'marketlink_custom_farmers',
          JSON.stringify(updated)
        );
      } catch (e) {}

      return updated;
    });

    try {
      await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: farmerData.name,
          email: farmerData.email,
          password: 'farmer123',
          role: 'farmer',
          status: 'approved',
          phone: farmerData.phone,
          farmName: farmerData.farmName,
          farmLocation: farmerData.farmLocation
        })
      });
    } catch (e) {
      console.log('Farmer added locally:', e.message);
    }
  };

  const updateFarmer = async (farmerId, updates) => {
    setFarmers(prev =>
      prev.map(f =>
        f.id === farmerId
          ? { ...f, ...updates }
          : f
      )
    );

    if (typeof farmerId === 'string' && farmerId.length === 24) {
      try {
        await fetch(`${API_BASE_URL}/users/${farmerId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates)
        });
      } catch (e) {
        console.log('Farmer updated locally:', e.message);
      }
    }
  };

  // Admin Market Actions
  const addMarket = async (marketData) => {
    const newMarket = {
      id: Date.now().toString(),
      name: marketData.name,
      location: marketData.location,
      schedule: marketData.schedule || 'Every Saturday',
      timing: marketData.timing || '07:00 AM - 02:00 PM',
      status: 'Active',
      statusBadge: 'Open for Pre-Orders',
      stallsCount: Number(marketData.stallsCount) || 35,
      image: marketData.image || 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=600',
      description: marketData.description || 'Community Farmers Market'
    };

    setMarkets(prev => [newMarket, ...prev]);

    try {
      await fetch(`${API_BASE_URL}/markets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: marketData.name,
          location: marketData.location,
          schedule: marketData.schedule || 'Every Saturday',
          timing: marketData.timing || '07:00 AM - 02:00 PM',
          stallsCount: Number(marketData.stallsCount) || 35,
          image: marketData.image || ''
        })
      });
    } catch (e) {
      console.log('Market added locally:', e.message);
    }
  };

  const updateMarket = async (marketId, updates) => {
    setMarkets(prev =>
      prev.map(m =>
        m.id === marketId
          ? { ...m, ...updates }
          : m
      )
    );

    if (typeof marketId === 'string' && marketId.length === 24) {
      try {
        await fetch(`${API_BASE_URL}/markets/${marketId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates)
        });
      } catch (e) {
        console.log('Market updated locally:', e.message);
      }
    }
  };

  const deleteMarket = async (marketId) => {
    setMarkets(prev => prev.filter(m => m.id !== marketId));

    if (typeof marketId === 'string' && marketId.length === 24) {
      try {
        await fetch(`${API_BASE_URL}/markets/${marketId}`, {
          method: 'DELETE'
        });
      } catch (e) {
        console.log('Market deleted locally:', e.message);
      }
    }
  };

  // Pre-Order Actions
  const addPreOrder = async (orderData) => {
    const currentCustomerEmail =
      localStorage.getItem('marketlink_user_email') || 'customer@user.com';

    const currentCustomerName =
      orderData.customerName ||
      localStorage.getItem('marketlink_user_name') ||
      'Asad Khan';

    const newOrder = {
      id: orderData.id || `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: currentCustomerName,
      customerEmail: currentCustomerEmail,
      phone: orderData.customerPhone || '0300-1234567',
      items: `${orderData.quantity} ${orderData.product.unit} ${orderData.product.name}`,
      total: parseFloat(orderData.totalPrice),
      pickupSlot: orderData.pickupTimeSlot || '09:30 AM - 10:30 AM',
      market: orderData.product.market,
      farmer: orderData.product.farmer,
      farmerEmail: orderData.product.farmerEmail,
      status: 'Pending',
      createdAt: 'Just Now'
    };

    setOrders((prev) => {
      const updated = [newOrder, ...prev];

      try {
        localStorage.setItem(
          'marketlink_custom_orders',
          JSON.stringify(updated)
        );
      } catch (e) {}

      return updated;
    });

    try {
      await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: currentCustomerName,
          customerPhone: orderData.customerPhone || '0300-1234567',
          farmerName: orderData.product.farmer,
          marketName: orderData.product.market,
          items: [
            {
              productName: orderData.product.name,
              quantity: orderData.quantity,
              priceAtPurchase: orderData.product.price
            }
          ],
          totalAmount: parseFloat(orderData.totalPrice),
          notes: orderData.notes || '',
          pickupDate: orderData.pickupTimeSlot || 'Tomorrow Morning'
        })
      });
    } catch (e) {
      console.log('Order added to local state:', e.message);
    }

    setProducts((prev) =>
      prev.map((p) =>
        p.id === orderData.product.id
          ? {
              ...p,
              stock: Math.max(0, p.stock - orderData.quantity)
            }
          : p
      )
    );

    showToast(
      'Pre-Order Reserved!',
      `Ticket ${newOrder.id} confirmed with ${orderData.product.farmer}.`,
      'success'
    );

    return newOrder;
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: newStatus }
          : o
      )
    );

    showToast(
      'Order Status Updated',
      `Order ${orderId} is now set to ${newStatus}.`,
      'info'
    );

    const targetOrder = orders.find(o => o.id === orderId);

    if (
      targetOrder?.dbId &&
      typeof targetOrder.dbId === 'string' &&
      targetOrder.dbId.length === 24
    ) {
      try {
        await fetch(`${API_BASE_URL}/orders/${targetOrder.dbId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: newStatus.toLowerCase().replace(/\s+/g, '_')
          })
        });
      } catch (e) {
        console.log('Order status updated locally:', e.message);
      }
    }
  };

  const deleteOrder = async (orderId) => {
    const targetOrder = orders.find(o => o.id === orderId);

    setOrders(prev =>
      prev.filter(o => o.id !== orderId)
    );

    if (
      targetOrder?.dbId &&
      typeof targetOrder.dbId === 'string' &&
      targetOrder.dbId.length === 24
    ) {
      try {
        await fetch(`${API_BASE_URL}/orders/${targetOrder.dbId}`, {
          method: 'DELETE'
        });
      } catch (e) {
        console.log('Order deleted locally:', e.message);
      }
    }
  };

  // Product Actions
  const addProduct = async (newProduct) => {
    const tempId = Date.now().toString();

    const currentUserName =
      localStorage.getItem('marketlink_user_name') ||
      'Chaudhry Tariq Ahmed';

    const item = {
      id: tempId,
      farmerRating: 4.9,
      isOrganic: true,
      harvestDate: 'Freshly harvested',
      farmerStall: 'Stall #A4',
      market: newProduct.market || 'Lahore Central Farmers Market',
      farmer: newProduct.farmer || currentUserName,
      ...newProduct
    };

    setProducts((prev) => {
      const updated = [item, ...prev];

      try {
        const customOnly = updated.filter(
          p => !PRODUCTS_DATA.some(pd => pd.id === p.id)
        );

        localStorage.setItem(
          'marketlink_custom_products',
          JSON.stringify(customOnly)
        );
      } catch (e) {}

      return updated;
    });

    try {
      const targetMarket = markets.find(
        m => m.name === newProduct.market || m.id === newProduct.marketId
      );

      const targetFarmer = farmers.find(
        f => f.name === newProduct.farmer || f.id === newProduct.farmerId
      );

      const res = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProduct.name,
          category: newProduct.category,
          price: parseFloat(newProduct.price),
          unit: newProduct.unit || 'kg',
          stockQuantity: parseInt(newProduct.stock) || 10,
          description: newProduct.description || '',
          image: newProduct.image || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400',
          market: targetMarket?.id && targetMarket.id.length === 24
            ? targetMarket.id
            : null,
          farmer: targetFarmer?.id && targetFarmer.id.length === 24
            ? targetFarmer.id
            : null,
          organic: true
        })
      });

      if (res.ok) {
        const data = await res.json();

        if (data.success && data.product) {
          const dbProduct = data.product;

          setProducts((prev) => {
            const updated = prev.map((p) =>
              p.id === tempId
                ? {
                    ...p,
                    id: dbProduct._id,
                    name: dbProduct.name,
                    category: dbProduct.category,
                    price: dbProduct.price,
                    unit: dbProduct.unit,
                    stock: dbProduct.stockQuantity,
                    image: dbProduct.image || p.image,
                    description: dbProduct.description
                  }
                : p
            );

            try {
              const customOnly = updated.filter(
                p => !PRODUCTS_DATA.some(pd => pd.id === p.id)
              );

              localStorage.setItem(
                'marketlink_custom_products',
                JSON.stringify(customOnly)
              );
            } catch (e) {}

            return updated;
          });
        }
      }
    } catch (e) {
      console.log('Product added locally:', e.message);
    }
  };

  const updateProductStock = async (productId, newStock) => {
    setProducts((prev) => {
      const updated = prev.map((p) =>
        p.id === productId
          ? { ...p, stock: newStock }
          : p
      );

      try {
        const customOnly = updated.filter(
          p => !PRODUCTS_DATA.some(pd => pd.id === p.id)
        );

        localStorage.setItem(
          'marketlink_custom_products',
          JSON.stringify(customOnly)
        );
      } catch (e) {}

      return updated;
    });

    if (typeof productId === 'string' && productId.length === 24) {
      try {
        await fetch(`${API_BASE_URL}/products/${productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            stockQuantity: newStock
          })
        });
      } catch (e) {
        console.log('Stock updated locally:', e.message);
      }
    }
  };

  // Edit Product
  const updateProduct = async (productId, updatedData) => {
    setProducts((prev) => {
      const updated = prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              ...updatedData,
              price: Number(updatedData.price),
              stock: Number(updatedData.stock)
            }
          : p
      );

      try {
        const customOnly = updated.filter(
          p => !PRODUCTS_DATA.some(pd => pd.id === p.id)
        );

        localStorage.setItem(
          'marketlink_custom_products',
          JSON.stringify(customOnly)
        );
      } catch (e) {}

      return updated;
    });

    if (typeof productId === 'string' && productId.length === 24) {
      try {
        await fetch(`${API_BASE_URL}/products/${productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: updatedData.name,
            category: updatedData.category,
            price: Number(updatedData.price),
            unit: updatedData.unit,
            stockQuantity: Number(updatedData.stock),
            image: updatedData.image,
            description: updatedData.description || ''
          })
        });
      } catch (e) {
        console.log('Product updated locally:', e.message);
      }
    }

    showToast(
      'Product Updated',
      'Your produce item has been updated successfully.',
      'success'
    );
  };

  const deleteProduct = async (productId) => {
    setProducts((prev) => {
      const updated = prev.filter(p => p.id !== productId);

      try {
        const customOnly = updated.filter(
          p => !PRODUCTS_DATA.some(pd => pd.id === p.id)
        );

        localStorage.setItem(
          'marketlink_custom_products',
          JSON.stringify(customOnly)
        );
      } catch (e) {}

      return updated;
    });

    if (typeof productId === 'string' && productId.length === 24) {
      try {
        await fetch(`${API_BASE_URL}/products/${productId}`, {
          method: 'DELETE'
        });
      } catch (e) {
        console.log('Product deleted locally:', e.message);
      }
    }
  };

  // Review Actions
  const addReview = async (newReview) => {
    setReviews((prev) => [
      {
        id: Date.now().toString(),
        date: 'Just now',
        ...newReview
      },
      ...prev
    ]);
  };

  const deleteReview = async (reviewId) => {
    setReviews(prev =>
      prev.filter(r => r.id !== reviewId)
    );

    if (typeof reviewId === 'string' && reviewId.length === 24) {
      try {
        await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
          method: 'DELETE'
        });
      } catch (e) {
        console.log('Review deleted locally:', e.message);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        products,
        markets,
        farmers,
        orders,
        pendingFarmers,
        reviews,
        addPreOrder,
        updateOrderStatus,
        deleteOrder,
        addProduct,
        updateProduct,
        updateProductStock,
        deleteProduct,
        approveFarmer,
        rejectFarmer,
        suspendFarmer,
        deleteFarmer,
        addFarmer,
        updateFarmer,
        addMarket,
        updateMarket,
        deleteMarket,
        addReview,
        deleteReview,
        showToast,
        refreshData: fetchBackendData
      }}
    >
      {children}

      <ToastNotification
        toast={toast}
        onClose={clearToast}
      />
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);