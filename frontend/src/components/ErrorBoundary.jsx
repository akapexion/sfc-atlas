import React, { Component } from 'react';
import { Sprout, RefreshCw, AlertTriangle } from 'lucide-react';

/**
 * ErrorBoundary Component
 * Location: src/components/ErrorBoundary.jsx
 * Functionality: Catches unexpected Javascript runtime errors anywhere in the component tree.
 * Prevents white-screen crashes and provides a clean recovery UI for high-traffic stability.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('MarketLink Unhandled Error Boundary Caught:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-gray-800">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-200 shadow-xl text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
              <AlertTriangle size={32} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900">Application Notice</h1>
              <p className="text-xs text-gray-500 mt-1">
                An unexpected display issue occurred. Don't worry, your session data is safe.
              </p>
            </div>

            <button
              type="button"
              onClick={this.handleReload}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw size={16} />
              <span>Reload MarketLink Platform</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
