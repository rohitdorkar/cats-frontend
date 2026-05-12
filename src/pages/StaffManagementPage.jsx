// import React, { useEffect, useState } from 'react';
// import { authAPI } from '../services/api';
// import { Modal, Field, PageLoader, EmptyState } from '../components/UI';
// import toast from 'react-hot-toast';

// const ROLES = [
//   { value: 'operator', label: 'Operator Officer' },
//   { value: 'officer', label: 'Police Officer' },
//   { value: 'senior', label: 'Senior Officer' },
// ];

// function CreateStaffModal({ open, onClose, onSuccess }) {
//   const [form, setForm] = useState({ email: '', full_name: '', phone: '', password: '', role: 'officer', badge_number: '', station: '' });
//   const [loading, setLoading] = useState(false);
//   const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

//   const submit = async () => {
//     if (!form.email || !form.full_name || !form.password) return toast.error('Fill all required fields');
//     setLoading(true);
//     try {
//       await authAPI.createStaff(form);
//       toast.success('Staff account created!');
//       setForm({ email: '', full_name: '', phone: '', password: '', role: 'officer', badge_number: '', station: '' });
//       onSuccess();
//       onClose();
//     } catch (e) {
//       const errors = e.response?.data;
//       if (errors) Object.values(errors).flat().forEach(m => toast.error(m));
//       else toast.error('Failed to create account');
//     } finally { setLoading(false); }
//   };

//   return (
//     <Modal open={open} onClose={onClose} title="Create Staff Account">
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//         <div className="grid-2">
//           <Field label="Full Name *">
//             <input className="input" value={form.full_name} onChange={e => set('full_name', e.target.value)} />
//           </Field>
//           <Field label="Email *">
//             <input type="email" className="input" value={form.email} onChange={e => set('email', e.target.value)} />
//           </Field>
//           <Field label="Phone">
//             <input className="input" value={form.phone} onChange={e => set('phone', e.target.value)} />
//           </Field>
//           <Field label="Password *">
//             <input type="password" className="input" value={form.password} onChange={e => set('password', e.target.value)} />
//           </Field>
//           <Field label="Role *">
//             <select className="input" value={form.role} onChange={e => set('role', e.target.value)}>
//               {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
//             </select>
//           </Field>
//           <Field label="Badge Number">
//             <input className="input" value={form.badge_number} onChange={e => set('badge_number', e.target.value)} />
//           </Field>
//         </div>
//         <Field label="Station">
//           <input className="input" value={form.station} onChange={e => set('station', e.target.value)} />
//         </Field>
//         <div className="flex gap-3" style={{ paddingTop: 8 }}>
//           <button onClick={submit} disabled={loading} className="btn-primary">{loading ? 'Creating…' : 'Create Account'}</button>
//           <button onClick={onClose} className="btn-secondary">Cancel</button>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// export default function StaffManagementPage() {
//   const [staff, setStaff] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [createOpen, setCreateOpen] = useState(false);

//   const fetchStaff = () => {
//     authAPI.getAllStaff()
//       .then(res => setStaff(res.data.results || res.data))
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => { fetchStaff(); }, []);

//   if (loading) return <PageLoader />;

//   return (
//     <div className="page">
//       <div className="page-header">
//         <div>
//           <h1 className="page-title">Staff Management</h1>
//           <p className="page-subtitle">{staff.length} staff members</p>
//         </div>
//         <button onClick={() => setCreateOpen(true)} className="btn-primary">+ Add Staff</button>
//       </div>

//       {staff.length === 0 ? (
//         <EmptyState icon="👮" title="No staff accounts" subtitle="Create staff accounts to get started" />
//       ) : (
//         <div className="table-wrapper">
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th><th>Email</th><th>Role</th><th>Badge</th><th>Station</th><th>Phone</th>
//               </tr>
//             </thead>
//             <tbody>
//               {staff.map(s => (
//                 <tr key={s.id}>
//                   <td className="font-medium">{s.full_name}</td>
//                   <td>{s.email}</td>
//                   <td><span className={`badge role-${s.role}`}>{s.role}</span></td>
//                   <td>{s.badge_number || '—'}</td>
//                   <td>{s.station || '—'}</td>
//                   <td>{s.phone || '—'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <CreateStaffModal open={createOpen} onClose={() => setCreateOpen(false)} onSuccess={fetchStaff} />
//     </div>
//   );
// }






// import React, { useEffect, useState } from 'react';
// import { authAPI } from '../services/api';
// import { Modal, Field, PageLoader, EmptyState } from '../components/UI';
// import toast from 'react-hot-toast';

// const ROLES = [
//   { value: 'operator', label: 'Operator Officer' },
//   { value: 'officer',  label: 'Police Officer'   },
//   { value: 'senior',   label: 'Senior Officer'    },
// ];

// const ROLE_LABELS = {
//   admin: 'Super Admin', senior: 'Senior Officer',
//   operator: 'Operator Officer', officer: 'Police Officer', citizen: 'Citizen',
// };

// function CreateStaffModal({ open, onClose, onSuccess }) {
//   const [form, setForm] = useState({
//     email: '', full_name: '', phone: '', password: '',
//     role: 'officer', badge_number: '', station: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

//   const submit = async () => {
//     if (!form.email || !form.full_name || !form.password)
//       return toast.error('Fill all required fields');
//     setLoading(true);
//     try {
//       await authAPI.createStaff(form);
//       toast.success('Staff account created!');
//       setForm({ email: '', full_name: '', phone: '', password: '', role: 'officer', badge_number: '', station: '' });
//       onSuccess();
//       onClose();
//     } catch (e) {
//       const errors = e.response?.data;
//       if (errors) Object.values(errors).flat().forEach(m => toast.error(m));
//       else toast.error('Failed to create account');
//     } finally { setLoading(false); }
//   };

//   return (
//     <Modal open={open} onClose={onClose} title="Create Staff Account">
//       <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//         <div className="grid-2">
//           <Field label="Full Name *">
//             <input className="input" value={form.full_name} onChange={e => set('full_name', e.target.value)} />
//           </Field>
//           <Field label="Email *">
//             <input type="email" className="input" value={form.email} onChange={e => set('email', e.target.value)} />
//           </Field>
//           <Field label="Phone">
//             <input className="input" value={form.phone} onChange={e => set('phone', e.target.value)} />
//           </Field>
//           <Field label="Password *">
//             <input type="password" className="input" value={form.password} onChange={e => set('password', e.target.value)} />
//           </Field>
//           <Field label="Role *">
//             <select className="input" value={form.role} onChange={e => set('role', e.target.value)}>
//               {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
//             </select>
//           </Field>
//           <Field label="Badge Number">
//             <input className="input" value={form.badge_number} onChange={e => set('badge_number', e.target.value)} />
//           </Field>
//         </div>
//         <Field label="Station">
//           <input className="input" value={form.station} onChange={e => set('station', e.target.value)} />
//         </Field>
//         <div className="flex gap-3" style={{ paddingTop: 8 }}>
//           <button onClick={submit} disabled={loading} className="btn-primary">
//             {loading ? 'Creating…' : 'Create Account'}
//           </button>
//           <button onClick={onClose} className="btn-secondary">Cancel</button>
//         </div>
//       </div>
//     </Modal>
//   );
// }

// function StaffAvatar({ name, role }) {
//   const initials = name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?';
//   return (
//     <div className={`staff-avatar staff-avatar--${role}`}>
//       {initials}
//     </div>
//   );
// }

// export default function StaffManagementPage() {
//   const [staff, setStaff]       = useState([]);
//   const [loading, setLoading]   = useState(true);
//   const [createOpen, setCreateOpen] = useState(false);

//   const fetchStaff = () => {
//     authAPI.getAllStaff()
//       .then(res => setStaff(res.data.results || res.data))
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => { fetchStaff(); }, []);

//   if (loading) return <PageLoader />;

//   return (
//     <div className="page">

//       {/* ── Page Header ── */}
//       <div className="page-header staff-page-header">
//         <div>
//           <h1 className="page-title">Staff Management</h1>
//           <p className="page-subtitle">{staff.length} staff members registered</p>
//         </div>
//         <button onClick={() => setCreateOpen(true)} className="btn-primary">
//           + Add Staff
//         </button>
//       </div>

//       {/* ── Summary Badges ── */}
//       {staff.length > 0 && (
//         <div className="staff-summary-bar">
//           {['officer', 'senior', 'operator', 'admin'].map(role => {
//             const count = staff.filter(s => s.role === role).length;
//             if (!count) return null;
//             return (
//               <div key={role} className={`staff-summary-chip staff-summary-chip--${role}`}>
//                 <span className="staff-summary-count">{count}</span>
//                 <span className="staff-summary-label">{ROLE_LABELS[role]}</span>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* ── Table ── */}
//       {staff.length === 0 ? (
//         <EmptyState icon="👮" title="No staff accounts" subtitle="Create staff accounts to get started" />
//       ) : (
//         <div className="table-wrapper staff-table-wrapper">
//           <table className="staff-table">
//             <thead>
//               <tr>
//                 <th>Member</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Badge</th>
//                 <th>Station</th>
//                 <th>Phone</th>
//               </tr>
//             </thead>
//             <tbody>
//               {staff.map(s => (
//                 <tr key={s.id} className="staff-table-row">
//                   <td>
//                     <div className="staff-member-cell">
//                       <StaffAvatar name={s.full_name} role={s.role} />
//                       <span className="staff-member-name">{s.full_name}</span>
//                     </div>
//                   </td>
//                   <td className="staff-email">{s.email}</td>
//                   <td><span className={`badge role-${s.role}`}>{ROLE_LABELS[s.role] || s.role}</span></td>
//                   <td className="staff-meta">{s.badge_number || '—'}</td>
//                   <td className="staff-meta">{s.station || '—'}</td>
//                   <td className="staff-meta">{s.phone || '—'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <CreateStaffModal
//         open={createOpen}
//         onClose={() => setCreateOpen(false)}
//         onSuccess={fetchStaff}
//       />
//     </div>
//   );
// }



import React, { useEffect, useState } from 'react';
import { authAPI } from '../services/api';
import { Modal, Field, PageLoader, EmptyState } from '../components/UI';
import toast from 'react-hot-toast';

const ROLES = [
  { value: 'operator', label: 'Operator Officer' },
  { value: 'officer',  label: 'Police Officer'   },
  { value: 'senior',   label: 'Senior Officer'    },
];

const ROLE_LABELS = {
  admin: 'Super Admin', senior: 'Senior Officer',
  operator: 'Operator Officer', officer: 'Police Officer', citizen: 'Citizen',
};

// ── Create Modal (unchanged) ──────────────────────────────
function CreateStaffModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState({
    email: '', full_name: '', phone: '', password: '',
    role: 'officer', badge_number: '', station: '',
  });
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const submit = async () => {
    if (!form.email || !form.full_name || !form.password)
      return toast.error('Fill all required fields');
    setLoading(true);
    try {
      await authAPI.createStaff(form);
      toast.success('Staff account created!');
      setForm({ email: '', full_name: '', phone: '', password: '', role: 'officer', badge_number: '', station: '' });
      onSuccess();
      onClose();
    } catch (e) {
      const errors = e.response?.data;
      if (errors) Object.values(errors).flat().forEach(m => toast.error(m));
      else toast.error('Failed to create account');
    } finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title="Create Staff Account">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="grid-2">
          <Field label="Full Name *">
            <input className="input" value={form.full_name} onChange={e => set('full_name', e.target.value)} />
          </Field>
          <Field label="Email *">
            <input type="email" className="input" value={form.email} onChange={e => set('email', e.target.value)} />
          </Field>
          <Field label="Phone">
            <input className="input" value={form.phone} onChange={e => set('phone', e.target.value)} />
          </Field>
          <Field label="Password *">
            <input type="password" className="input" value={form.password} onChange={e => set('password', e.target.value)} />
          </Field>
          <Field label="Role *">
            <select className="input" value={form.role} onChange={e => set('role', e.target.value)}>
              {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </Field>
          <Field label="Badge Number">
            <input className="input" value={form.badge_number} onChange={e => set('badge_number', e.target.value)} />
          </Field>
        </div>
        <Field label="Station">
          <input className="input" value={form.station} onChange={e => set('station', e.target.value)} />
        </Field>
        <div className="flex gap-3" style={{ paddingTop: 8 }}>
          <button onClick={submit} disabled={loading} className="btn-primary">
            {loading ? 'Creating…' : 'Create Account'}
          </button>
          <button onClick={onClose} className="btn-secondary">Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

// ── Edit Modal (new) ──────────────────────────────────────
function EditStaffModal({ open, onClose, onSuccess, staffMember }) {
  const [form, setForm] = useState({
    email: '', full_name: '', phone: '', password: '',
    role: 'officer', badge_number: '', station: '',
  });
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  // Pre-fill form when staffMember changes
  useEffect(() => {
    if (staffMember) {
      setForm({
        email:        staffMember.email        || '',
        full_name:    staffMember.full_name     || '',
        phone:        staffMember.phone         || '',
        password:     '',
        role:         staffMember.role          || 'officer',
        badge_number: staffMember.badge_number  || '',
        station:      staffMember.station       || '',
      });
    }
  }, [staffMember]);

  const submit = async () => {
    if (!form.email || !form.full_name)
      return toast.error('Name and Email are required');
    setLoading(true);
    try {
      await authAPI.updateStaff(staffMember.id, form);
      toast.success('Staff account updated!');
      onSuccess();
      onClose();
    } catch (e) {
      const errors = e.response?.data;
      if (errors) Object.values(errors).flat().forEach(m => toast.error(m));
      else toast.error('Failed to update account');
    } finally { setLoading(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Staff Account">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="grid-2">
          <Field label="Full Name *">
            <input className="input" value={form.full_name} onChange={e => set('full_name', e.target.value)} />
          </Field>
          <Field label="Email *">
            <input type="email" className="input" value={form.email} onChange={e => set('email', e.target.value)} />
          </Field>
          <Field label="Phone">
            <input className="input" value={form.phone} onChange={e => set('phone', e.target.value)} />
          </Field>
          <Field label="New Password">
            <input
              type="password" className="input"
              placeholder="Leave blank to keep unchanged"
              value={form.password}
              onChange={e => set('password', e.target.value)}
            />
          </Field>
          <Field label="Role *">
            <select className="input" value={form.role} onChange={e => set('role', e.target.value)}>
              {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </Field>
          <Field label="Badge Number">
            <input className="input" value={form.badge_number} onChange={e => set('badge_number', e.target.value)} />
          </Field>
        </div>
        <Field label="Station">
          <input className="input" value={form.station} onChange={e => set('station', e.target.value)} />
        </Field>
        <div className="flex gap-3" style={{ paddingTop: 8 }}>
          <button onClick={submit} disabled={loading} className="btn-primary">
            {loading ? 'Saving…' : 'Save Changes'}
          </button>
          <button onClick={onClose} className="btn-secondary">Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

// ── Delete Confirmation Modal (new) ──────────────────────
function DeleteConfirmModal({ open, onClose, onConfirm, staffMember, loading }) {
  return (
    <Modal open={open} onClose={onClose} title="Delete Staff Account">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="delete-confirm-body">
          <div className="delete-confirm-icon">🗑️</div>
          <p className="delete-confirm-text">
            Are you sure you want to delete{' '}
            <strong>{staffMember?.full_name}</strong>?
            <br />
            <span className="delete-confirm-warning">
              This action cannot be undone.
            </span>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="btn-danger"
          >
            {loading ? 'Deleting…' : 'Yes, Delete'}
          </button>
          <button onClick={onClose} className="btn-secondary">Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

// ── Avatar (unchanged) ────────────────────────────────────
function StaffAvatar({ name, role }) {
  const initials = name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?';
  return (
    <div className={`staff-avatar staff-avatar--${role}`}>
      {initials}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────
export default function StaffManagementPage() {
  const [staff, setStaff]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [createOpen, setCreateOpen] = useState(false);

  // Edit state
  const [editOpen, setEditOpen]         = useState(false);
  const [editTarget, setEditTarget]     = useState(null);

  // Delete state
  const [deleteOpen, setDeleteOpen]     = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchStaff = () => {
    authAPI.getAllStaff()
      .then(res => setStaff(res.data.results || res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchStaff(); }, []);

  // Open edit modal with selected staff
  const handleEditClick = (member) => {
    setEditTarget(member);
    setEditOpen(true);
  };

  // Open delete confirmation with selected staff
  const handleDeleteClick = (member) => {
    setDeleteTarget(member);
    setDeleteOpen(true);
  };

  // Confirm delete
  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      await authAPI.deleteStaff(deleteTarget.id);
      toast.success(`${deleteTarget.full_name} has been deleted.`);
      setStaff(prev => prev.filter(s => s.id !== deleteTarget.id));
      setDeleteOpen(false);
      setDeleteTarget(null);
    } catch {
      toast.error('Failed to delete staff member');
    } finally {
      setDeleteLoading(false);
    }
  };

  // After edit, refresh list
  const handleEditSuccess = () => {
    fetchStaff();
    setEditOpen(false);
    setEditTarget(null);
  };

  if (loading) return <PageLoader />;

  return (
    <div className="page">

      {/* ── Page Header ── */}
      <div className="page-header staff-page-header">
        <div>
          <h1 className="page-title">Staff Management</h1>
          <p className="page-subtitle">{staff.length} staff members registered</p>
        </div>
        <button onClick={() => setCreateOpen(true)} className="btn-primary">
          + Add Staff
        </button>
      </div>

      {/* ── Summary Badges (unchanged) ── */}
      {staff.length > 0 && (
        <div className="staff-summary-bar">
          {['officer', 'senior', 'operator', 'admin'].map(role => {
            const count = staff.filter(s => s.role === role).length;
            if (!count) return null;
            return (
              <div key={role} className={`staff-summary-chip staff-summary-chip--${role}`}>
                <span className="staff-summary-count">{count}</span>
                <span className="staff-summary-label">{ROLE_LABELS[role]}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Table ── */}
      {staff.length === 0 ? (
        <EmptyState icon="👮" title="No staff accounts" subtitle="Create staff accounts to get started" />
      ) : (
        <div className="table-wrapper staff-table-wrapper">
          <table className="staff-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Email</th>
                <th>Role</th>
                <th>Badge</th>
                <th>Station</th>
                <th>Phone</th>
                <th>Actions</th>  {/* ← new column */}
              </tr>
            </thead>
            <tbody>
              {staff.map(s => (
                <tr key={s.id} className="staff-table-row">
                  <td>
                    <div className="staff-member-cell">
                      <StaffAvatar name={s.full_name} role={s.role} />
                      <span className="staff-member-name">{s.full_name}</span>
                    </div>
                  </td>
                  <td className="staff-email">{s.email}</td>
                  <td><span className={`badge role-${s.role}`}>{ROLE_LABELS[s.role] || s.role}</span></td>
                  <td className="staff-meta">{s.badge_number || '—'}</td>
                  <td className="staff-meta">{s.station || '—'}</td>
                  <td className="staff-meta">{s.phone || '—'}</td>
                  <td>   {/* ← new actions cell */}
                    <div className="staff-action-btns">
                      <button
                        className="staff-btn-edit"
                        onClick={() => handleEditClick(s)}
                        title="Edit"
                      >
                        ✏️ 
                      </button>
                      <button
                        className="staff-btn-delete"
                        onClick={() => handleDeleteClick(s)}
                        title="Delete"
                      >
                        🗑️ 
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Modals ── */}
      <CreateStaffModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSuccess={fetchStaff}
      />

      <EditStaffModal
        open={editOpen}
        onClose={() => { setEditOpen(false); setEditTarget(null); }}
        onSuccess={handleEditSuccess}
        staffMember={editTarget}
      />

      <DeleteConfirmModal
        open={deleteOpen}
        onClose={() => { setDeleteOpen(false); setDeleteTarget(null); }}
        onConfirm={handleDeleteConfirm}
        staffMember={deleteTarget}
        loading={deleteLoading}
      />
    </div>
  );
}