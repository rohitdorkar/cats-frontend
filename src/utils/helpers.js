export const STATUS_COLORS = {
  pending:     'bg-yellow-100 text-yellow-800',
  assigned:    'bg-blue-100 text-blue-800',
  in_progress: 'bg-indigo-100 text-indigo-800',
  escalated:   'bg-orange-100 text-orange-800',
  resolved:    'bg-green-100 text-green-800',
  closed:      'bg-gray-100 text-gray-700',
  rejected:    'bg-red-100 text-red-800',
};

export const PRIORITY_COLORS = {
  low:    'bg-gray-100 text-gray-600',
  medium: 'bg-blue-100 text-blue-700',
  high:   'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700',
};

export const STATUS_LABELS = {
  pending:     'Pending',
  assigned:    'Assigned',
  in_progress: 'In Progress',
  escalated:   'Escalated',
  resolved:    'Resolved',
  closed:      'Closed',
  rejected:    'Rejected',
};

export const CATEGORIES = [
  { value: 'theft', label: 'Theft' },
  { value: 'assault', label: 'Assault' },
  { value: 'fraud', label: 'Fraud' },
  { value: 'harassment', label: 'Harassment' },
  { value: 'accident', label: 'Accident' },
  { value: 'missing_person', label: 'Missing Person' },
  { value: 'cybercrime', label: 'Cybercrime' },
  { value: 'domestic_violence', label: 'Domestic Violence' },
  { value: 'other', label: 'Other' },
];

export const PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

export const STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'assigned', label: 'Assigned' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'escalated', label: 'Escalated' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
  { value: 'rejected', label: 'Rejected' },
];

export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });
};

export const formatDateTime = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};