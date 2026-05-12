// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { complaintsAPI } from '../services/api';
// import { StatCard, PageLoader } from '../components/UI';
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell, Legend
// } from 'recharts';

// const PIE_COLORS = ['#1d4ed8','#16a34a','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#ec4899','#84cc16'];

// export default function DashboardPage() {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     complaintsAPI.dashboardStats()
//       .then(res => setStats(res.data))
//       .catch(console.error)
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <PageLoader />;
//   if (!stats) return null;

//   const categoryData = Object.entries(stats.by_category || {})
//     .map(([name, value]) => ({ name: name.replace('_', ' '), value }))
//     .filter(d => d.value > 0);

//   const priorityData = Object.entries(stats.by_priority || {})
//     .map(([name, value]) => ({ name, value }));

//   return (
//     <div className="page">
//       <div className="page-header">
//         <div>
//           <h1 className="page-title">Dashboard</h1>
//           <p className="page-subtitle">Overview of all complaints</p>
//         </div>
//       </div>

//       {/* Stat Cards */}
//       <div className="grid-4 mb-6">
//         <StatCard label="Total Complaints" value={stats.total} color="blue" icon="📋" />
//         <StatCard label="Pending" value={stats.pending} color="yellow" icon="⏳" />
//         <StatCard label="In Progress" value={stats.in_progress + stats.assigned} color="blue" icon="🔄" />
//         <StatCard label="Resolved" value={stats.resolved} color="green" icon="✅" />
//         <StatCard label="Escalated" value={stats.escalated} color="orange" icon="⚠️" />
//         <StatCard label="Overdue" value={stats.overdue} color="red" icon="🚨" />
//       </div>

//       {/* Charts */}
//       <div className="grid-2 mb-6">
//         <div className="card">
//           <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Complaints by Category</h2>
//           <ResponsiveContainer width="100%" height={220}>
//             <BarChart data={categoryData}>
//               <XAxis dataKey="name" tick={{ fontSize: 11 }} />
//               <YAxis tick={{ fontSize: 11 }} />
//               <Tooltip />
//               <Bar dataKey="value" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="card">
//           <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Complaints by Priority</h2>
//           <ResponsiveContainer width="100%" height={220}>
//             <PieChart>
//               <Pie data={priorityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
//                 {priorityData.map((_, i) => (
//                   <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
//                 ))}
//               </Pie>
//               <Legend />
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <div className="card">
//         <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Quick Actions</h2>
//         <div className="flex-wrap gap-3">
//           <Link to="/complaints/new" className="btn-primary">+ File New Complaint</Link>
//           <Link to="/complaints?status=pending" className="btn-secondary">View Pending</Link>
//           <Link to="/escalated" className="btn-secondary">View Escalated</Link>
//           <Link to="/track" className="btn-secondary">Track Complaint</Link>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { complaintsAPI } from '../services/api';
import { StatCard, PageLoader } from '../components/UI';
import { useAuth } from '../context/AuthContext';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const PIE_COLORS = ['#1d4ed8','#16a34a','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#ec4899','#84cc16'];

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    complaintsAPI.dashboardStats()
      .then(res => setStats(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;
  if (!stats) return null;

  const categoryData = Object.entries(stats.by_category || {})
    .map(([name, value]) => ({ name: name.replace('_', ' '), value }))
    .filter(d => d.value > 0);

  const priorityData = Object.entries(stats.by_priority || {})
    .map(([name, value]) => ({ name, value }));

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const resolvedPercent = stats.total > 0
    ? Math.round((stats.resolved / stats.total) * 100)
    : 0;

  return (
    <div className="page">

      {/* Welcome Banner */}
      <div className="dashboard-banner mb-6">
        <div>
          <h1 className="dashboard-greeting">
            {greeting()}, {user?.full_name?.split(' ')[0]} 👋
          </h1>
          <p className="dashboard-greeting-sub">
            Here's what's happening with complaints today.
          </p>
        </div>
        <div className="dashboard-resolution-badge">
          <div className="resolution-circle">
            <span className="resolution-percent">{resolvedPercent}%</span>
            <span className="resolution-label">Resolved</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid-3" style={{ marginTop: 32 }}>
        <StatCard label="Total Complaints" value={stats.total} color="blue" icon="📋" />
        <StatCard label="Pending Review" value={stats.pending} color="yellow" icon="⏳" />
        <StatCard label="Resolved" value={stats.resolved} color="green" icon="✅" />
        <StatCard label="In Progress" value={stats.in_progress + stats.assigned} color="blue" icon="🔄" />
        <StatCard label="Escalated" value={stats.escalated} color="orange" icon="⚠️" />
        <StatCard label="Overdue" value={stats.overdue} color="red" icon="🚨" />
      </div>

      {/* Charts */}
      <div className="grid-2" style={{ marginTop: 80 }}>
        <div className="card">
          <div className="chart-header">
            <h2 className="chart-title">Complaints by Category</h2>
            <span className="chart-badge">{categoryData.length} categories</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ borderRadius: 8, fontSize: 13, border: '1px solid #e5e7eb' }}
              />
              <Bar dataKey="value" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="chart-header">
            <h2 className="chart-title">Complaints by Priority</h2>
            <span className="chart-badge">{stats.total} total</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={priorityData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={30}
                label
              >
                {priorityData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip
                contentStyle={{ borderRadius: 8, fontSize: 13, border: '1px solid #e5e7eb' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginTop: 30 }}>
        <div className="chart-header mb-4">
          <h2 className="chart-title">Quick Actions</h2>
          <span style={{ fontSize: 13, color: '#6b7280' }}>Shortcuts to common tasks</span>
        </div>
        <div className="quick-actions-grid">
          {!['officer', 'senior'].includes(user?.role) && (
            <Link to="/complaints/new" className="quick-action-btn quick-action-primary">
              <span className="quick-action-icon">📝</span>
              <span className="quick-action-label">File New Complaint</span>
            </Link>
          )}
          <Link to="/complaints?status=pending" className="quick-action-btn quick-action-secondary">
            <span className="quick-action-icon">⏳</span>
            <span className="quick-action-label">View Pending</span>
          </Link>
          <Link to="/escalated" className="quick-action-btn quick-action-warning">
            <span className="quick-action-icon">⚠️</span>
            <span className="quick-action-label">View Escalated</span>
          </Link>
          <Link to="/track" className="quick-action-btn quick-action-secondary">
            <span className="quick-action-icon">🔍</span>
            <span className="quick-action-label">Track Complaint</span>
          </Link>
        </div>
      </div>

    </div>
  );
}