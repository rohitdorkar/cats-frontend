import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { complaintsAPI } from '../services/api';
import { StatusBadge, PriorityBadge, PageLoader, EmptyState } from '../components/UI';
import { formatDate, formatDateTime, STATUSES, CATEGORIES } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';

export default function ComplaintHistoryPage() {
  const { user, isRole } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    category: '',
  });
  const [expandedId, setExpandedId] = useState(null);

  const fetchComplaints = useCallback(async () => {
    setLoading(true);
    try {
      const params = { ...filters };
      if (search) params.search = search;
      // For officer - backend automatically filters assigned complaints
      const res = await complaintsAPI.list(params);
      setComplaints(res.data.results || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters, search]);

  useEffect(() => { fetchComplaints(); }, [fetchComplaints]);

  const clearFilters = () => {
    setFilters({ status: '', category: '' });
    setSearch('');
  };

  const activeFilters = Object.values(filters).filter(v => v !== '').length;

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const getRoleTitle = () => {
    if (isRole('officer')) return 'My Assigned Complaints History';
    if (isRole('senior')) return 'All Complaints History';
    if (isRole('admin')) return 'Complete Complaints History';
    return 'Complaints History';
  };

  const getRoleSubtitle = () => {
    if (isRole('officer')) return 'All complaints assigned to you';
    return 'Complete record of all registered complaints';
  };

  return (
    <div className="page">

      {/* Page Header */}
      <div className="history-header-banner mb-6">
        <div className="history-header-left">
          <div className="history-header-icon">📂</div>
          <div>
            <h1 className="history-title">{getRoleTitle()}</h1>
            <p className="history-subtitle">{getRoleSubtitle()}</p>
          </div>
        </div>
        <div className="history-stats-group">
          <div className="history-stat-item">
            <span className="history-stat-value">{complaints.length}</span>
            <span className="history-stat-label">Total Records</span>
          </div>
          <div className="history-stat-divider" />
          <div className="history-stat-item">
            <span className="history-stat-value">
              {complaints.filter(c => c.status === 'resolved').length}
            </span>
            <span className="history-stat-label">Resolved</span>
          </div>
          <div className="history-stat-divider" />
          <div className="history-stat-item">
            <span className="history-stat-value">
              {complaints.filter(c => c.status === 'escalated').length}
            </span>
            <span className="history-stat-label">Escalated</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="complaints-filter-card mb-6">
        <div className="complaints-filter-top">
          <span className="complaints-filter-label">🔍 Search & Filter</span>
          {(activeFilters > 0 || search) && (
            <button onClick={clearFilters} className="complaints-clear-btn">
              ✕ Clear All
            </button>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12 }}>
          <div className="complaints-search-wrap">
            <span className="complaints-search-icon">🔍</span>
            <input
              className="complaints-search-input"
              placeholder="Search by name, complaint number, phone…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="complaints-search-clear" onClick={() => setSearch('')}>✕</button>
            )}
          </div>
          <select className="input" value={filters.status}
            onChange={e => setFilters(p => ({ ...p, status: e.target.value }))}>
            <option value="">All Statuses</option>
            {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <select className="input" value={filters.category}
            onChange={e => setFilters(p => ({ ...p, category: e.target.value }))}>
            <option value="">All Categories</option>
            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <PageLoader />
      ) : complaints.length === 0 ? (
        <EmptyState
          icon="📭"
          title="No complaints found"
          subtitle="Try adjusting your filters or search terms"
        />
      ) : (
        <div className="history-list">
          {complaints.map((c, index) => (
            <div key={c.id} className="history-card">

              {/* Card Header - Always Visible */}
              <div className="history-card-header" onClick={() => toggleExpand(c.id)}>
                <div className="history-card-left">
                  <span className="history-index">#{index + 1}</span>
                  <div>
                    <div className="history-card-top">
                      <span className="complaint-id-badge">{c.complaint_number}</span>
                      <StatusBadge status={c.status} />
                      <PriorityBadge priority={c.priority} />
                      {c.is_overdue && (
                        <span className="badge badge-rejected">⚠️ Overdue</span>
                      )}
                    </div>
                    <h3 className="history-card-title">{c.title}</h3>
                    <div className="history-card-meta">
                      <span>👤 {c.complainant_name}</span>
                      <span className="history-meta-dot">·</span>
                      <span>📱 {c.complainant_phone}</span>
                      <span className="history-meta-dot">·</span>
                      <span style={{ textTransform: 'capitalize' }}>
                        🏷️ {c.category?.replace('_', ' ')}
                      </span>
                      <span className="history-meta-dot">·</span>
                      <span>📅 Filed: {formatDate(c.created_at)}</span>
                    </div>
                  </div>
                </div>
                <div className="history-card-right">
                  <Link
                    to={`/complaints/${c.id}`}
                    className="history-view-btn"
                    onClick={e => e.stopPropagation()}
                  >
                    View Details →
                  </Link>
                  <button className="history-expand-btn">
                    {expandedId === c.id ? '▲ Hide' : '▼ Show More'}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedId === c.id && (
                <div className="history-card-body">
                  <div className="history-details-grid">

                    {/* Complainant Info */}
                    <div className="history-detail-section">
                      <h4 className="history-detail-heading">👤 Complainant Details</h4>
                      <div className="history-detail-rows">
                        <div className="history-detail-row">
                          <span>Name</span>
                          <strong>{c.complainant_name}</strong>
                        </div>
                        <div className="history-detail-row">
                          <span>Phone</span>
                          <strong>{c.complainant_phone}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Complaint Info */}
                    <div className="history-detail-section">
                      <h4 className="history-detail-heading">📋 Complaint Info</h4>
                      <div className="history-detail-rows">
                        <div className="history-detail-row">
                          <span>Category</span>
                          <strong style={{ textTransform: 'capitalize' }}>
                            {c.category?.replace('_', ' ')}
                          </strong>
                        </div>
                        <div className="history-detail-row">
                          <span>Incident Date</span>
                          <strong>{formatDate(c.incident_date)}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Assignment Info */}
                    <div className="history-detail-section">
                      <h4 className="history-detail-heading">👮 Assignment</h4>
                      <div className="history-detail-rows">
                        <div className="history-detail-row">
                          <span>Officer</span>
                          <strong>{c.assigned_officer_name || 'Not assigned'}</strong>
                        </div>
                        <div className="history-detail-row">
                          <span>Deadline</span>
                          <strong style={{ color: c.is_overdue ? '#dc2626' : '#111827' }}>
                            {formatDate(c.deadline) || '—'}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Info */}
                    <div className="history-detail-section">
                      <h4 className="history-detail-heading">🕐 Timeline</h4>
                      <div className="history-detail-rows">
                        <div className="history-detail-row">
                          <span>Filed On</span>
                          <strong>{formatDateTime(c.created_at)}</strong>
                        </div>
                        <div className="history-detail-row">
                          <span>Last Updated</span>
                          <strong>{formatDateTime(c.updated_at)}</strong>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Escalation Badge */}
                  {c.status === 'escalated' && (
                    <div className="history-escalated-note">
                      ⚠️ This complaint has been escalated to senior authorities
                    </div>
                  )}

                  {/* Resolved Badge */}
                  {c.status === 'resolved' && (
                    <div className="history-resolved-note">
                      ✅ This complaint has been successfully resolved
                    </div>
                  )}

                  <div style={{ textAlign: 'right', marginTop: 12 }}>
                    <Link to={`/complaints/${c.id}`} className="btn-primary" style={{ fontSize: 13 }}>
                      View Full Details & Timeline →
                    </Link>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}