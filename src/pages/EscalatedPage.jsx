import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { complaintsAPI } from '../services/api';
import { StatusBadge, PriorityBadge, PageLoader, EmptyState } from '../components/UI';
import { formatDate } from '../utils/helpers';

export default function EscalatedPage() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    complaintsAPI.list({ status: 'escalated' })
      .then(res => setComplaints(res.data.results || res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Escalated Complaints</h1>
          <p className="page-subtitle">{complaints.length} complaint{complaints.length !== 1 ? 's' : ''} require your attention</p>
        </div>
      </div>

      {complaints.length === 0 ? (
        <EmptyState icon="✅" title="No escalated complaints" subtitle="All escalated complaints have been resolved." />
      ) : (
        complaints.map(c => (
          <div key={c.id} className="escalated-card">
            <div style={{ flex: 1 }}>
              <div className="flex-center gap-2 mb-2">
                <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#1d4ed8', fontWeight: 600 }}>{c.complaint_number}</span>
                <StatusBadge status={c.status} />
                <PriorityBadge priority={c.priority} />
                {c.is_overdue && <span className="badge badge-rejected">Overdue</span>}
              </div>
              <h3 style={{ fontWeight: 600, color: '#111827', marginBottom: 4 }}>{c.title}</h3>
              <p style={{ fontSize: 13, color: '#6b7280' }}>
                Complainant: {c.complainant_name} · {c.complainant_phone}
              </p>
              <div className="flex-center gap-4 mt-2" style={{ fontSize: 12, color: '#9ca3af' }}>
                <span>Previously assigned: {c.assigned_officer_name || 'None'}</span>
                <span>Filed: {formatDate(c.created_at)}</span>
                <span style={{ color: c.is_overdue ? '#dc2626' : undefined }}>
                  Deadline: {formatDate(c.deadline) || '—'}
                </span>
              </div>
            </div>
            <Link to={`/complaints/${c.id}`} className="btn-primary" style={{ flexShrink: 0, fontSize: 13 }}>
              Reassign →
            </Link>
          </div>
        ))
      )}
    </div>
  );
}