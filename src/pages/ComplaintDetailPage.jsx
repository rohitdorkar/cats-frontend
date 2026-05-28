// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { complaintsAPI, authAPI } from '../services/api';
// import { StatusBadge, PriorityBadge, PageLoader, Modal, Field } from '../components/UI';
// import { formatDate, formatDateTime, PRIORITIES, STATUSES } from '../utils/helpers';
// import { useAuth } from '../context/AuthContext';
// import toast from 'react-hot-toast';

// function AssignModal({ complaintId, open, onClose, onSuccess }) {
//   const [officers, setOfficers] = useState([]);
//   const [form, setForm] = useState({ assigned_officer: '', priority: 'medium', deadline: '', note: '' });
//   const [loading, setLoading] = useState(false);

//   // useEffect(() => { if (open) authAPI.getOfficers().then(r => setOfficers(r.data)); }, [open]);

//   useEffect(() => { 
//   if (open) authAPI.getOfficers()
//     .then(r => setOfficers(r.data.results || r.data)); 
//   }, [open]);

//   // const submit = async () => {
//   //   if (!form.assigned_officer || !form.deadline) return toast.error('Officer and deadline are required');
//   //   setLoading(true);
//   //   try {
//   //     await complaintsAPI.assign(complaintId, form);
//   //     toast.success('Complaint assigned!');
//   //     onSuccess(); onClose();
//   //   } catch { toast.error('Assignment failed'); }
//   //   finally { setLoading(false); }
//   // };
//   const submit = async () => {
//   if (!form.assigned_officer || !form.deadline) return toast.error('Officer and deadline are required');
//   setLoading(true);
//   try {
//     await complaintsAPI.assign(complaintId, {
//       ...form,
//       assigned_officer: parseInt(form.assigned_officer), // ensure integer
//     });
//     toast.success('Complaint assigned!');
//     onSuccess(); onClose();
//   } catch (e) {
//     const msg = e.response?.data;
//     toast.error(msg ? JSON.stringify(msg) : 'Assignment failed');
//   } finally { setLoading(false); }
//   };

//   return (
//     <Modal open={open} onClose={onClose} title="Assign Complaint">
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//         <Field label="Assign Officer *">
//           <select className="input" value={form.assigned_officer} onChange={e => setForm(p => ({ ...p, assigned_officer: e.target.value }))}>
//             <option value="">Select officer…</option>
//             {officers.map(o => <option key={o.id} value={o.id}>{o.full_name} — {o.badge_number}</option>)}
//           </select>
//         </Field>
//         <div className="grid-2">
//           <Field label="Priority *">
//             <select className="input" value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>
//               {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
//             </select>
//           </Field>
//           <Field label="Deadline *">
//             <input type="date" className="input" value={form.deadline} min={new Date().toISOString().split('T')[0]}
//               onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} />
//           </Field>
//         </div>
//         <Field label="Note">
//           <textarea className="input" rows={2} style={{ resize: 'none' }} value={form.note}
//             onChange={e => setForm(p => ({ ...p, note: e.target.value }))} />
//         </Field>
//         <div className="flex gap-3">
//           <button onClick={submit} disabled={loading} className="btn-primary">{loading ? 'Assigning…' : 'Assign'}</button>
//           <button onClick={onClose} className="btn-secondary">Cancel</button>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// function StatusModal({ complaintId, currentStatus, open, onClose, onSuccess }) {
//   const [form, setForm] = useState({ status: currentStatus, note: '' });
//   const [loading, setLoading] = useState(false);
//   useEffect(() => { setForm(p => ({ ...p, status: currentStatus })); }, [currentStatus]);

//   const submit = async () => {
//     setLoading(true);
//     try {
//       await complaintsAPI.updateStatus(complaintId, form);
//       toast.success('Status updated!'); onSuccess(); onClose();
//     } catch { toast.error('Failed to update status'); }
//     finally { setLoading(false); }
//   };

//   return (
//     <Modal open={open} onClose={onClose} title="Update Status">
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//         <Field label="New Status">
//           <select className="input" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
//             {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
//           </select>
//         </Field>
//         <Field label="Note / Remarks">
//           <textarea className="input" rows={3} style={{ resize: 'none' }} value={form.note}
//             onChange={e => setForm(p => ({ ...p, note: e.target.value }))} placeholder="Add a note about this status change…" />
//         </Field>
//         <div className="flex gap-3">
//           <button onClick={submit} disabled={loading} className="btn-primary">{loading ? 'Updating…' : 'Update'}</button>
//           <button onClick={onClose} className="btn-secondary">Cancel</button>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// function EscalateModal({ complaintId, open, onClose, onSuccess }) {
//   const [seniors, setSeniors] = useState([]);
//   const [form, setForm] = useState({ escalated_to: '', reason: '' });
//   const [loading, setLoading] = useState(false);
//   // useEffect(() => { if (open) authAPI.getSeniorOfficers().then(r => setSeniors(r.data)); }, [open]);

//   useEffect(() => { 
//   if (open) authAPI.getSeniorOfficers()
//     .then(r => setSeniors(r.data.results || r.data)); 
//   }, [open]);
  

//   // const submit = async () => {
//   //   if (!form.escalated_to || !form.reason) return toast.error('All fields required');
//   //   setLoading(true);
//   //   try {
//   //     await complaintsAPI.escalate(complaintId, form);
//   //     toast.success('Complaint escalated!'); onSuccess(); onClose();
//   //   } catch { toast.error('Escalation failed'); }
//   //   finally { setLoading(false); }
//   // };
//   const submit = async () => {
//   if (!form.escalated_to || !form.reason) return toast.error('All fields required');
//   setLoading(true);
//   try {
//     await complaintsAPI.escalate(complaintId, {
//       ...form,
//       escalated_to: parseInt(form.escalated_to), // ensure integer
//     });
//     toast.success('Complaint escalated!'); onSuccess(); onClose();
//   } catch (e) {
//     const msg = e.response?.data;
//     toast.error(msg ? JSON.stringify(msg) : 'Escalation failed');
//   } finally { setLoading(false); }
//   };

//   return (
//     <Modal open={open} onClose={onClose} title="Escalate to Senior Officer">
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//         <Field label="Senior Officer *">
//           <select className="input" value={form.escalated_to} onChange={e => setForm(p => ({ ...p, escalated_to: e.target.value }))}>
//             <option value="">Select senior officer…</option>
//             {seniors.map(o => <option key={o.id} value={o.id}>{o.full_name}</option>)}
//           </select>
//         </Field>
//         <Field label="Reason for Escalation *">
//           <textarea className="input" rows={3} style={{ resize: 'none' }} value={form.reason}
//             onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} placeholder="Why is this being escalated?" />
//         </Field>
//         <div className="flex gap-3">
//           <button onClick={submit} disabled={loading} className="btn-danger">{loading ? 'Escalating…' : 'Escalate'}</button>
//           <button onClick={onClose} className="btn-secondary">Cancel</button>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// function ReassignModal({ complaintId, open, onClose, onSuccess }) {
//   const [officers, setOfficers] = useState([]);
//   const [form, setForm] = useState({ assigned_officer: '', priority: 'high', deadline: '', note: '' });
//   const [loading, setLoading] = useState(false);
//   // useEffect(() => { if (open) authAPI.getOfficers().then(r => setOfficers(r.data)); }, [open]);

//   useEffect(() => { 
//   if (open) authAPI.getOfficers()
//     .then(r => setOfficers(r.data.results || r.data)); 
//   }, [open]);

//   // const submit = async () => {
//   //   if (!form.assigned_officer || !form.deadline) return toast.error('All required fields must be filled');
//   //   setLoading(true);
//   //   try {
//   //     await complaintsAPI.reassign(complaintId, form);
//   //     toast.success('Complaint reassigned!'); onSuccess(); onClose();
//   //   } catch { toast.error('Reassignment failed'); }
//   //   finally { setLoading(false); }
//   // };
//   const submit = async () => {
//     if (!form.assigned_officer || !form.deadline) return toast.error('All required fields must be filled');
//     setLoading(true);
//     try {
//       await complaintsAPI.reassign(complaintId, {
//         ...form,
//         assigned_officer: parseInt(form.assigned_officer), // ensure integer
//       });
//       toast.success('Complaint reassigned!'); onSuccess(); onClose();
//     } catch (e) {
//       const msg = e.response?.data;
//       toast.error(msg ? JSON.stringify(msg) : 'Reassignment failed');
//     } finally { setLoading(false); }
//   };

//   return (
//     <Modal open={open} onClose={onClose} title="Reassign Complaint (Senior Override)">
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//         <Field label="Reassign to Officer *">
//           <select className="input" value={form.assigned_officer} onChange={e => setForm(p => ({ ...p, assigned_officer: e.target.value }))}>
//             <option value="">Select officer…</option>
//             {officers.map(o => <option key={o.id} value={o.id}>{o.full_name} — {o.badge_number}</option>)}
//           </select>
//         </Field>
//         <div className="grid-2">
//           <Field label="New Priority *">
//             <select className="input" value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>
//               {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
//             </select>
//           </Field>
//           <Field label="New Deadline *">
//             <input type="date" className="input" value={form.deadline} min={new Date().toISOString().split('T')[0]}
//               onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} />
//           </Field>
//         </div>
//         <Field label="Remarks">
//           <textarea className="input" rows={2} style={{ resize: 'none' }} value={form.note}
//             onChange={e => setForm(p => ({ ...p, note: e.target.value }))} />
//         </Field>
//         <div className="flex gap-3">
//           <button onClick={submit} disabled={loading} className="btn-primary">{loading ? 'Reassigning…' : 'Reassign'}</button>
//           <button onClick={onClose} className="btn-secondary">Cancel</button>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// export default function ComplaintDetailPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { isRole } = useAuth();
//   const [complaint, setComplaint] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [modals, setModals] = useState({ assign: false, status: false, escalate: false, reassign: false });

//   const openModal = name => setModals(p => ({ ...p, [name]: true }));
//   const closeModal = name => setModals(p => ({ ...p, [name]: false }));

//   const fetchComplaint = async () => {
//     try {
//       const res = await complaintsAPI.get(id);
//       setComplaint(res.data);
//     } catch { navigate('/complaints'); }
//     finally { setLoading(false); }
//   };

//   useEffect(() => { fetchComplaint(); }, [id]);

//   if (loading) return <PageLoader />;
//   if (!complaint) return null;

//   const canAssign = isRole('operator', 'admin') && ['pending', 'rejected'].includes(complaint.status);
//   const canUpdateStatus = isRole('officer', 'operator', 'admin', 'senior') && !['resolved', 'closed'].includes(complaint.status);
//   const canEscalate = isRole('operator', 'admin') && !['escalated', 'resolved', 'closed'].includes(complaint.status);
//   const canReassign = isRole('senior', 'admin') && complaint.status === 'escalated';

//   return (
//     <div className="page">
//       {/* Header */}
//       <div className="page-header mb-4">
//         <div>
//           <button onClick={() => navigate(-1)} style={{ color: '#1d4ed8', fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 8, display: 'block' }}>← Back</button>
//           <h1 className="page-title">{complaint.title}</h1>
//           <p style={{ fontFamily: 'monospace', fontSize: 13, color: '#6b7280', marginTop: 4 }}>{complaint.complaint_number}</p>
//         </div>
//         <div className="flex-center gap-2">
//           <h2 style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>Status:</h2> <StatusBadge status={complaint.status} /> 
//           <h2 style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>Priority:</h2> <PriorityBadge priority={complaint.priority} /> 
//           {complaint.is_overdue && <span className="badge badge-rejected">⚠️ Overdue</span>}
//         </div>
//       </div>

//       {/* Actions */}
//       <div className="flex-wrap gap-3 mb-6">
//         {canAssign && <button onClick={() => openModal('assign')} className="btn-primary">Assign Officer</button>}
//         {canUpdateStatus && <button onClick={() => openModal('status')} className="btn-secondary">Update Status</button>}
//         {canEscalate && <button onClick={() => openModal('escalate')} className="btn-danger">Escalate</button>}
//         {canReassign && <button onClick={() => openModal('reassign')} className="btn-primary">Reassign (Senior)</button>}
//       </div>

//       <div className="detail-layout">
//         {/* Left */}
//         <div>
//           {/* Complaint Info */}
//           <div className="card detail-section">
//             <h2>Complaint Details</h2>
//             <div className="detail-grid">
//               <div className="detail-item"><dt>Category</dt><dd style={{ textTransform: 'capitalize' }}>{complaint.category?.replace('_', ' ')}</dd></div>
//               <div className="detail-item"><dt>Incident Date</dt><dd>{formatDate(complaint.incident_date)}</dd></div>
//               <div className="detail-item" style={{ gridColumn: '1 / -1' }}><dt>Incident Location</dt><dd>{complaint.incident_location}</dd></div>
//               <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
//                 <dt>Description</dt>
//                 <dd style={{ marginTop: 6, lineHeight: 1.6, whiteSpace: 'pre-wrap', color: '#374151' }}>{complaint.description}</dd>
//               </div>
//             </div>
//           </div>

//           {/* Escalation */}
//           {complaint.status === 'escalated' && (
//             <div className="info-box info-box-orange detail-section">
//               <h2 style={{ color: '#9a3412', marginBottom: 8 }}>⚠️ Escalation Info</h2>
//               <p style={{ fontSize: 14, color: '#9a3412' }}><strong>Escalated to:</strong> {complaint.escalated_to_detail?.full_name}</p>
//               <p style={{ fontSize: 14, color: '#9a3412', marginTop: 4 }}><strong>Reason:</strong> {complaint.escalation_reason}</p>
//               <p style={{ fontSize: 14, color: '#9a3412', marginTop: 4 }}><strong>At:</strong> {formatDateTime(complaint.escalated_at)}</p>
//             </div>
//           )}

//           {/* Resolution */}
//           {complaint.resolution_notes && (
//             <div className="info-box info-box-green detail-section">
//               <h2 style={{ color: '#166534', marginBottom: 8 }}>✅ Resolution</h2>
//               <p style={{ fontSize: 14, color: '#166534' }}>{complaint.resolution_notes}</p>
//               <p style={{ fontSize: 12, color: '#16a34a', marginTop: 6 }}>Resolved at: {formatDateTime(complaint.resolved_at)}</p>
//             </div>
//           )}

//           {/* Timeline */}
//           <div className="card detail-section">
//             <h2>Activity Timeline</h2>
//             {complaint.history?.length === 0 ? (
//               <p style={{ color: '#9ca3af', fontSize: 14 }}>No activity yet</p>
//             ) : (
//               <div className="timeline">
//                 {complaint.history?.map(h => (
//                   <div key={h.id} className="timeline-item">
//                     <div className="timeline-dot" />
//                     <div className="timeline-content">
//                       <div className="flex-center gap-2" style={{ marginBottom: 4 }}>
//                         <span style={{ fontSize: 14, fontWeight: 500 }}>Status →</span>
//                         <StatusBadge status={h.new_status} />
//                       </div>
//                       {h.new_officer_name && <p style={{ fontSize: 13, color: '#6b7280' }}>Officer: {h.new_officer_name}</p>}
//                       {h.note && <p style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>{h.note}</p>}
//                       <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{formatDateTime(h.created_at)} · {h.changed_by_name}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <div>
//           <div className="card" style={{ marginBottom: 16 }}>
//             <h2 style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 12 }}>Citizen Details</h2>
//             <p style={{ fontWeight: 600, color: '#111827' }}>{complaint.complainant_name}</p>
//             <p style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>{complaint.complainant_phone}</p>
//             {complaint.complainant_email && <p style={{ fontSize: 14, color: '#6b7280' }}>{complaint.complainant_email}</p>}
//             <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 8 }}>{complaint.complainant_address}</p>
//           </div>

//           <div className="card" style={{ marginBottom: 16 }}>
//             <h2 style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 12 }}>Assignment Details</h2>
//             {[
//               ['Officer', complaint.assigned_officer_detail?.full_name || '—'],
//               ['Deadline', formatDate(complaint.deadline) || '—'],
//               ['Filed by', complaint.submitted_by_detail?.full_name || '—'],
//               ['Filed on', formatDateTime(complaint.created_at)],
//             ].map(([label, value]) => (
//               <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
//                 <span style={{ color: '#6b7280' }}>{label}:</span>
//                 <span style={{ fontWeight: 500 }}>{value}</span>
//               </div>
//             ))}
//           </div>

//           {complaint.notifications?.length > 0 && (
//             <div className="card">
//               <h2 style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 12 }}>SMS Notifications</h2>
//               {complaint.notifications.map(n => (
//                 <div key={n.id} className="notif-item">
//                   <p className={n.sent ? 'notif-sent' : 'notif-failed'}>{n.sent ? '✓ Sent' : '✗ Failed'}</p>
//                   <p style={{ color: '#6b7280', marginTop: 2 }}>{n.message}</p>
//                   <p style={{ color: '#9ca3af', marginTop: 2 }}>{formatDateTime(n.created_at)}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <AssignModal complaintId={id} open={modals.assign} onClose={() => closeModal('assign')} onSuccess={fetchComplaint} />
//       <StatusModal complaintId={id} currentStatus={complaint.status} open={modals.status} onClose={() => closeModal('status')} onSuccess={fetchComplaint} />
//       <EscalateModal complaintId={id} open={modals.escalate} onClose={() => closeModal('escalate')} onSuccess={fetchComplaint} />
//       <ReassignModal complaintId={id} open={modals.reassign} onClose={() => closeModal('reassign')} onSuccess={fetchComplaint} />
//     </div>
//   );
// }




// -------------------------------------------------------------------------------------------------------------------


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { complaintsAPI, authAPI } from '../services/api';
// import { StatusBadge, PriorityBadge, PageLoader, Modal, Field } from '../components/UI';
// import { formatDate, formatDateTime, PRIORITIES, STATUSES } from '../utils/helpers';
// import { useAuth } from '../context/AuthContext';
// import toast from 'react-hot-toast';

// function AssignModal({ complaintId, open, onClose, onSuccess }) {
//   const [officers, setOfficers] = useState([]);
//   const [form, setForm] = useState({ assigned_officer: '', priority: 'medium', deadline: '', note: '' });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (open) authAPI.getOfficers()
//       .then(r => setOfficers(r.data.results || r.data));
//   }, [open]);

//   const submit = async () => {
//     if (!form.assigned_officer || !form.deadline) return toast.error('Officer and deadline are required');
//     setLoading(true);
//     try {
//       await complaintsAPI.assign(complaintId, {
//         ...form,
//         assigned_officer: parseInt(form.assigned_officer),
//       });
//       toast.success('Complaint assigned!');
//       onSuccess(); onClose();
//     } catch (e) {
//       const msg = e.response?.data;
//       toast.error(msg ? JSON.stringify(msg) : 'Assignment failed');
//     } finally { setLoading(false); }
//   };

//   return (
//     <Modal open={open} onClose={onClose} title="Assign Complaint">
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//         <Field label="Assign Officer *">
//           <select className="input" value={form.assigned_officer}
//             onChange={e => setForm(p => ({ ...p, assigned_officer: e.target.value }))}>
//             <option value="">Select officer…</option>
//             {officers.map(o => (
//               <option key={o.id} value={o.id}>{o.full_name} — {o.badge_number}</option>
//             ))}
//           </select>
//         </Field>
//         <div className="grid-2">
//           <Field label="Priority *">
//             <select className="input" value={form.priority}
//               onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>
//               {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
//             </select>
//           </Field>
//           <Field label="Deadline *">
//             <input type="date" className="input" value={form.deadline}
//               min={new Date().toISOString().split('T')[0]}
//               onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} />
//           </Field>
//         </div>
//         <Field label="Note">
//           <textarea className="input" rows={2} style={{ resize: 'none' }} value={form.note}
//             onChange={e => setForm(p => ({ ...p, note: e.target.value }))} />
//         </Field>
//         <div className="flex gap-3">
//           <button onClick={submit} disabled={loading} className="btn-primary">
//             {loading ? 'Assigning…' : 'Assign'}
//           </button>
//           <button onClick={onClose} className="btn-secondary">Cancel</button>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// function StatusModal({ complaintId, currentStatus, open, onClose, onSuccess }) {
//   const [form, setForm] = useState({ status: currentStatus, note: '' });
//   const [loading, setLoading] = useState(false);
//   useEffect(() => { setForm(p => ({ ...p, status: currentStatus })); }, [currentStatus]);

//   const submit = async () => {
//     setLoading(true);
//     try {
//       await complaintsAPI.updateStatus(complaintId, form);
//       toast.success('Status updated!'); onSuccess(); onClose();
//     } catch { toast.error('Failed to update status'); }
//     finally { setLoading(false); }
//   };

//   return (
//     <Modal open={open} onClose={onClose} title="Update Status">
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//         <Field label="New Status">
//           <select className="input" value={form.status}
//             onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
//             {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
//           </select>
//         </Field>
//         <Field label="Note / Remarks">
//           <textarea className="input" rows={3} style={{ resize: 'none' }} value={form.note}
//             onChange={e => setForm(p => ({ ...p, note: e.target.value }))}
//             placeholder="Add a note about this status change…" />
//         </Field>
//         <div className="flex gap-3">
//           <button onClick={submit} disabled={loading} className="btn-primary">
//             {loading ? 'Updating…' : 'Update'}
//           </button>
//           <button onClick={onClose} className="btn-secondary">Cancel</button>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// function EscalateModal({ complaintId, open, onClose, onSuccess }) {
//   const [seniors, setSeniors] = useState([]);
//   const [form, setForm] = useState({ escalated_to: '', reason: '' });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (open) authAPI.getSeniorOfficers()
//       .then(r => setSeniors(r.data.results || r.data));
//   }, [open]);

//   const submit = async () => {
//     if (!form.escalated_to || !form.reason) return toast.error('All fields required');
//     setLoading(true);
//     try {
//       await complaintsAPI.escalate(complaintId, {
//         ...form,
//         escalated_to: parseInt(form.escalated_to),
//       });
//       toast.success('Complaint escalated!'); onSuccess(); onClose();
//     } catch (e) {
//       const msg = e.response?.data;
//       toast.error(msg ? JSON.stringify(msg) : 'Escalation failed');
//     } finally { setLoading(false); }
//   };

//   return (
//     <Modal open={open} onClose={onClose} title="Escalate to Senior Officer">
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//         <Field label="Senior Officer *">
//           <select className="input" value={form.escalated_to}
//             onChange={e => setForm(p => ({ ...p, escalated_to: e.target.value }))}>
//             <option value="">Select senior officer…</option>
//             {seniors.map(o => <option key={o.id} value={o.id}>{o.full_name}</option>)}
//           </select>
//         </Field>
//         <Field label="Reason for Escalation *">
//           <textarea className="input" rows={3} style={{ resize: 'none' }} value={form.reason}
//             onChange={e => setForm(p => ({ ...p, reason: e.target.value }))}
//             placeholder="Why is this being escalated?" />
//         </Field>
//         <div className="flex gap-3">
//           <button onClick={submit} disabled={loading} className="btn-danger">
//             {loading ? 'Escalating…' : 'Escalate'}
//           </button>
//           <button onClick={onClose} className="btn-secondary">Cancel</button>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// function ReassignModal({ complaintId, open, onClose, onSuccess }) {
//   const [officers, setOfficers] = useState([]);
//   const [form, setForm] = useState({ assigned_officer: '', priority: 'high', deadline: '', note: '' });
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (open) authAPI.getOfficers()
//       .then(r => setOfficers(r.data.results || r.data));
//   }, [open]);

//   const submit = async () => {
//     if (!form.assigned_officer || !form.deadline) return toast.error('All required fields must be filled');
//     setLoading(true);
//     try {
//       await complaintsAPI.reassign(complaintId, {
//         ...form,
//         assigned_officer: parseInt(form.assigned_officer),
//       });
//       toast.success('Complaint reassigned!'); onSuccess(); onClose();
//     } catch (e) {
//       const msg = e.response?.data;
//       toast.error(msg ? JSON.stringify(msg) : 'Reassignment failed');
//     } finally { setLoading(false); }
//   };

//   return (
//     <Modal open={open} onClose={onClose} title="Reassign Complaint (Senior Override)">
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//         <Field label="Reassign to Officer *">
//           <select className="input" value={form.assigned_officer}
//             onChange={e => setForm(p => ({ ...p, assigned_officer: e.target.value }))}>
//             <option value="">Select officer…</option>
//             {officers.map(o => (
//               <option key={o.id} value={o.id}>{o.full_name} — {o.badge_number}</option>
//             ))}
//           </select>
//         </Field>
//         <div className="grid-2">
//           <Field label="New Priority *">
//             <select className="input" value={form.priority}
//               onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>
//               {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
//             </select>
//           </Field>
//           <Field label="New Deadline *">
//             <input type="date" className="input" value={form.deadline}
//               min={new Date().toISOString().split('T')[0]}
//               onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} />
//           </Field>
//         </div>
//         <Field label="Remarks">
//           <textarea className="input" rows={2} style={{ resize: 'none' }} value={form.note}
//             onChange={e => setForm(p => ({ ...p, note: e.target.value }))} />
//         </Field>
//         <div className="flex gap-3">
//           <button onClick={submit} disabled={loading} className="btn-primary">
//             {loading ? 'Reassigning…' : 'Reassign'}
//           </button>
//           <button onClick={onClose} className="btn-secondary">Cancel</button>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// export default function ComplaintDetailPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { isRole } = useAuth();
//   const [complaint, setComplaint] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [modals, setModals] = useState({
//     assign: false, status: false, escalate: false, reassign: false
//   });

//   const openModal = name => setModals(p => ({ ...p, [name]: true }));
//   const closeModal = name => setModals(p => ({ ...p, [name]: false }));

//   const fetchComplaint = async () => {
//     try {
//       const res = await complaintsAPI.get(id);
//       setComplaint(res.data);
//     } catch { navigate('/complaints'); }
//     finally { setLoading(false); }
//   };

//   useEffect(() => { fetchComplaint(); }, [id]);

//   if (loading) return <PageLoader />;
//   if (!complaint) return null;

//   const canAssign = isRole('operator', 'admin') && ['pending', 'rejected'].includes(complaint.status);
//   const canUpdateStatus = isRole('officer', 'operator', 'admin', 'senior') && !['resolved', 'closed'].includes(complaint.status);
//   const canEscalate = isRole('operator', 'admin') && !['escalated', 'resolved', 'closed'].includes(complaint.status);
//   const canReassign = isRole('senior', 'admin') && complaint.status === 'escalated';

//   return (
//     <div className="page">

//       {/* Page Header Banner */}
//       <div className="detail-header-banner mb-6">
//         <div className="detail-header-left">
//           <button
//             onClick={() => navigate(-1)}
//             className="detail-back-btn"
//           >
//             ← Back to Complaints
//           </button>
//           <h1 className="detail-header-title">{complaint.title}</h1>
//           <div className="detail-header-meta">
//             <span className="detail-complaint-number">{complaint.complaint_number}</span>
//             <span className="detail-meta-dot">·</span>
//             <span className="detail-meta-date">Filed on {formatDate(complaint.created_at)}</span>
//             {complaint.is_overdue && (
//               <span className="detail-overdue-pill">⚠️ Overdue</span>
//             )}
//           </div>
//         </div>
//         <div className="detail-header-right">
//           <div className="detail-status-group">
//             <div className="detail-status-item">
//               <span className="detail-status-label">Status</span>
//               <StatusBadge status={complaint.status} />
//             </div>
//             <div className="detail-status-divider" />
//             <div className="detail-status-item">
//               <span className="detail-status-label">Priority</span>
//               <PriorityBadge priority={complaint.priority} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       {(canAssign || canUpdateStatus || canEscalate || canReassign) && (
//         <div className="detail-actions-bar mb-6">
//           <span className="detail-actions-label">Actions</span>
//           <div className="detail-actions-group">
//             {canAssign && (
//               <button onClick={() => openModal('assign')} className="detail-action-btn detail-action-primary">
//                 👮 Assign Officer
//               </button>
//             )}
//             {canUpdateStatus && (
//               <button onClick={() => openModal('status')} className="detail-action-btn detail-action-secondary">
//                 🔄 Update Status
//               </button>
//             )}
//             {canEscalate && (
//               <button onClick={() => openModal('escalate')} className="detail-action-btn detail-action-danger">
//                 ⬆️ Escalate
//               </button>
//             )}
//             {canReassign && (
//               <button onClick={() => openModal('reassign')} className="detail-action-btn detail-action-primary">
//                 🔁 Reassign (Senior)
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Main Layout */}
//       <div className="detail-layout">

//         {/* Left Column */}
//         <div>

//           {/* Complaint Details Card */}
//           <div className="detail-card mb-4">
//             <div className="detail-card-header">
//               <span className="detail-card-icon">📋</span>
//               <h2 className="detail-card-title">Complaint Details</h2>
//             </div>
//             <div className="detail-card-body">
//               <div className="detail-grid">
//                 <div className="detail-item">
//                   <dt>Category</dt>
//                   <dd style={{ textTransform: 'capitalize' }}>
//                     {complaint.category?.replace('_', ' ')}
//                   </dd>
//                 </div>
//                 <div className="detail-item">
//                   <dt>Incident Date</dt>
//                   <dd>{formatDate(complaint.incident_date)}</dd>
//                 </div>
//                 <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
//                   <dt>Incident Location</dt>
//                   <dd>{complaint.incident_location}</dd>
//                 </div>
//                 <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
//                   <dt>Description</dt>
//                   <dd className="detail-description">{complaint.description}</dd>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Escalation Info */}
//           {complaint.status === 'escalated' && (
//             <div className="detail-alert detail-alert-orange mb-4">
//               <div className="detail-alert-header">
//                 <span>⚠️</span>
//                 <h3>Escalation Information</h3>
//               </div>
//               <div className="detail-alert-body">
//                 <div className="detail-alert-row">
//                   <span>Escalated to</span>
//                   <strong>{complaint.escalated_to_detail?.full_name}</strong>
//                 </div>
//                 <div className="detail-alert-row">
//                   <span>Reason</span>
//                   <strong>{complaint.escalation_reason}</strong>
//                 </div>
//                 <div className="detail-alert-row">
//                   <span>Escalated at</span>
//                   <strong>{formatDateTime(complaint.escalated_at)}</strong>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Resolution Info */}
//           {complaint.resolution_notes && (
//             <div className="detail-alert detail-alert-green mb-4">
//               <div className="detail-alert-header">
//                 <span>✅</span>
//                 <h3>Complaint Resolved</h3>
//               </div>
//               <div className="detail-alert-body">
//                 <p style={{ fontSize: 14, color: '#166534', lineHeight: 1.6 }}>
//                   {complaint.resolution_notes}
//                 </p>
//                 <p style={{ fontSize: 12, color: '#16a34a', marginTop: 8 }}>
//                   Resolved at: {formatDateTime(complaint.resolved_at)}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Activity Timeline */}
//           <div className="detail-card">
//             <div className="detail-card-header">
//               <span className="detail-card-icon">🕐</span>
//               <h2 className="detail-card-title">Activity Timeline</h2>
//               {complaint.history?.length > 0 && (
//                 <span className="detail-card-count">
//                   {complaint.history.length} events
//                 </span>
//               )}
//             </div>
//             <div className="detail-card-body">
//               {!complaint.history?.length ? (
//                 <p style={{ color: '#9ca3af', fontSize: 14 }}>No activity recorded yet.</p>
//               ) : (
//                 <div className="detail-timeline">
//                   {complaint.history.map((h, i) => (
//                     <div key={h.id} className="detail-timeline-item">
//                       <div className="detail-timeline-left">
//                         <div className="detail-timeline-dot" />
//                         {i < complaint.history.length - 1 && (
//                           <div className="detail-timeline-line" />
//                         )}
//                       </div>
//                       <div className="detail-timeline-content">
//                         <div className="detail-timeline-top">
//                           <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>
//                             Status changed to
//                           </span>
//                           <StatusBadge status={h.new_status} />
//                         </div>
//                         {h.new_officer_name && (
//                           <p className="detail-timeline-sub">
//                             👮 Officer: {h.new_officer_name}
//                           </p>
//                         )}
//                         {h.note && (
//                           <p className="detail-timeline-note">{h.note}</p>
//                         )}
//                         <p className="detail-timeline-time">
//                           {formatDateTime(h.created_at)}
//                           {h.changed_by_name && ` · by ${h.changed_by_name}`}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//         </div>

//         {/* Right Column */}
//         <div>

//           {/* Citizen Details */}
//           <div className="detail-card mb-4">
//             <div className="detail-card-header">
//               <span className="detail-card-icon">👤</span>
//               <h2 className="detail-card-title">Citizen Details</h2>
//             </div>
//             <div className="detail-card-body">
//               <div className="detail-citizen-avatar">
//                 {complaint.complainant_name?.[0]?.toUpperCase()}
//               </div>
//               <p className="detail-citizen-name">{complaint.complainant_name}</p>
//               <div className="detail-citizen-info">
//                 <div className="detail-citizen-row">
//                   <span>📱</span>
//                   <span>{complaint.complainant_phone}</span>
//                 </div>
//                 {complaint.complainant_email && (
//                   <div className="detail-citizen-row">
//                     <span>✉️</span>
//                     <span>{complaint.complainant_email}</span>
//                   </div>
//                 )}
//                 <div className="detail-citizen-row">
//                   <span>📍</span>
//                   <span>{complaint.complainant_address}</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Assignment Details */}
//           <div className="detail-card mb-4">
//             <div className="detail-card-header">
//               <span className="detail-card-icon">📌</span>
//               <h2 className="detail-card-title">Assignment Details</h2>
//             </div>
//             <div className="detail-card-body">
//               {[
//                 ['👮 Officer', complaint.assigned_officer_detail?.full_name || 'Not assigned'],
//                 ['📅 Deadline', formatDate(complaint.deadline) || '—'],
//                 ['🗂️ Filed by', complaint.submitted_by_detail?.full_name || '—'],
//                 ['🕐 Filed on', formatDateTime(complaint.created_at)],
//               ].map(([label, value]) => (
//                 <div key={label} className="detail-assignment-row">
//                   <span className="detail-assignment-label">{label}</span>
//                   <span className="detail-assignment-value">{value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* SMS Notifications */}
//           {complaint.notifications?.length > 0 && (
//             <div className="detail-card">
//               <div className="detail-card-header">
//                 <span className="detail-card-icon">📱</span>
//                 <h2 className="detail-card-title">SMS Notifications</h2>
//                 <span className="detail-card-count">
//                   {complaint.notifications.length} sent
//                 </span>
//               </div>
//               <div className="detail-card-body">
//                 {complaint.notifications.map(n => (
//                   <div key={n.id} className="detail-notif-item">
//                     <div className="detail-notif-status">
//                       <span className={n.sent ? 'detail-notif-sent' : 'detail-notif-failed'}>
//                         {n.sent ? '✓ Delivered' : '✗ Failed'}
//                       </span>
//                       <span className="detail-notif-time">
//                         {formatDateTime(n.created_at)}
//                       </span>
//                     </div>
//                     <p className="detail-notif-message">{n.message}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//         </div>
//       </div>

//       {/* Modals */}
//       <AssignModal complaintId={id} open={modals.assign}
//         onClose={() => closeModal('assign')} onSuccess={fetchComplaint} />
//       <StatusModal complaintId={id} currentStatus={complaint.status}
//         open={modals.status} onClose={() => closeModal('status')} onSuccess={fetchComplaint} />
//       <EscalateModal complaintId={id} open={modals.escalate}
//         onClose={() => closeModal('escalate')} onSuccess={fetchComplaint} />
//       <ReassignModal complaintId={id} open={modals.reassign}
//         onClose={() => closeModal('reassign')} onSuccess={fetchComplaint} />
//     </div>
//   );
// }



// ---------------------------------------------------------------------------------------------------
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { complaintsAPI, authAPI } from '../services/api';
import { StatusBadge, PriorityBadge, PageLoader, Modal, Field } from '../components/UI';
import { formatDate, formatDateTime, PRIORITIES, STATUSES } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function AssignModal({ complaintId, open, onClose, onSuccess }) {
  const [officers, setOfficers] = useState([]);
  const [form, setForm] = useState({ assigned_officer: '', priority: 'medium', deadline: '', note: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) authAPI.getOfficers()
      .then(r => setOfficers(r.data.results || r.data));
  }, [open]);

  const submit = async () => {
    if (!form.assigned_officer || !form.deadline) return toast.error('Officer and deadline are required');
    setLoading(true);
    try {
      await complaintsAPI.assign(complaintId, {
        ...form,
        assigned_officer: parseInt(form.assigned_officer),
      });
      toast.success('Complaint assigned!');
      onSuccess(); onClose();
    } catch (e) {
      const msg = e.response?.data;
      toast.error(msg ? JSON.stringify(msg) : 'Assignment failed');
    } finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title="Assign Complaint">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Field label="Assign Officer *">
          <select className="input" value={form.assigned_officer}
            onChange={e => setForm(p => ({ ...p, assigned_officer: e.target.value }))}>
            <option value="">Select officer…</option>
            {officers.map(o => (
              <option key={o.id} value={o.id}>{o.full_name} — {o.badge_number}</option>
            ))}
          </select>
        </Field>
        <div className="grid-2">
          <Field label="Priority *">
            <select className="input" value={form.priority}
              onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>
              {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </Field>
          <Field label="Deadline *">
            <input type="date" className="input" value={form.deadline}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} />
          </Field>
        </div>
        <Field label="Note">
          <textarea className="input" rows={2} style={{ resize: 'none' }} value={form.note}
            onChange={e => setForm(p => ({ ...p, note: e.target.value }))} />
        </Field>
        <div className="flex gap-3">
          <button onClick={submit} disabled={loading} className="btn-primary">
            {loading ? 'Assigning…' : 'Assign'}
          </button>
          <button onClick={onClose} className="btn-secondary">Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

function StatusModal({ complaintId, currentStatus, open, onClose, onSuccess }) {
  const [form, setForm] = useState({ status: currentStatus, note: '' });
  const [loading, setLoading] = useState(false);
  useEffect(() => { setForm(p => ({ ...p, status: currentStatus })); }, [currentStatus]);

  const submit = async () => {
    setLoading(true);
    try {
      await complaintsAPI.updateStatus(complaintId, form);
      toast.success('Status updated!'); onSuccess(); onClose();
    } catch { toast.error('Failed to update status'); }
    finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title="Update Status">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Field label="New Status">
          <select className="input" value={form.status}
            onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
            {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </Field>
        <Field label="Note / Remarks">
          <textarea className="input" rows={3} style={{ resize: 'none' }} value={form.note}
            onChange={e => setForm(p => ({ ...p, note: e.target.value }))}
            placeholder="Add a note about this status change…" />
        </Field>
        <div className="flex gap-3">
          <button onClick={submit} disabled={loading} className="btn-primary">
            {loading ? 'Updating…' : 'Update'}
          </button>
          <button onClick={onClose} className="btn-secondary">Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

function EscalateModal({ complaintId, open, onClose, onSuccess }) {
  const [seniors, setSeniors] = useState([]);
  const [form, setForm] = useState({ escalated_to: '', reason: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) authAPI.getSeniorOfficers()
      .then(r => setSeniors(r.data.results || r.data));
  }, [open]);

  const submit = async () => {
    if (!form.escalated_to || !form.reason) return toast.error('All fields required');
    setLoading(true);
    try {
      await complaintsAPI.escalate(complaintId, {
        ...form,
        escalated_to: parseInt(form.escalated_to),
      });
      toast.success('Complaint escalated!'); onSuccess(); onClose();
    } catch (e) {
      const msg = e.response?.data;
      toast.error(msg ? JSON.stringify(msg) : 'Escalation failed');
    } finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title="Escalate to Senior Officer">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Field label="Senior Officer *">
          <select className="input" value={form.escalated_to}
            onChange={e => setForm(p => ({ ...p, escalated_to: e.target.value }))}>
            <option value="">Select senior officer…</option>
            {seniors.map(o => <option key={o.id} value={o.id}>{o.full_name}</option>)}
          </select>
        </Field>
        <Field label="Reason for Escalation *">
          <textarea className="input" rows={3} style={{ resize: 'none' }} value={form.reason}
            onChange={e => setForm(p => ({ ...p, reason: e.target.value }))}
            placeholder="Why is this being escalated?" />
        </Field>
        <div className="flex gap-3">
          <button onClick={submit} disabled={loading} className="btn-danger">
            {loading ? 'Escalating…' : 'Escalate'}
          </button>
          <button onClick={onClose} className="btn-secondary">Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

function ReassignModal({ complaintId, open, onClose, onSuccess }) {
  const [officers, setOfficers] = useState([]);
  const [form, setForm] = useState({ assigned_officer: '', priority: 'high', deadline: '', note: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) authAPI.getOfficers()
      .then(r => setOfficers(r.data.results || r.data));
  }, [open]);

  const submit = async () => {
    if (!form.assigned_officer || !form.deadline) return toast.error('All required fields must be filled');
    setLoading(true);
    try {
      await complaintsAPI.reassign(complaintId, {
        ...form,
        assigned_officer: parseInt(form.assigned_officer),
      });
      toast.success('Complaint reassigned!'); onSuccess(); onClose();
    } catch (e) {
      const msg = e.response?.data;
      toast.error(msg ? JSON.stringify(msg) : 'Reassignment failed');
    } finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title="Reassign Complaint (Senior Override)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Field label="Reassign to Officer *">
          <select className="input" value={form.assigned_officer}
            onChange={e => setForm(p => ({ ...p, assigned_officer: e.target.value }))}>
            <option value="">Select officer…</option>
            {officers.map(o => (
              <option key={o.id} value={o.id}>{o.full_name} — {o.badge_number}</option>
            ))}
          </select>
        </Field>
        <div className="grid-2">
          <Field label="New Priority *">
            <select className="input" value={form.priority}
              onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>
              {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </Field>
          <Field label="New Deadline *">
            <input type="date" className="input" value={form.deadline}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} />
          </Field>
        </div>
        <Field label="Remarks">
          <textarea className="input" rows={2} style={{ resize: 'none' }} value={form.note}
            onChange={e => setForm(p => ({ ...p, note: e.target.value }))} />
        </Field>
        <div className="flex gap-3">
          <button onClick={submit} disabled={loading} className="btn-primary">
            {loading ? 'Reassigning…' : 'Reassign'}
          </button>
          <button onClick={onClose} className="btn-secondary">Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

// ── NEW: Printable Complaint Component ─────────────
function PrintableComplaint({ complaint }) {
  return (
    <div className="print-only">
      {/* Print Header */}
      <div className="print-header">
        <div className="print-logo-section">
          <div className="print-logo">🚔</div>
          <div>
            <h1 className="print-org-name">CATS — Complaint Application Tracking System</h1>
            <p className="print-org-sub">Official Complaint Report</p>
          </div>
        </div>
        <div className="print-complaint-number">
          {complaint.complaint_number}
        </div>
      </div>

      <div className="print-divider" />

      {/* Status Row */}
      <div className="print-status-row">
        <div className="print-status-item">
          <span className="print-label">Status</span>
          <span className="print-value print-status-badge">
            {complaint.status?.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        <div className="print-status-item">
          <span className="print-label">Priority</span>
          <span className="print-value">{complaint.priority?.toUpperCase()}</span>
        </div>
        <div className="print-status-item">
          <span className="print-label">Filed On</span>
          <span className="print-value">{formatDateTime(complaint.created_at)}</span>
        </div>
        <div className="print-status-item">
          <span className="print-label">Deadline</span>
          <span className="print-value">{formatDate(complaint.deadline) || '—'}</span>
        </div>
      </div>

      <div className="print-divider" />

      {/* Two Column Layout */}
      <div className="print-two-col">

        {/* Left - Complaint Details */}
        <div>
          <div className="print-section">
            <h2 className="print-section-title">📋 Complaint Details</h2>
            <div className="print-field">
              <span className="print-field-label">Title</span>
              <span className="print-field-value">{complaint.title}</span>
            </div>
            <div className="print-field">
              <span className="print-field-label">Category</span>
              <span className="print-field-value" style={{ textTransform: 'capitalize' }}>
                {complaint.category?.replace('_', ' ')}
              </span>
            </div>
            <div className="print-field">
              <span className="print-field-label">Incident Date</span>
              <span className="print-field-value">{formatDate(complaint.incident_date)}</span>
            </div>
            <div className="print-field">
              <span className="print-field-label">Location</span>
              <span className="print-field-value">{complaint.incident_location}</span>
            </div>
            <div className="print-field print-field--full">
              <span className="print-field-label">Description</span>
              <p className="print-field-value print-description">{complaint.description}</p>
            </div>
          </div>

          {/* Assignment */}
          <div className="print-section">
            <h2 className="print-section-title">📌 Assignment Details</h2>
            <div className="print-field">
              <span className="print-field-label">Assigned Officer</span>
              <span className="print-field-value">
                {complaint.assigned_officer_detail?.full_name || 'Not assigned'}
              </span>
            </div>
            <div className="print-field">
              <span className="print-field-label">Filed By (Operator)</span>
              <span className="print-field-value">
                {complaint.submitted_by_detail?.full_name || '—'}
              </span>
            </div>
            <div className="print-field">
              <span className="print-field-label">Deadline</span>
              <span className="print-field-value">
                {formatDate(complaint.deadline) || '—'}
              </span>
            </div>
          </div>

          {/* Escalation if applicable */}
          {complaint.escalation_reason && (
            <div className="print-section">
              <h2 className="print-section-title">⚠️ Escalation Details</h2>
              <div className="print-field">
                <span className="print-field-label">Escalated To</span>
                <span className="print-field-value">
                  {complaint.escalated_to_detail?.full_name || '—'}
                </span>
              </div>
              <div className="print-field">
                <span className="print-field-label">Escalated At</span>
                <span className="print-field-value">
                  {formatDateTime(complaint.escalated_at)}
                </span>
              </div>
              <div className="print-field print-field--full">
                <span className="print-field-label">Reason</span>
                <p className="print-field-value">{complaint.escalation_reason}</p>
              </div>
            </div>
          )}

          {/* Resolution if applicable */}
          {complaint.resolution_notes && (
            <div className="print-section">
              <h2 className="print-section-title">✅ Resolution</h2>
              <div className="print-field print-field--full">
                <span className="print-field-label">Resolution Notes</span>
                <p className="print-field-value">{complaint.resolution_notes}</p>
              </div>
              <div className="print-field">
                <span className="print-field-label">Resolved At</span>
                <span className="print-field-value">
                  {formatDateTime(complaint.resolved_at)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right - Citizen & Timeline */}
        <div>
          {/* Citizen Details */}
          <div className="print-section">
            <h2 className="print-section-title">👤Citizens Details</h2>
            <div className="print-field">
              <span className="print-field-label">Full Name</span>
              <span className="print-field-value">{complaint.complainant_name}</span>
            </div>
            <div className="print-field">
              <span className="print-field-label">Phone</span>
              <span className="print-field-value">{complaint.complainant_phone}</span>
            </div>
            {complaint.complainant_email && (
              <div className="print-field">
                <span className="print-field-label">Email</span>
                <span className="print-field-value">{complaint.complainant_email}</span>
              </div>
            )}
            <div className="print-field">
              <span className="print-field-label">Address</span>
              <span className="print-field-value">{complaint.complainant_address}</span>
            </div>
          </div>

          {/* Activity Timeline */}
          {complaint.history?.length > 0 && (
            <div className="print-section">
              <h2 className="print-section-title">🕐 Activity Timeline</h2>
              <div className="print-timeline">
                {complaint.history.map((h, i) => (
                  <div key={h.id} className="print-timeline-item">
                    <div className="print-timeline-dot" />
                    <div className="print-timeline-content">
                      <div className="print-timeline-status">
                        Status → {h.new_status?.replace('_', ' ').toUpperCase()}
                      </div>
                      {h.new_officer_name && (
                        <div className="print-timeline-sub">
                          Officer: {h.new_officer_name}
                        </div>
                      )}
                      {h.note && (
                        <div className="print-timeline-note">{h.note}</div>
                      )}
                      <div className="print-timeline-time">
                        {formatDateTime(h.created_at)}
                        {h.changed_by_name && ` · ${h.changed_by_name}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Print Footer */}
      <div className="print-divider" />
      <div className="print-footer">
        <p>This is an official complaint report generated by CATS — Complaint Application Tracking System.</p>
        <p>Generated on: {formatDateTime(new Date().toISOString())} | Complaint No: {complaint.complaint_number}</p>
      </div>
    </div>
  );
}

// ── Main Detail Page ───────────────────────────────
export default function ComplaintDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isRole } = useAuth();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modals, setModals] = useState({
    assign: false, status: false, escalate: false, reassign: false
  });

  const openModal = name => setModals(p => ({ ...p, [name]: true }));
  const closeModal = name => setModals(p => ({ ...p, [name]: false }));

  const fetchComplaint = async () => {
    try {
      const res = await complaintsAPI.get(id);
      setComplaint(res.data);
    } catch { navigate('/complaints'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchComplaint(); }, [id]);

  // ── NEW: Print Handler ─────────────────────────
  const handlePrint = () => {
    window.print();
  };

  if (loading) return <PageLoader />;
  if (!complaint) return null;

  const canAssign = isRole('operator', 'admin') && ['pending', 'rejected'].includes(complaint.status);
  const canUpdateStatus = isRole('officer', 'operator', 'admin', 'senior') && !['resolved', 'closed'].includes(complaint.status);
  const canEscalate = isRole('operator', 'admin') && !['escalated', 'resolved', 'closed'].includes(complaint.status);
  const canReassign = isRole('senior', 'admin') && complaint.status === 'escalated';

  return (
    <div className="page">

      {/* Printable Section - Hidden on screen, visible on print */}
      <PrintableComplaint complaint={complaint} />

      {/* Page Header Banner */}
      <div className="detail-header-banner mb-6 no-print">
        <div className="detail-header-left">
          <button onClick={() => navigate(-1)} className="detail-back-btn">
            ← Back to Complaints
          </button>
          <h1 className="detail-header-title">{complaint.title}</h1>
          <div className="detail-header-meta">
            <span className="detail-complaint-number">{complaint.complaint_number}</span>
            <span className="detail-meta-dot">·</span>
            <span className="detail-meta-date">Filed on {formatDate(complaint.created_at)}</span>
            {complaint.is_overdue && (
              <span className="detail-overdue-pill">⚠️ Overdue</span>
            )}
          </div>
        </div>
        <div className="detail-header-right" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* ── NEW: Print Button ── */}
          <button onClick={handlePrint} className="print-trigger-btn">
            🖨️ Print / Save PDF
          </button>
          <div className="detail-status-group">
            <div className="detail-status-item">
              <span className="detail-status-label">Status</span>
              <StatusBadge status={complaint.status} />
            </div>
            <div className="detail-status-divider" />
            <div className="detail-status-item">
              <span className="detail-status-label">Priority</span>
              <PriorityBadge priority={complaint.priority} />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {(canAssign || canUpdateStatus || canEscalate || canReassign) && (
        <div className="detail-actions-bar mb-6 no-print">
          <span className="detail-actions-label">Actions</span>
          <div className="detail-actions-group">
            {canAssign && (
              <button onClick={() => openModal('assign')} className="detail-action-btn detail-action-primary">
                👮 Assign Officer
              </button>
            )}
            {canUpdateStatus && (
              <button onClick={() => openModal('status')} className="detail-action-btn detail-action-secondary">
                🔄 Update Status
              </button>
            )}
            {canEscalate && (
              <button onClick={() => openModal('escalate')} className="detail-action-btn detail-action-danger">
                ⬆️ Escalate
              </button>
            )}
            {canReassign && (
              <button onClick={() => openModal('reassign')} className="detail-action-btn detail-action-primary">
                🔁 Reassign (Senior)
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="detail-layout no-print">
        {/* Left Column */}
        <div>
          {/* Complaint Details Card */}
          <div className="detail-card mb-4">
            <div className="detail-card-header">
              <span className="detail-card-icon">📋</span>
              <h2 className="detail-card-title">Complaint Details</h2>
            </div>
            <div className="detail-card-body">
              <div className="detail-grid">
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
                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                  <dt>Incident Location</dt>
                  <dd>{complaint.incident_location}</dd>
                </div>
                <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
                  <dt>Description</dt>
                  <dd className="detail-description">{complaint.description}</dd>
                </div>
              </div>
            </div>
          </div>

          {/* Escalation Info */}
          {complaint.status === 'escalated' && (
            <div className="detail-alert detail-alert-orange mb-4">
              <div className="detail-alert-header">
                <span>⚠️</span>
                <h3>Escalation Information</h3>
              </div>
              <div className="detail-alert-body">
                <div className="detail-alert-row">
                  <span>Escalated to</span>
                  <strong>{complaint.escalated_to_detail?.full_name}</strong>
                </div>
                <div className="detail-alert-row">
                  <span>Reason</span>
                  <strong>{complaint.escalation_reason}</strong>
                </div>
                <div className="detail-alert-row">
                  <span>Escalated at</span>
                  <strong>{formatDateTime(complaint.escalated_at)}</strong>
                </div>
              </div>
            </div>
          )}

          {/* Resolution Info */}
          {complaint.resolution_notes && (
            <div className="detail-alert detail-alert-green mb-4">
              <div className="detail-alert-header">
                <span>✅</span>
                <h3>Complaint Resolved</h3>
              </div>
              <div className="detail-alert-body">
                <p style={{ fontSize: 14, color: '#166534', lineHeight: 1.6 }}>
                  {complaint.resolution_notes}
                </p>
                <p style={{ fontSize: 12, color: '#16a34a', marginTop: 8 }}>
                  Resolved at: {formatDateTime(complaint.resolved_at)}
                </p>
              </div>
            </div>
          )}

          {/* Activity Timeline */}
          <div className="detail-card">
            <div className="detail-card-header">
              <span className="detail-card-icon">🕐</span>
              <h2 className="detail-card-title">Activity Timeline</h2>
              {complaint.history?.length > 0 && (
                <span className="detail-card-count">{complaint.history.length} events</span>
              )}
            </div>
            <div className="detail-card-body">
              {!complaint.history?.length ? (
                <p style={{ color: '#9ca3af', fontSize: 14 }}>No activity recorded yet.</p>
              ) : (
                <div className="detail-timeline">
                  {complaint.history.map((h, i) => (
                    <div key={h.id} className="detail-timeline-item">
                      <div className="detail-timeline-left">
                        <div className="detail-timeline-dot" />
                        {i < complaint.history.length - 1 && (
                          <div className="detail-timeline-line" />
                        )}
                      </div>
                      <div className="detail-timeline-content">
                        <div className="detail-timeline-top">
                          <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>
                            Status changed to
                          </span>
                          <StatusBadge status={h.new_status} />
                        </div>
                        {h.new_officer_name && (
                          <p className="detail-timeline-sub">👮 Officer: {h.new_officer_name}</p>
                        )}
                        {h.note && (
                          <p className="detail-timeline-note">{h.note}</p>
                        )}
                        <p className="detail-timeline-time">
                          {formatDateTime(h.created_at)}
                          {h.changed_by_name && ` · by ${h.changed_by_name}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Citizen Details */}
          <div className="detail-card mb-4">
            <div className="detail-card-header">
              <span className="detail-card-icon">👤</span>
              <h2 className="detail-card-title">Citizen Details</h2>
            </div>
            <div className="detail-card-body">
              <div className="detail-citizen-avatar">
                {complaint.complainant_name?.[0]?.toUpperCase()}
              </div>
              <p className="detail-citizen-name">{complaint.complainant_name}</p>
              <div className="detail-citizen-info">
                <div className="detail-citizen-row">
                  <span>📱</span>
                  <span>{complaint.complainant_phone}</span>
                </div>
                {complaint.complainant_email && (
                  <div className="detail-citizen-row">
                    <span>✉️</span>
                    <span>{complaint.complainant_email}</span>
                  </div>
                )}
                <div className="detail-citizen-row">
                  <span>📍</span>
                  <span>{complaint.complainant_address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Details */}
          <div className="detail-card mb-4">
            <div className="detail-card-header">
              <span className="detail-card-icon">📌</span>
              <h2 className="detail-card-title">Assignment Details</h2>
            </div>
            <div className="detail-card-body">
              {[
                ['👮 Officer', complaint.assigned_officer_detail?.full_name || 'Not assigned'],
                ['📅 Deadline', formatDate(complaint.deadline) || '—'],
                ['🗂️ Filed by', complaint.submitted_by_detail?.full_name || '—'],
                ['🕐 Filed on', formatDateTime(complaint.created_at)],
              ].map(([label, value]) => (
                <div key={label} className="detail-assignment-row">
                  <span className="detail-assignment-label">{label}</span>
                  <span className="detail-assignment-value">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SMS Notifications */}
          {complaint.notifications?.length > 0 && (
            <div className="detail-card">
              <div className="detail-card-header">
                <span className="detail-card-icon">📱</span>
                <h2 className="detail-card-title">SMS Notifications</h2>
                <span className="detail-card-count">
                  {complaint.notifications.length} sent
                </span>
              </div>
              <div className="detail-card-body">
                {complaint.notifications.map(n => (
                  <div key={n.id} className="detail-notif-item">
                    <div className="detail-notif-status">
                      <span className={n.sent ? 'detail-notif-sent' : 'detail-notif-failed'}>
                        {n.sent ? '✓ Delivered' : '✗ Failed'}
                      </span>
                      <span className="detail-notif-time">
                        {formatDateTime(n.created_at)}
                      </span>
                    </div>
                    <p className="detail-notif-message">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AssignModal complaintId={id} open={modals.assign}
        onClose={() => closeModal('assign')} onSuccess={fetchComplaint} />
      <StatusModal complaintId={id} currentStatus={complaint.status}
        open={modals.status} onClose={() => closeModal('status')} onSuccess={fetchComplaint} />
      <EscalateModal complaintId={id} open={modals.escalate}
        onClose={() => closeModal('escalate')} onSuccess={fetchComplaint} />
      <ReassignModal complaintId={id} open={modals.reassign}
        onClose={() => closeModal('reassign')} onSuccess={fetchComplaint} />
    </div>
  );
}