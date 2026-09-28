import PreOrder from '../models/PreOrder.js';

// Create Pre-Order
export const createPreOrder = async (req, res) => {
  try {
    const { 
      customerName, 
      customerPhone, 
      customer, 
      farmer, 
      farmerName, 
      market, 
      marketName, 
      items, 
      totalAmount, 
      notes, 
      pickupDate 
    } = req.body;

    if (!customerName || !customerPhone || !items || items.length === 0) {
      return res.status(400).json({ message: 'Customer name, phone, and order items are required' });
    }

    const orderCount = await PreOrder.countDocuments();
    const orderNumber = `#ORD-${1000 + orderCount + 1}`;

    const preOrder = new PreOrder({
      orderNumber,
      customerName,
      customerPhone,
      customer,
      farmer,
      farmerName,
      market,
      marketName,
      items,
      totalAmount,
      notes: notes || '',
      pickupDate: pickupDate || 'Tomorrow Morning',
      status: 'pending'
    });

    await preOrder.save();

    res.status(201).json({ message: 'Pre-order created successfully', preOrder });
  } catch (error) {
    res.status(500).json({ message: 'Server error creating pre-order', error: error.message });
  }
};

// Get Pre-Orders with optional filters
export const getPreOrders = async (req, res) => {
  try {
    const { customerId, farmerId, status } = req.query;
    let filter = {};

    if (customerId) filter.customer = customerId;
    if (farmerId) filter.farmer = farmerId;
    if (status) filter.status = status;

    const orders = await PreOrder.find(filter)
      .populate('customer', 'name phone email')
      .populate('farmer', 'name phone farmName')
      .populate('market', 'name location')
      .populate('items.product', 'name price unit')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching pre-orders', error: error.message });
  }
};

// Get Pre-Order by ID
export const getPreOrderById = async (req, res) => {
  try {
    const order = await PreOrder.findById(req.params.id)
      .populate('customer', 'name phone email')
      .populate('farmer', 'name phone farmName')
      .populate('market', 'name location')
      .populate('items.product', 'name price unit');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching pre-order', error: error.message });
  }
};

// Update Pre-Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'ready_for_pickup', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }

    const order = await PreOrder.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: `Order status updated to ${status}`, order });
  } catch (error) {
    res.status(500).json({ message: 'Server error updating order status', error: error.message });
  }
};

// Cancel Pre-Order
export const cancelPreOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await PreOrder.findByIdAndUpdate(
      id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error cancelling order', error: error.message });
  }
};

// Delete Pre-Order
export const deletePreOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await PreOrder.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting order', error: error.message });
  }
};