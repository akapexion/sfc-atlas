import React from 'react';
import { 
  Sprout, 
  Users, 
  Target, 
  HeartHandshake, 
  ShieldCheck, 
  MapPin, 
  ShoppingBag,
  CheckCircle2,
  TrendingUp,
  Leaf,
  DollarSign,
  Globe,
  Award,
  Cpu,
  Database,
  Sparkles,
  ArrowRight,
  Lock,
  Scale,
  RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * About Page Component
 * Location: src/pages/About.jsx
 * Functionality: Executive presentation of the eGreen Basket MarketLink platform.
 * Features KPI metrics, traditional vs MarketLink solution comparison, core operational pillars, role modules, and technology stack overview.
 */
export default function About() {
  return (
    <div className="bg-gray-50/50 text-gray-800 pb-20">
      
      {/* 1. HERO BANNER SECTION */}
      <section className="bg-linear-to-br from-green-950 via-green-900 to-emerald-900 text-white py-20 lg:py-28 relative overflow-hidden">
        {/* Subtle decorative background circle */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            
            {/* Project Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-800/80 text-green-300 text-xs font-bold border border-green-700/60 backdrop-blur-xs">
              <Sprout size={15} className="text-green-400" />
              <span>eGreen Basket Initiative • Aptech Techwiz 7</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Empowering Local Agriculture Through Advance Pre-Orders
            </h1>

            <p className="text-base sm:text-lg text-green-100/90 leading-relaxed font-normal">
              MarketLink is a digital agricultural ecosystem bridging local growers and community shoppers. 
              We replace informal flyers and uncertain market turnouts with an end-to-end pre-order platform—enabling 
              guaranteed harvest sales for farmers and fresh produce reservations for families.
            </p>

            {/* Quick Key Impact Metrics Bar */}
            <div className="pt-8 border-t border-green-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
              <div>
                <span className="text-3xl font-extrabold text-white block">100%</span>
                <span className="text-xs text-green-300">Direct Field-to-Stall</span>
              </div>

              <div>
                <span className="text-3xl font-extrabold text-white block">0 PKR</span>
                <span className="text-xs text-green-300">Middleman Commission</span>
              </div>

              <div>
                <span className="text-3xl font-extrabold text-white block">&lt; 24h</span>
                <span className="text-xs text-green-300">Harvest Freshness Window</span>
              </div>

              <div>
                <span className="text-3xl font-extrabold text-white block">9 AM - 7 PM</span>
                <span className="text-xs text-green-300">Flexible Pickup Slots</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 -mt-8 relative z-20">
        
        {/* 2. THE CHALLENGE VS THE SOLUTION (COMPARISON CARDS) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Traditional Market Bottlenecks */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl space-y-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center mb-5">
                <Target size={24} />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-red-600 block mb-1">
                Industry Challenge
              </span>
              <h2 className="text-2xl font-extrabold text-gray-900">
                Traditional Farmers Market Bottlenecks
              </h2>
              
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                Traditional weekend bazaars suffer from unpredictable turnouts and lack of pre-market communication, causing severe friction for both shoppers and growers.
              </p>

              <div className="mt-6 space-y-3 text-xs text-gray-700">
                <div className="p-3.5 bg-red-50/50 rounded-2xl border border-red-100 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-1.5" />
                  <div>
                    <strong className="text-gray-900 block">Unpredictable Post-Harvest Waste</strong>
                    <span>Farmers often harvest blindly, resulting in unsold perishable crops being discarded at market close.</span>
                  </div>
                </div>

                <div className="p-3.5 bg-red-50/50 rounded-2xl border border-red-100 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-1.5" />
                  <div>
                    <strong className="text-gray-900 block">Customer Disappointment & Sold-out Stalls</strong>
                    <span>Shoppers make long trips only to find top organic produce sold out within early morning hours.</span>
                  </div>
                </div>

                <div className="p-3.5 bg-red-50/50 rounded-2xl border border-red-100 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-1.5" />
                  <div>
                    <strong className="text-gray-900 block">Intermediate Commission Squeeze</strong>
                    <span>Middleman brokers take heavy cuts, raising retail prices for shoppers while reducing farmer profits.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* The MarketLink Digital Solution */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl space-y-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-700 border border-green-200 flex items-center justify-center mb-5">
                <HeartHandshake size={24} />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-green-700 block mb-1">
                The Innovation
              </span>
              <h2 className="text-2xl font-extrabold text-gray-900">
                The MarketLink Pre-Order Solution
              </h2>
              
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                MarketLink creates a transparent, digital reservation channel where produce is listed in advance and reserved before harvest day.
              </p>

              <div className="mt-6 space-y-3 text-xs text-gray-700">
                <div className="p-3.5 bg-green-50/60 rounded-2xl border border-green-200/80 flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block">Guaranteed Harvest Reservation</strong>
                    <span>Shoppers secure exact quantities of fresh produce and choose convenient pickup slots (9 AM – 7 PM).</span>
                  </div>
                </div>

                <div className="p-3.5 bg-green-50/60 rounded-2xl border border-green-200/80 flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block">Zero Payment Gateway Fees (Cash at Stall)</strong>
                    <span>Orders are reserved online and settled in cash directly at the farmer's stall upon physical inspection.</span>
                  </div>
                </div>

                <div className="p-3.5 bg-green-50/60 rounded-2xl border border-green-200/80 flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block">Verified Stall Coordination & Reviews</strong>
                    <span>Centralized market directories with stall numbers (e.g. Stall #A4) and community reviews.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* 3. FOUR CORE PILLARS OF MARKETLINK */}
        <section className="bg-white rounded-3xl border border-gray-200 p-8 lg:p-12 shadow-xs space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-green-700">
              Foundational Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              The Four Pillars of MarketLink
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Built according to the Aptech Techwiz 7 eGreen Basket initiative specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-3 hover:border-green-300 transition">
              <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-bold">
                <Leaf size={20} />
              </div>
              <h3 className="text-sm font-extrabold text-gray-900">100% Organic Trust</h3>
              <p className="text-gray-600 leading-relaxed">
                Direct connections with certified organic growers specializing in pesticide-free vegetables, fruits, and pure wildflower honey.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-3 hover:border-green-300 transition">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <DollarSign size={20} />
              </div>
              <h3 className="text-sm font-extrabold text-gray-900">Direct Fair Pricing</h3>
              <p className="text-gray-600 leading-relaxed">
                By eliminating intermediate wholesale brokers, farmers earn fair wages while shoppers enjoy competitive harvest prices.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-3 hover:border-green-300 transition">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <TrendingUp size={20} />
              </div>
              <h3 className="text-sm font-extrabold text-gray-900">Zero Food Waste</h3>
              <p className="text-gray-600 leading-relaxed">
                Pre-order data allows growers to harvest precise quantities, preventing thousands of kilograms of unsold crops from spoiling.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-3 hover:border-green-300 transition">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-sm font-extrabold text-gray-900">Community Auditing</h3>
              <p className="text-gray-600 leading-relaxed">
                Transparent rating system, administrative content moderation, and verified stall badges maintain high quality standards.
              </p>
            </div>

          </div>
        </section>

        {/* 4. ROLE-BASED SYSTEM ARCHITECTURE DEEP DIVE */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-green-700">
              SRS Platform Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Role-Based System Modules
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Designed with strict separation of concerns for Shoppers, Farmers, and System Administrators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            
            {/* Customer Module */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
                  <ShoppingBag size={20} />
                </div>
                <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  Customer Portal
                </span>
                <h3 className="text-base font-extrabold text-gray-900 mt-2">Community Shopper Module</h3>
                <p className="text-gray-600 mt-1 leading-relaxed">
                  Allows consumers to discover local markets, search produce catalog, manage pre-orders, and print digital pickup vouchers.
                </p>

                <div className="pt-4 space-y-2 text-gray-700 font-semibold border-t border-gray-100 mt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-600" />
                    <span>Live produce search & category filtering</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-600" />
                    <span>Flexible time windows (9 AM – 7 PM)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-600" />
                    <span>Digital pickup ticket with barcode</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-600" />
                    <span>Saved favorite farms & 5-star reviews</span>
                  </div>
                </div>
              </div>

              <Link 
                to="/products"
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-center transition block"
              >
                Explore Customer Catalog
              </Link>
            </div>

            {/* Farmer Module */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="w-10 h-10 rounded-xl bg-green-100 text-green-800 flex items-center justify-center mb-3">
                  <Sprout size={20} />
                </div>
                <span className="text-[10px] font-bold uppercase text-green-700 bg-green-50 px-2 py-0.5 rounded">
                  Farmer Portal
                </span>
                <h3 className="text-base font-extrabold text-gray-900 mt-2">Farmer / Vendor Module</h3>
                <p className="text-gray-600 mt-1 leading-relaxed">
                  Equips local growers to manage inventory stock, configure stall numbers, and accept or complete incoming pre-orders.
                </p>

                <div className="pt-4 space-y-2 text-gray-700 font-semibold border-t border-gray-100 mt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-600" />
                    <span>Add, update & manage produce stock</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-600" />
                    <span>Order status pipeline (Accept / Complete)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-600" />
                    <span>Accidental completion protection (Reopen)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-600" />
                    <span>Assigned stall location & cutoff settings</span>
                  </div>
                </div>
              </div>

              <Link 
                to="/login"
                className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-center transition block shadow-xs"
              >
                Farmer Portal Login
              </Link>
            </div>

            {/* Admin Module */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-3">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-[10px] font-bold uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                  Control Panel
                </span>
                <h3 className="text-base font-extrabold text-gray-900 mt-2">Administrator Panel</h3>
                <p className="text-gray-600 mt-1 leading-relaxed">
                  Provides system oversight for farmer approvals, market creation, content moderation, and platform revenue reporting.
                </p>

                <div className="pt-4 space-y-2 text-gray-700 font-semibold border-t border-gray-100 mt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-600" />
                    <span>Farmer Approvals & Re-Approve CRUD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-600" />
                    <span>Regional Markets & Stall Directory CRUD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-600" />
                    <span>Low-rating Review Content Moderation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-600" />
                    <span>Platform Revenue & Settlement Reports</span>
                  </div>
                </div>
              </div>

              <Link 
                to="/login"
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-center transition block shadow-xs"
              >
                Admin Panel Login
              </Link>
            </div>

          </div>
        </section>

        {/* 5. TECH STACK & SYSTEM SPECIFICATION GRID */}
        <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <h3 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                <Cpu size={20} className="text-green-600" />
                <span>Technical Architecture & Tech Stack</span>
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Modern full-stack web technologies powering MarketLink.
              </p>
            </div>

            <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full border border-gray-200 shrink-0">
              Techwiz 7 Submission Standard
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
              <span className="text-gray-400 font-semibold block text-[10px] uppercase">Frontend Engine</span>
              <p className="font-extrabold text-gray-900 text-sm">React 19 + Vite 8</p>
              <p className="text-gray-600">Tailwind CSS v4 & Lucide Icons</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
              <span className="text-gray-400 font-semibold block text-[10px] uppercase">Backend API Server</span>
              <p className="font-extrabold text-gray-900 text-sm">Node.js + Express v5</p>
              <p className="text-gray-600">RESTful Controllers & Routes</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
              <span className="text-gray-400 font-semibold block text-[10px] uppercase">Database Persistence</span>
              <p className="font-extrabold text-gray-900 text-sm">MongoDB Compass</p>
              <p className="text-gray-600">Mongoose v9 Schemas & Models</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
              <span className="text-gray-400 font-semibold block text-[10px] uppercase">Data Settlement</span>
              <p className="font-extrabold text-gray-900 text-sm">Zero Gateway Cash</p>
              <p className="text-gray-600">Direct In-Person Stall Payment</p>
            </div>
          </div>
        </section>

        {/* 6. CALL TO ACTION BANNER */}
        <section className="bg-linear-to-r from-green-700 to-emerald-800 rounded-3xl p-8 lg:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Ready to Discover Fresh Local Produce?
            </h3>
            <p className="text-xs sm:text-sm text-green-100 leading-relaxed">
              Join local shoppers in supporting family farms. Reserve your weekly harvest items online and pick up at your neighborhood market stall.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <Link
              to="/products"
              className="bg-white text-green-800 hover:bg-green-50 font-bold px-6 py-3.5 rounded-2xl text-xs text-center shadow-xs transition flex items-center justify-center gap-2"
            >
              <ShoppingBag size={16} />
              <span>Browse Produce Catalog</span>
            </Link>

            <Link
              to="/markets"
              className="bg-green-800/80 hover:bg-green-900 text-white font-bold px-6 py-3.5 rounded-2xl text-xs text-center border border-green-600 transition flex items-center justify-center gap-2"
            >
              <MapPin size={16} />
              <span>Find Nearby Markets</span>
            </Link>
          </div>
        </section>

      </div>

    </div>
  );
}