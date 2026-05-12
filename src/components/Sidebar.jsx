// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import {
//   MdDashboard, MdDescription, MdAdd, MdPeople,
//   MdLogout, MdSearch, MdOutlineWarning, MdPerson
// } from 'react-icons/md';

// const NavItem = ({ to, icon: Icon, label }) => (
//   <NavLink
//     to={to}
//     className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
//   >
//     <Icon style={{ fontSize: 18 }} />
//     {label}
//   </NavLink>
// );

// export default function Sidebar() {
//   const { user, logout, isRole } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <aside className="sidebar">
//       <div className="sidebar-logo">
//         <span className="sidebar-logo-icon">🚔</span>
//         <div>
//           <div className="sidebar-logo-title">CATS</div>
//           <div className="sidebar-logo-sub">Complaint Tracking</div>
//         </div>
//       </div>

//       <nav className="sidebar-nav">
//         {isRole('operator', 'officer', 'senior', 'admin') && (
//           <NavItem to="/dashboard" icon={MdDashboard} label="Dashboard" />
//         )}
//         <NavItem to="/complaints" icon={MdDescription} label="All Complaints" />
//         {isRole('operator', 'admin') && (
//           <NavItem to="/complaints/new" icon={MdAdd} label="File Complaint" />
//         )}
//         <NavItem to="/track" icon={MdSearch} label="Track Complaint" />
//         {isRole('senior', 'admin') && (
//           <NavItem to="/escalated" icon={MdOutlineWarning} label="Escalated" />
//         )}
//         {isRole('admin') && (
//           <NavItem to="/staff" icon={MdPeople} label="Manage Staff" />
//         )}
//         <NavItem to="/profile" icon={MdPerson} label="Profile" />
//       </nav>

//       <div className="sidebar-footer">
//         <div className="sidebar-user">
//           <div className="sidebar-avatar">
//             {user?.full_name?.[0]?.toUpperCase()}
//           </div>
//           <div>
//             <div className="sidebar-username">{user?.full_name}</div>
//             <div className="sidebar-role">{user?.role}</div>
//           </div>
//         </div>
//         <button className="sidebar-logout" onClick={handleLogout}>
//           <MdLogout /> Logout
//         </button>
//       </div>
//     </aside>
//   );
// }


import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  MdDashboard, MdDescription, MdAdd, MdPeople,
  MdLogout, MdSearch, MdOutlineWarning, MdPerson
} from 'react-icons/md';

// const NavItem = ({ to, icon: Icon, label }) => (
//   <NavLink
//     to={to}
//     className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
//   >
//     <Icon style={{ fontSize: 18, flexShrink: 0 }} />
//     <span>{label}</span>
//   </NavLink>
// );

const NavItem = ({ to, icon: Icon, label, matchExact }) => (
  <NavLink
    to={to}
    end={matchExact === true}
    className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
  >
    <Icon style={{ fontSize: 18, flexShrink: 0 }} />
    <span>{label}</span>
  </NavLink>
);

const roleLabels = {
  citizen:  'Citizen',
  operator: 'Operator Officer',
  officer:  'Police Officer',
  senior:   'Senior Officer',
  admin:    'Super Admin',
};

export default function Sidebar() {
  const { user, logout, isRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon-wrap">🚔</div>
        <div>
          <div className="sidebar-logo-title">CATS</div>
          <div className="sidebar-logo-sub">Complaint Application Tracking System</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <p className="sidebar-nav-label">MENU</p>

        {isRole('operator', 'officer', 'senior', 'admin') && (
          <NavItem to="/dashboard" icon={MdDashboard} label="Dashboard" />
        )}
        <NavItem to="/complaints" icon={MdDescription} label="All Complaints" matchExact={true}/>
        {isRole('operator', 'admin') && (
          <NavItem to="/complaints/new" icon={MdAdd} label="File Complaint" />
        )}
        <NavItem to="/track" icon={MdSearch} label="Track Complaint" />

        {isRole('senior', 'admin') && (
          <>
            <p className="sidebar-nav-label" style={{ marginTop: 12 }}>MANAGEMENT</p>
            <NavItem to="/escalated" icon={MdOutlineWarning} label="Escalated" />
          </>
        )}

        {isRole('admin') && (
          <NavItem to="/staff" icon={MdPeople} label="Manage Staff" />
        )}

        <p className="sidebar-nav-label" style={{ marginTop: 12 }}>ACCOUNT</p>
        <NavItem to="/profile" icon={MdPerson} label="Profile" />
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user-card">
          <div className="sidebar-avatar">
            {user?.full_name?.[0]?.toUpperCase()}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-username">{user?.full_name}</div>
            <div className="sidebar-role">{roleLabels[user?.role] || user?.role}</div>
          </div>
        </div>
        <button className="sidebar-logout" onClick={handleLogout}>
          <MdLogout style={{ fontSize: 16 }} />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
}