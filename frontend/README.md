# MarketLink Frontend — eGreen Basket Initiative

MarketLink is a web application designed to connect local farmers and community shoppers. Customers can view upcoming farmers markets, check live weekly harvest availability, and pre-order fresh produce for in-person pickup.

## Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **Icons:** Lucide React

## Project Structure
- `src/components/`
  - `Navbar.jsx`: Clean public header with responsive navigation and quick links.
  - `Footer.jsx`: Project footer with quick links and project details.
  - `DashboardSidebar.jsx`: Portal navigation with an interactive role switcher (Farmer, Customer, Admin).
  - `DashboardTopbar.jsx`: Portal header with notifications and user profile.
  - `DashboardFooter.jsx`: Portal status and footer.
- `src/pages/`
  - `Home.jsx`: Public landing page with seasonal produce catalog, search & category filters, and upcoming markets.
  - `About.jsx`: Project motivation, problem statement, solution overview, and role architecture.
  - `dashboard/DashboardHome.jsx`: Role-specific dashboard views for Farmers, Customers, and Administrators.
- `src/layout/`
  - `AppLayout.jsx`: Public website layout.
  - `DashboardLayout.jsx`: Management portal layout with shared role state.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

