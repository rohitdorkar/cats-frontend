// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { complaintsAPI } from '../services/api';
// import { StatusBadge, PriorityBadge } from '../components/UI';
// import { formatDate, formatDateTime } from '../utils/helpers';
// import toast from 'react-hot-toast';

// export default function TrackComplaintPage() {
//   const [form, setForm] = useState({ complaint_number: '', phone: '' });
//   const [loading, setLoading] = useState(false);
//   const [complaint, setComplaint] = useState(null);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setComplaint(null);
//     try {
//       const res = await complaintsAPI.track(form.complaint_number, form.phone);
//       setComplaint(res.data);
//     } catch {
//       toast.error('Complaint not found. Check your complaint number and phone number.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const steps = ['pending', 'assigned', 'in_progress', 'resolved'];
//   const stepLabels = ['Pending', 'Assigned', 'In Progress', 'Resolved'];

//   return (
//     <div className="track-page">
//       <div className="track-container">
//         <div className="track-header">
//           <div style={{ fontSize: 48 }}>🚔</div>
//           <h1>Track Your Complaint</h1>
//           <p>Enter your complaint number and registered phone number</p>
//           <Link to="/login" style={{ color: '#93c5fd', fontSize: 13, marginTop: 8, display: 'inline-block' }}>
//             Police Staff Login →
//           </Link>
//         </div>

//         {/* Search */}
//         <div className="track-card">
//           <form className="track-form" onSubmit={handleSearch}>
//             <div>
//               <label className="label">Complaint Number</label>
//               <input className="input" placeholder="e.g. CMP-2024-12345"
//                 value={form.complaint_number}
//                 onChange={e => setForm(p => ({ ...p, complaint_number: e.target.value.toUpperCase() }))}
//                 required />
//             </div>
//             <div>
//               <label className="label">Registered Phone Number</label>
//               <input className="input" placeholder="10-digit mobile number"
//                 value={form.phone}
//                 onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
//                 required />
//             </div>
//             <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: 10 }}>
//               {loading ? 'Searching…' : 'Track Complaint'}
//             </button>
//           </form>
//         </div>

//         {/* Result */}
//         {complaint && (
//           <div className="track-card">
//             <div className="flex-between mb-4">
//               <div>
//                 <p style={{ fontFamily: 'monospace', fontSize: 12, color: '#6b7280' }}>{complaint.complaint_number}</p>
//                 <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginTop: 4 }}>{complaint.title}</h2>
//               </div>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
//                 <StatusBadge status={complaint.status} />
//                 <PriorityBadge priority={complaint.priority} />
//               </div>
//             </div>

//             {/* Progress */}
//             <div className="progress-steps mb-4">
//               {steps.map((step, i) => {
//                 const currentIdx = steps.indexOf(complaint.status);
//                 const isComplete = i <= currentIdx;
//                 return (
//                   <React.Fragment key={step}>
//                     <div className="progress-step">
//                       <div className={`progress-step-circle ${isComplete ? 'step-active' : 'step-inactive'}`}>{i + 1}</div>
//                       <div className="progress-step-label">{stepLabels[i]}</div>
//                     </div>
//                     {i < steps.length - 1 && (
//                       <div className={`progress-line ${isComplete && i < currentIdx ? 'line-active' : 'line-inactive'}`} />
//                     )}
//                   </React.Fragment>
//                 );
//               })}
//             </div>

//             {/* Details */}
//             <div className="detail-grid mb-4">
//               <div className="detail-item">
//                 <dt>Category</dt>
//                 <dd style={{ textTransform: 'capitalize' }}>{complaint.category?.replace('_', ' ')}</dd>
//               </div>
//               <div className="detail-item">
//                 <dt>Incident Date</dt>
//                 <dd>{formatDate(complaint.incident_date)}</dd>
//               </div>
//               <div className="detail-item">
//                 <dt>Assigned Officer</dt>
//                 <dd>{complaint.assigned_officer_detail?.full_name || 'Pending assignment'}</dd>
//               </div>
//               <div className="detail-item">
//                 <dt>Deadline</dt>
//                 <dd>{formatDate(complaint.deadline) || '—'}</dd>
//               </div>
//             </div>

//             {complaint.status === 'escalated' && (
//               <div className="info-box info-box-orange mb-4">
//                 <p style={{ color: '#9a3412', fontSize: 14, fontWeight: 500 }}>
//                   ⚠️ Your complaint has been escalated to senior authorities for faster resolution.
//                 </p>
//               </div>
//             )}

//             {complaint.resolution_notes && (
//               <div className="info-box info-box-green mb-4">
//                 <p style={{ color: '#166534', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>✅ Resolution</p>
//                 <p style={{ color: '#166534', fontSize: 14 }}>{complaint.resolution_notes}</p>
//               </div>
//             )}

//             {complaint.history?.length > 0 && (
//               <div>
//                 <h3 style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Status History</h3>
//                 <div className="timeline">
//                   {complaint.history.map(h => (
//                     <div key={h.id} className="timeline-item">
//                       <div className="timeline-dot" />
//                       <div className="timeline-content">
//                         <p style={{ fontSize: 14, color: '#374151' }}>{h.note || `Status changed to ${h.new_status}`}</p>
//                         <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{formatDateTime(h.created_at)}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { complaintsAPI } from '../services/api';
import { StatusBadge, PriorityBadge } from '../components/UI';
import { formatDate, formatDateTime } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function TrackComplaintPage() {
  const [form, setForm] = useState({ complaint_number: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [complaint, setComplaint] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setComplaint(null);
    try {
      const res = await complaintsAPI.track(form.complaint_number, form.phone);
      setComplaint(res.data);
    } catch {
      toast.error('Complaint not found. Check your complaint number and phone number.');
    } finally {
      setLoading(false);
    }
  };

  const steps = ['pending', 'assigned', 'in_progress', 'resolved'];
  const stepLabels = ['Pending', 'Assigned', 'In Progress', 'Resolved'];

  return (
    <div className="track-page">
      <div className="track-container">

        {/* ── Header ── */}
        <div className="track-header">
          <div className="track-header-icon">🚔</div>
          <h1 className="track-header-title">Track Your Complaint</h1>
          <p className="track-header-subtitle">
            Enter your complaint number and registered phone number
          </p>
          <Link to="/login" className="track-staff-link">
            Police Staff Login →
          </Link>
        </div>

        {/* ── Search Card ── */}
        <div className="track-card">
          <div className="track-card-label">
            🔍 Complaint Lookup
          </div>
          <form className="track-form" onSubmit={handleSearch}>
            <div>
              <label className="label">Complaint Number</label>
              <input
                className="input"
                placeholder="e.g. CMP-2024-12345"
                value={form.complaint_number}
                onChange={e => setForm(p => ({ ...p, complaint_number: e.target.value.toUpperCase() }))}
                required
              />
            </div>
            <div>
              <label className="label">Registered Phone Number</label>
              <input
                className="input"
                placeholder="10-digit mobile number"
                value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary track-submit-btn"
            >
              {loading ? 'Searching…' : '🔎  Track Complaint'}
            </button>
          </form>
        </div>

        {/* ── Result Card ── */}
        {complaint && (
          <div className="track-card track-result-card">

            {/* Complaint title row */}
            <div className="track-result-header">
              <div>
                <span className="track-complaint-number">
                  {complaint.complaint_number}
                </span>
                <h2 className="track-complaint-title">{complaint.title}</h2>
              </div>
              <div className="track-badges">
                <StatusBadge status={complaint.status} />
                <PriorityBadge priority={complaint.priority} />
              </div>
            </div>

            {/* Divider */}
            <div className="track-divider" />

            {/* Progress Steps */}
            <div className="track-section-label">📋 Progress</div>
            <div className="progress-steps mb-4">
              {steps.map((step, i) => {
                const currentIdx = steps.indexOf(complaint.status);
                const isComplete = i <= currentIdx;
                return (
                  <React.Fragment key={step}>
                    <div className="progress-step">
                      <div className={`progress-step-circle ${isComplete ? 'step-active' : 'step-inactive'}`}>
                        {isComplete && i < currentIdx ? '✓' : i + 1}
                      </div>
                      <div className="progress-step-label">{stepLabels[i]}</div>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`progress-line ${isComplete && i < currentIdx ? 'line-active' : 'line-inactive'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Divider */}
            <div className="track-divider" />

            {/* Details Grid */}
            <div className="track-section-label">📁 Complaint Details</div>
            <div className="detail-grid mb-4">
              <div className="detail-item">
                <dt>Category</dt>
                <dd style={{ textTransform: 'capitalize' }}>
                  {complaint.category?.replace('_', ' ')}
                </dd>
              </div>
              <div className="detail-item">
                <dt>Incident Date</dt>
                <dd>{formatDate(complaint.incident_date)}</dd>
              </div>
              <div className="detail-item">
                <dt>Assigned Officer</dt>
                <dd>{complaint.assigned_officer_detail?.full_name || 'Pending assignment'}</dd>
              </div>
              <div className="detail-item">
                <dt>Deadline</dt>
                <dd>{formatDate(complaint.deadline) || '—'}</dd>
              </div>
            </div>

            {/* Escalated Notice */}
            {complaint.status === 'escalated' && (
              <div className="info-box info-box-orange mb-4">
                <p style={{ color: '#9a3412', fontSize: 14, fontWeight: 500 }}>
                  ⚠️ Your complaint has been escalated to senior authorities for faster resolution.
                </p>
              </div>
            )}

            {/* Resolution Notes */}
            {complaint.resolution_notes && (
              <div className="info-box info-box-green mb-4">
                <p style={{ color: '#166534', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                  ✅ Resolution
                </p>
                <p style={{ color: '#166534', fontSize: 14 }}>
                  {complaint.resolution_notes}
                </p>
              </div>
            )}

            {/* Timeline */}
            {complaint.history?.length > 0 && (
              <>
                <div className="track-divider" />
                <div className="track-section-label">🕒 Status History</div>
                <div className="timeline">
                  {complaint.history.map(h => (
                    <div key={h.id} className="timeline-item">
                      <div className="timeline-dot" />
                      <div className="timeline-content">
                        <p style={{ fontSize: 14, color: '#374151' }}>
                          {h.note || `Status changed to ${h.new_status}`}
                        </p>
                        <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
                          {formatDateTime(h.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}