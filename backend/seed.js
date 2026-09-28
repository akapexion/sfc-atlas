import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Market from './models/Market.js';
import Product from './models/Product.js';
import PreOrder from './models/PreOrder.js';
import Review from './models/Review.js';

dotenv.config();

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/marketlink_db';

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB for seeding...');
    await mongoose.connect(DB_URL);
    console.log('Database connected successfully.');

    // Clear existing data
    await User.deleteMany({});
    await Market.deleteMany({});
    await Product.deleteMany({});
    await PreOrder.deleteMany({});
    await Review.deleteMany({});
    console.log('Existing database collections cleared.');

    // Passwords hashing
    const adminPassword = await bcrypt.hash('admin123', 10);
    const farmerPassword = await bcrypt.hash('farmer123', 10);
    const buyerPassword = await bcrypt.hash('buyer123', 10);

    // Create Users
    const users = await User.insertMany([
      {
        name: 'System Admin',
        email: 'admin@marketlink.com',
        password: adminPassword,
        role: 'admin',
        phone: '0300-0000000',
        address: 'MarketLink HQ, Lahore',
        status: 'approved'
      },
      {
        name: 'Chaudhry Tariq Ahmed',
        email: 'tariq@farm.com',
        password: farmerPassword,
        role: 'farmer',
        status: 'approved',
        phone: '0301-5551234',
        address: 'Bhakkar Road, Sargodha',
        farmName: 'Sargodha Citrus & Vegetable Farms',
        farmLocation: 'Sargodha, Punjab',
        rating: 4.9,
        verified: true
      },
      {
        name: 'Ghulam Rasool',
        email: 'ghulam@farm.com',
        password: farmerPassword,
        role: 'farmer',
        status: 'approved',
        phone: '0302-8884321',
        address: 'Multan Road, Sahiwal',
        farmName: 'Green Valley Organic Produce',
        farmLocation: 'Sahiwal, Punjab',
        rating: 4.8,
        verified: true
      },
      {
        name: 'Zainab Bibi',
        email: 'zainab@farm.com',
        password: farmerPassword,
        role: 'farmer',
        status: 'pending',
        phone: '0303-7779988',
        address: 'Charsadda Road, Mardan',
        farmName: 'KP Dairy & Honey Farm',
        farmLocation: 'Mardan, KP',
        rating: 4.7,
        verified: false
      },
      {
        name: 'Ali Khan',
        email: 'ali@buyer.com',
        password: buyerPassword,
        role: 'customer',
        status: 'approved',
        phone: '0312-3456789',
        address: 'Gulberg III, Lahore'
      }
    ]);

    console.log(`Created ${users.length} default users.`);

    const farmer1 = users[1]; // Tariq
    const farmer2 = users[2]; // Ghulam
    const buyer1 = users[4];  // Ali

    // Create Markets
    const markets = await Market.insertMany([
      {
        name: 'Lahore Central Farmers Market',
        location: 'Gulberg III, Main Boulevard, Lahore',
        coordinates: { lat: 31.5204, lng: 74.3587 },
        schedule: 'Every Saturday & Sunday',
        timing: '07:00 AM - 02:00 PM',
        stallsCount: 42,
        image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=600',
        description: 'Premium weekly market featuring certified organic farmers, fresh dairy, seasonal fruits and vegetables.',
        pickupAvailable: true,
        status: 'active'
      },
      {
        name: 'Model Town Sunday Bazaar',
        location: 'Model Town Park Complex, Lahore',
        coordinates: { lat: 31.4822, lng: 74.3228 },
        schedule: 'Sundays Only',
        timing: '06:30 AM - 01:00 PM',
        stallsCount: 30,
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600',
        description: 'Family-friendly local bazaar offering fresh daily harvests directly from Sargodha and Sahiwal farms.',
        pickupAvailable: true,
        status: 'active'
      },
      {
        name: 'Islamabad F-6 Organic Hub',
        location: 'F-6 Markaz Community Center, Islamabad',
        coordinates: { lat: 33.7294, lng: 73.0747 },
        schedule: 'Friday to Sunday',
        timing: '08:00 AM - 04:00 PM',
        stallsCount: 25,
        image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=600',
        description: 'Eco-conscious fresh produce market specializing in mountain honey, organic grains, and pesticide-free crops.',
        pickupAvailable: true,
        status: 'active'
      },
      {
        name: 'Karachi Fresh Produce Market',
        location: 'Clifton Block 4 Park Grounds, Karachi',
        coordinates: { lat: 24.8138, lng: 67.0302 },
        schedule: 'Daily Morning Market',
        timing: '06:00 AM - 12:00 PM',
        stallsCount: 50,
        image: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80&w=600',
        description: 'Coastal region fresh hub bringing daily farm produce directly to suburban consumers.',
        pickupAvailable: true,
        status: 'active'
      }
    ]);

    console.log(`Created ${markets.length} markets.`);

    const mkt1 = markets[0];
    const mkt2 = markets[1];

    // Create Products
    const products = await Product.insertMany([
      {
        farmer: farmer1._id,
        market: mkt1._id,
        name: 'Farm Fresh Organic Tomatoes',
        category: 'Vegetables',
        price: 180,
        unit: 'kg',
        stockQuantity: 150,
        description: 'Vine-ripened red tomatoes picked early morning without chemical spraying.',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=500',
        organic: true,
        rating: 4.9,
        isAvailable: true
      },
      {
        farmer: farmer1._id,
        market: mkt1._id,
        name: 'Sargodha Sweet Kinnow (Oranges)',
        category: 'Fruits',
        price: 250,
        unit: 'dozen',
        stockQuantity: 200,
        description: 'Export quality juicy Sargodha Kinnow oranges full of vitamin C.',
        image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=500',
        organic: true,
        rating: 4.95,
        isAvailable: true
      },
      {
        farmer: farmer2._id,
        market: mkt2._id,
        name: 'Desi Farm Spinach (Palak)',
        category: 'Vegetables',
        price: 90,
        unit: 'kg',
        stockQuantity: 80,
        description: 'Crisp green leaves rich in iron, grown with natural compost.',
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=500',
        organic: true,
        rating: 4.7,
        isAvailable: true
      },
      {
        farmer: farmer2._id,
        market: mkt2._id,
        name: 'Pure Wildflower Honey',
        category: 'Dairy & Pantry',
        price: 1400,
        unit: 'kg',
        stockQuantity: 35,
        description: '100% raw unheated honey harvested directly from wild hives.',
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=500',
        organic: true,
        rating: 5.0,
        isAvailable: true
      },
      {
        farmer: farmer1._id,
        market: mkt2._id,
        name: 'Super Kernel Basmati Rice',
        category: 'Grains & Pulses',
        price: 340,
        unit: 'kg',
        stockQuantity: 500,
        description: 'Aged long-grain aromatic Basmati rice directly from Punjab paddy fields.',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=500',
        organic: false,
        rating: 4.8,
        isAvailable: true
      }
    ]);

    console.log(`Created ${products.length} products.`);

    // Create PreOrders
    const preOrders = await PreOrder.insertMany([
      {
        orderNumber: '#ORD-1001',
        customerName: 'Ali Khan',
        customerPhone: '0312-3456789',
        customer: buyer1._id,
        farmer: farmer1._id,
        farmerName: farmer1.name,
        market: mkt1._id,
        marketName: mkt1.name,
        items: [
          {
            product: products[0]._id,
            productName: products[0].name,
            quantity: 3,
            priceAtPurchase: 180
          },
          {
            product: products[1]._id,
            productName: products[1].name,
            quantity: 2,
            priceAtPurchase: 250
          }
        ],
        totalAmount: 1040,
        notes: 'Please pack in paper bags. I will collect at 9 AM.',
        pickupDate: 'Saturday (09:00 AM - 11:00 AM)',
        status: 'confirmed'
      },
      {
        orderNumber: '#ORD-1002',
        customerName: 'Sara Ahmed',
        customerPhone: '0321-9988776',
        farmer: farmer2._id,
        farmerName: farmer2.name,
        market: mkt2._id,
        marketName: mkt2.name,
        items: [
          {
            product: products[3]._id,
            productName: products[3].name,
            quantity: 1,
            priceAtPurchase: 1400
          }
        ],
        totalAmount: 1400,
        notes: 'Ready for pickup ticket.',
        pickupDate: 'Sunday (05:00 PM - 07:00 PM)',
        status: 'ready_for_pickup'
      }
    ]);

    console.log(`Created ${preOrders.length} sample pre-orders.`);

    // Create Reviews (including low rating / flagged reviews for Content Moderation)
    const reviews = await Review.insertMany([
      {
        customer: buyer1._id,
        farmer: farmer1._id,
        rating: 5,
        comment: 'Extremely fresh Kinnow oranges and tomatoes! High quality harvest.'
      },
      {
        customer: buyer1._id,
        farmer: farmer2._id,
        rating: 5,
        comment: 'Pure honey is genuine and taste is amazing. Highly recommended!'
      },
      {
        customer: buyer1._id,
        farmer: farmer1._id,
        rating: 2,
        comment: 'Produce quantity was short by 200g at stall #A4. Farmer was busy and did not weigh properly.'
      },
      {
        customer: buyer1._id,
        farmer: farmer2._id,
        rating: 1,
        comment: 'Spinach leaves were slightly wilted when I picked up at 1 PM. Please improve refrigeration.'
      }
    ]);

    console.log(`Created ${reviews.length} sample reviews.`);
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
