import React from 'react';

export const StatusBadge = ({ status }) => (
  <span className={`badge badge-${status}`}>
    {status?.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
  </span>
);

export const PriorityBadge = ({ priority }) => (
  <span className={`badge badge-${priority}`}>
    {priority?.charAt(0).toUpperCase() + priority?.slice(1)}
  </span>
);

export const Spinner = ({ size = 'md' }) => (
  <div className={size === 'sm' ? 'spinner spinner-sm' : 'spinner'} />
);

export const PageLoader = () => (
  <div className="page-loader">
    <div className="spinner" style={{ width: 40, height: 40 }} />
  </div>
);

export const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export const EmptyState = ({ icon, title, subtitle }) => (
  <div className="empty-state">
    <div className="empty-state-icon">{icon}</div>
    <h3 className="empty-state-title">{title}</h3>
    <p className="empty-state-sub">{subtitle}</p>
  </div>
);

export const StatCard = ({ label, value, color = 'blue', icon }) => (
  <div className="stat-card">
    <div className={`stat-icon stat-icon-${color}`}>{icon}</div>
    <div>
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
    </div>
  </div>
);

export const Field = ({ label, error, children }) => (
  <div className="field">
    {label && <label className="label">{label}</label>}
    {children}
    {error && <p className="field-error">{error}</p>}
  </div>
);