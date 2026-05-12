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

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { formatDateTime } from '../utils/helpers';

const roleLabels = {
  citizen: 'Citizen',
  operator: 'Operator Officer',
  officer: 'Police Officer',
  senior: 'Senior Officer',
  admin: 'Super Admin',
};

const roleColors = {
  citizen:  { bg: '#eff6ff', color: '#1d4ed8', dot: '#3b82f6' },
  operator: { bg: '#f0fdf4', color: '#15803d', dot: '#22c55e' },
  officer:  { bg: '#faf5ff', color: '#7e22ce', dot: '#a855f7' },
  senior:   { bg: '#fff7ed', color: '#c2410c', dot: '#f97316' },
  admin:    { bg: '#fef2f2', color: '#b91c1c', dot: '#ef4444' },
};

const profileFields = (user) => [
  { label: 'Email',        value: user.email,                   icon: '✉' },
  { label: 'Phone',        value: user.phone || '—',            icon: '📞' },
  { label: 'Badge Number', value: user.badge_number || null,    icon: '🪪' },
  { label: 'Station',      value: user.station || null,         icon: '🏛' },
  { label: 'Member Since', value: formatDateTime(user.created_at), icon: '📅' },
].filter(({ value }) => value !== null);

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) return null;

  const roleStyle = roleColors[user.role] || roleColors.citizen;
  const initials  = user.full_name?.[0]?.toUpperCase() || '?';
  const fields    = profileFields(user);

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
        </div>

        {/* ── Info Fields ── */}
        <div className="profile-fields">
          {fields.map(({ label, value, icon }, i) => (
            <div
              key={label}
              className={`profile-field-row${i === fields.length - 1 ? ' profile-field-row--last' : ''}`}
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
        </div>

      </div>
    </div>
  );
}