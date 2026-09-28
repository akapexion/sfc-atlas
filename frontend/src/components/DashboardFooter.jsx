import React from 'react';

const DashboardFooter = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-3.5 px-4 sm:px-6 lg:px-8 mt-auto text-xs text-gray-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} MarketLink — eGreen Basket Initiative</p>
        <div className="flex items-center gap-4 text-[11px] text-gray-400">
          <span>Techwiz 7 Project</span>
          <span>•</span>
          <span>Team SFC-Atlas</span>
          <span>•</span>
          <span className="text-green-600 font-medium">All Systems Operational</span>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;