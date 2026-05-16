// import React from 'react';
// import { useAuth } from '../context/AuthContext';
// import { formatDateTime } from '../utils/helpers';

// const roleLabels = {
//   citizen: 'Citizen', operator: 'Operator Officer',
//   officer: 'Police Officer', senior: 'Senior Officer', admin: 'Super Admin',
// };

// export default function ProfilePage() {
//   const { user } = useAuth();
//   if (!user) return null;

//   return (
//     <div className="page" style={{ maxWidth: 520 }}>
//       <h1 className="page-title mb-6">My Profile</h1>
//       <div className="card">
//         <div className="flex-center gap-4 mb-6">
//           <div className="sidebar-avatar" style={{ width: 56, height: 56, fontSize: 22 }}>
//             {user.full_name?.[0]?.toUpperCase()}
//           </div>
//           <div>
//             <div style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>{user.full_name}</div>
//             <div style={{ fontSize: 14, color: '#6b7280', textTransform: 'capitalize' }}>{roleLabels[user.role] || user.role}</div>
//           </div>
//         </div>

//         <dl style={{ fontSize: 14 }}>
//           {[
//             ['Email', user.email],
//             ['Phone', user.phone || '—'],
//             ['Badge Number', user.badge_number || null],
//             ['Station', user.station || null],
//             ['Member Since', formatDateTime(user.created_at)],
//           ].filter(([, v]) => v !== null).map(([label, value]) => (
//             <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
//               <dt style={{ color: '#6b7280' }}>{label}</dt>
//               <dd style={{ fontWeight: 500, color: '#111827' }}>{value}</dd>
//             </div>
//           ))}
//         </dl>
//       </div>
//     </div>
//   );
// }



// -------------------------------------------------------------------------------------------------------------



// import React from 'react';
// import { useAuth } from '../context/AuthContext';
// import { formatDateTime } from '../utils/helpers';

// const roleLabels = {
//   citizen: 'Citizen',
//   operator: 'Operator Officer',
//   officer: 'Police Officer',
//   senior: 'Senior Officer',
//   admin: 'Super Admin',
// };

// const roleColors = {
//   citizen:  { bg: '#eff6ff', color: '#1d4ed8', dot: '#3b82f6' },
//   operator: { bg: '#f0fdf4', color: '#15803d', dot: '#22c55e' },
//   officer:  { bg: '#faf5ff', color: '#7e22ce', dot: '#a855f7' },
//   senior:   { bg: '#fff7ed', color: '#c2410c', dot: '#f97316' },
//   admin:    { bg: '#fef2f2', color: '#b91c1c', dot: '#ef4444' },
// };

// const profileFields = (user) => [
//   { label: 'Email',        value: user.email,                   icon: '✉' },
//   { label: 'Phone',        value: user.phone || '—',            icon: '📞' },
//   { label: 'Badge Number', value: user.badge_number || null,    icon: '🪪' },
//   { label: 'Station',      value: user.station || null,         icon: '🏛' },
//   { label: 'Member Since', value: formatDateTime(user.created_at), icon: '📅' },
// ].filter(({ value }) => value !== null);

// export default function ProfilePage() {
//   const { user } = useAuth();
//   if (!user) return null;

//   const roleStyle = roleColors[user.role] || roleColors.citizen;
//   const initials  = user.full_name?.[0]?.toUpperCase() || '?';
//   const fields    = profileFields(user);

//   return (
//     <div className="page profile-page">
//       <h1 className="page-title mb-6">My Profile</h1>

//       <div className="profile-card">

//         {/* ── Header Banner ── */}
//         <div className="profile-banner">
//           <div className="profile-banner-circle profile-banner-circle--lg" />
//           <div className="profile-banner-circle profile-banner-circle--sm" />

//           <div className="profile-banner-inner">
//             <div className="profile-avatar">{initials}</div>
//             <div>
//               <div className="profile-name">{user.full_name}</div>
//               <span
//                 className="profile-role-badge"
//                 style={{ background: roleStyle.bg, color: roleStyle.color }}
//               >
//                 <span className="profile-role-dot" style={{ background: roleStyle.dot }} />
//                 {roleLabels[user.role] || user.role}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* ── Info Fields ── */}
//         <div className="profile-fields">
//           {fields.map(({ label, value, icon }, i) => (
//             <div
//               key={label}
//               className={`profile-field-row${i === fields.length - 1 ? ' profile-field-row--last' : ''}`}
//             >
//               <div className="profile-field-label">
//                 <span className="profile-field-icon">{icon}</span>
//                 {label}
//               </div>
//               <div className={`profile-field-value${label === 'Email' ? ' profile-field-value--email' : ''}`}>
//                 {value}
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { formatDateTime } from '../utils/helpers';
import toast from 'react-hot-toast';

const roleLabels = {
  citizen:  'Citizen',
  operator: 'Operator Officer',
  officer:  'Police Officer',
  senior:   'Senior Officer',
  admin:    'Super Admin',
};

const roleColors = {
  citizen:  { bg: '#eff6ff', color: '#1d4ed8', dot: '#3b82f6' },
  operator: { bg: '#f0fdf4', color: '#15803d', dot: '#22c55e' },
  officer:  { bg: '#faf5ff', color: '#7e22ce', dot: '#a855f7' },
  senior:   { bg: '#fff7ed', color: '#c2410c', dot: '#f97316' },
  admin:    { bg: '#fef2f2', color: '#b91c1c', dot: '#ef4444' },
};

export default function ProfilePage() {
  const { user, fetchMe } = useAuth();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    badge_number: '',
    station: '',
  });
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [savingPassword, setSavingPassword] = useState(false);

  if (!user) return null;

  const roleStyle = roleColors[user.role] || roleColors.citizen;
  const initials = user.full_name?.[0]?.toUpperCase() || '?';

  // ── Start Editing ──────────────────────────────
  const handleEditClick = () => {
    setForm({
      full_name:    user.full_name || '',
      phone:        user.phone || '',
      badge_number: user.badge_number || '',
      station:      user.station || '',
    });
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setForm({ full_name: '', phone: '', badge_number: '', station: '' });
  };

  // ── Save Profile ───────────────────────────────
  const handleSave = async () => {
    if (!form.full_name.trim()) {
      toast.error('Full name is required');
      return;
    }
    setSaving(true);
    try {
      await authAPI.me().then(() =>
        fetch(`${process.env.REACT_APP_API_URL}/auth/me/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify({
            full_name:    form.full_name,
            phone:        form.phone,
            badge_number: form.badge_number,
            station:      form.station,
          }),
        })
      );
      await fetchMe();
      toast.success('Profile updated successfully!');
      setEditing(false);
    } catch (err) {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // ── Save Password ──────────────────────────────
  const handlePasswordSave = async () => {
    if (!passwordForm.current_password) {
      toast.error('Current password is required');
      return;
    }
    if (passwordForm.new_password.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      toast.error('New passwords do not match');
      return;
    }
    setSavingPassword(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/change-password/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          current_password: passwordForm.current_password,
          new_password:     passwordForm.new_password,
        }),
      });
      if (res.ok) {
        toast.success('Password changed successfully!');
        setChangingPassword(false);
        setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to change password');
      }
    } catch {
      toast.error('Failed to change password. Please try again.');
    } finally {
      setSavingPassword(false);
    }
  };

  const set = (key, val) => setForm(p => ({ ...p, [key]: val }));
  const setPass = (key, val) => setPasswordForm(p => ({ ...p, [key]: val }));

  const showBadgeStation = ['officer', 'operator', 'senior', 'admin'].includes(user.role);

  return (
    <div className="page profile-page">
      <h1 className="page-title mb-6">My Profile</h1>

      <div className="profile-card">

        {/* ── Header Banner ── */}
        <div className="profile-banner">
          <div className="profile-banner-circle profile-banner-circle--lg" />
          <div className="profile-banner-circle profile-banner-circle--sm" />
          <div className="profile-banner-inner">
            <div className="profile-avatar">{initials}</div>
            <div>
              <div className="profile-name">{user.full_name}</div>
              <span
                className="profile-role-badge"
                style={{ background: roleStyle.bg, color: roleStyle.color }}
              >
                <span className="profile-role-dot" style={{ background: roleStyle.dot }} />
                {roleLabels[user.role] || user.role}
              </span>
            </div>
          </div>

          {/* Edit Button in banner */}
          {!editing && (
            <button onClick={handleEditClick} className="profile-edit-trigger-btn">
              ✏️ Edit Profile
            </button>
          )}
        </div>

        {/* ── View Mode ── */}
        {!editing && (
          <div className="profile-fields">
            {[
              { label: 'Email',        value: user.email,                    icon: '✉️' },
              { label: 'Phone',        value: user.phone || '—',             icon: '📞' },
              ...(showBadgeStation ? [
                { label: 'Badge Number', value: user.badge_number || '—',   icon: '🪪' },
                { label: 'Station',      value: user.station || '—',         icon: '🏛️' },
              ] : []),
              { label: 'Member Since', value: formatDateTime(user.created_at), icon: '📅' },
            ].map(({ label, value, icon }, i, arr) => (
              <div
                key={label}
                className={`profile-field-row${i === arr.length - 1 ? ' profile-field-row--last' : ''}`}
              >
                <div className="profile-field-label">
                  <span className="profile-field-icon">{icon}</span>
                  {label}
                </div>
                <div className={`profile-field-value${label === 'Email' ? ' profile-field-value--email' : ''}`}>
                  {value}
                </div>
              </div>
            ))}

            {/* Change Password Button */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #f3f4f6' }}>
              <button
                onClick={() => setChangingPassword(!changingPassword)}
                className="profile-change-password-btn"
              >
                🔒 {changingPassword ? 'Cancel Password Change' : 'Change Password'}
              </button>
            </div>

            {/* Change Password Form */}
            {changingPassword && (
              <div className="profile-password-section">
                <h3 className="profile-section-title">Change Password</h3>
                <div className="profile-edit-grid">
                  <div className="profile-edit-field">
                    <label className="label">Current Password *</label>
                    <input
                      type="password"
                      className="input"
                      placeholder="Enter current password"
                      value={passwordForm.current_password}
                      onChange={e => setPass('current_password', e.target.value)}
                    />
                  </div>
                  <div className="profile-edit-field">
                    <label className="label">New Password *</label>
                    <input
                      type="password"
                      className="input"
                      placeholder="Min 6 characters"
                      value={passwordForm.new_password}
                      onChange={e => setPass('new_password', e.target.value)}
                    />
                  </div>
                  <div className="profile-edit-field">
                    <label className="label">Confirm New Password *</label>
                    <input
                      type="password"
                      className="input"
                      placeholder="Repeat new password"
                      value={passwordForm.confirm_password}
                      onChange={e => setPass('confirm_password', e.target.value)}
                    />
                  </div>
                </div>
                <div className="profile-edit-actions">
                  <button
                    onClick={handlePasswordSave}
                    disabled={savingPassword}
                    className="btn-primary"
                  >
                    {savingPassword ? 'Saving…' : '🔒 Update Password'}
                  </button>
                  <button
                    onClick={() => {
                      setChangingPassword(false);
                      setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Edit Mode ── */}
        {editing && (
          <div className="profile-edit-section">
            <h3 className="profile-section-title">Edit Your Information</h3>
            <div className="profile-edit-grid">
              <div className="profile-edit-field profile-edit-field--full">
                <label className="label">Full Name *</label>
                <input
                  className="input"
                  value={form.full_name}
                  onChange={e => set('full_name', e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div className="profile-edit-field">
                <label className="label">Phone Number</label>
                <input
                  className="input"
                  value={form.phone}
                  onChange={e => set('phone', e.target.value)}
                  placeholder="10-digit mobile number"
                />
              </div>
              {showBadgeStation && (
                <>
                  <div className="profile-edit-field">
                    <label className="label">Badge Number</label>
                    <input
                      className="input"
                      value={form.badge_number}
                      onChange={e => set('badge_number', e.target.value)}
                      placeholder="Badge number"
                    />
                  </div>
                  <div className="profile-edit-field">
                    <label className="label">Station</label>
                    <input
                      className="input"
                      value={form.station}
                      onChange={e => set('station', e.target.value)}
                      placeholder="Station name"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="profile-edit-note">
              ℹ️ Email and role cannot be changed. Contact admin if needed.
            </div>

            <div className="profile-edit-actions">
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary"
              >
                {saving ? 'Saving…' : '✅ Save Changes'}
              </button>
              <button
                onClick={handleCancel}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}