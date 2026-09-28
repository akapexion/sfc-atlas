/**
 * Common Utility & Helper Functions
 * Location: src/utils/helpers.js
 * Functionality: Utility methods for formatting currency, status badges, and date formatting.
 */

/**
 * Formats a numeric value into Pakistani Rupees (PKR) standard string.
 */
export const formatPKR = (amount) => {
  const num = Number(amount) || 0;
  return `PKR ${num.toLocaleString('en-PK')}`;
};

/**
 * Returns Tailwind CSS badge classes based on order or application status.
 */
export const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Completed':
    case 'approved':
    case 'Active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Confirmed':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'Processing':
    case 'Ready for Pickup':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Pending':
    case 'pending':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Cancelled':
    case 'rejected':
    case 'Closed':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

/**
 * Calculates user name initials for avatar icon display.
 */
export const getInitials = (name) => {
  if (!name) return 'ML';
  return name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};
