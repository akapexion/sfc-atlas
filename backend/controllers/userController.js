import User from '../models/User.js';
import bcrypt from 'bcryptjs';

/**
 * User Controller
 * Location: atlas-backend-master/controllers/userController.js
 * Functionality: Authentication (Login/Register), profile management, and farmer approval workflow handlers.
 */

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, address, farmName, farmLocation } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const lowerEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: lowerEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const normalizedRole = role === 'farmer' ? 'vendor' : (role || 'customer');
    const status = req.body.status || 'approved';
    
    const user = new User({
      name: name.trim(),
      email: lowerEmail,
      password: hashedPassword,
      role: normalizedRole,
      status,
      phone: phone || '',
      address: address || '',
      farmName: farmName || (name.trim() + ' Farm'),
      farmLocation: farmLocation || 'Punjab, Pakistan'
    });

    await user.save();

    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const lowerEmail = email.toLowerCase().trim();

    // Pre-seeded Demo Accounts Fallback
    const demoAccounts = {
      'tariq@farm.com': {
        id: 'FARM-101',
        name: 'Chaudhry Tariq Ahmed',
        email: 'tariq@farm.com',
        role: 'vendor',
        status: 'approved',
        phone: '0301-5551234',
        farmName: 'Sargodha Citrus & Vegetable Farms',
        farmLocation: 'Sargodha, Punjab'
      },
      'ali@buyer.com': {
        id: 'CUST-201',
        name: 'Ali Khan',
        email: 'ali@buyer.com',
        role: 'customer',
        status: 'approved',
        phone: '0312-3456789',
        address: 'Gulberg III, Lahore'
      },
      'admin@marketlink.com': {
        id: 'ADMIN-001',
        name: 'System Admin',
        email: 'admin@marketlink.com',
        role: 'admin',
        status: 'approved',
        phone: '0300-0000000'
      }
    };

    let user = null;
    try {
      user = await User.findOne({ email: lowerEmail });
    } catch (dbErr) {
      console.warn('MongoDB query warning in login, checking demo fallback:', dbErr.message);
    }

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return res.status(200).json({
          message: 'Login successful',
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role === 'farmer' ? 'vendor' : user.role,
            status: user.status,
            phone: user.phone,
            address: user.address,
            farmName: user.farmName,
            farmLocation: user.farmLocation
          }
        });
      }
    }

    // Fallback for pre-seeded demo accounts
    if (demoAccounts[lowerEmail]) {
      return res.status(200).json({
        message: 'Login successful',
        user: demoAccounts[lowerEmail]
      });
    }

    return res.status(400).json({ message: 'Invalid email or password.' });
  } catch (error) {
    console.error('Error in loginUser:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching profile', error: error.message });
  }
};

// Get All Users / Filter by Role
export const getAllUsers = async (req, res) => {
  try {
    const { role, status } = req.query;
    let filter = {};
    if (role) {
      if (role === 'farmer' || role === 'vendor') {
        filter.role = { $in: ['farmer', 'vendor'] };
      } else {
        filter.role = role;
      }
    }
    if (status) filter.status = status;

    const users = await User.find(filter).select('-password').sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching users', error: error.message });
  }
};

// Get Pending Farmers for Admin Approval
export const getPendingFarmers = async (req, res) => {
  try {
    const farmers = await User.find({ 
      $or: [{ role: 'farmer' }, { role: 'vendor' }],
      status: 'pending' 
    }).select('-password');
    res.status(200).json(farmers);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching pending farmers', error: error.message });
  }
};

// Update Farmer Status (Approve / Reject)
export const updateFarmerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    res.status(200).json({ message: `Farmer status updated to ${status}`, user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error updating farmer status', error: error.message });
  }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    delete updates.password;

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error updating profile', error: error.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting user', error: error.message });
  }
};