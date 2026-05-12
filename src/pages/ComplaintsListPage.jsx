// import React, { useEffect, useState, useCallback } from 'react';
// import { Link, useSearchParams } from 'react-router-dom';
// import { complaintsAPI } from '../services/api';
// import { StatusBadge, PriorityBadge, PageLoader, EmptyState } from '../components/UI';
// import { formatDate, STATUSES, CATEGORIES, PRIORITIES } from '../utils/helpers';
// import { useAuth } from '../context/AuthContext';

// export default function ComplaintsListPage() {
//   const { isRole } = useAuth();
//   const [searchParams] = useSearchParams();
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [filters, setFilters] = useState({
//     status: searchParams.get('status') || '',
//     priority: '',
//     category: '',
//   });

//   const fetchComplaints = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = { ...filters };
//       if (search) params.search = search;
//       const res = await complaintsAPI.list(params);
//       setComplaints(res.data.results || res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, [filters, search]);

//   useEffect(() => { fetchComplaints(); }, [fetchComplaints]);

//   return (
//     <div className="page">
//       <div className="page-header">
//         <div>
//           <h1 className="page-title">Complaints</h1>
//           <p className="page-subtitle">{complaints.length} complaints found</p>
//         </div>
//         {isRole('operator', 'admin') && (
//           <Link to="/complaints/new" className="btn-primary">+ File Complaint</Link>
//         )}
//       </div>

//       {/* Filters */}
//       <div className="filter-bar">
//         <input
//           className="input"
//           placeholder="Search by name, number, phone…"
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//         />
//         <select className="input" value={filters.status} onChange={e => setFilters(p => ({ ...p, status: e.target.value }))}>
//           <option value="">All Statuses</option>
//           {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
//         </select>
//         <select className="input" value={filters.priority} onChange={e => setFilters(p => ({ ...p, priority: e.target.value }))}>
//           <option value="">All Priorities</option>
//           {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
//         </select>
//         <select className="input" value={filters.category} onChange={e => setFilters(p => ({ ...p, category: e.target.value }))}>
//           <option value="">All Categories</option>
//           {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
//         </select>
//       </div>

//       {/* Table */}
//       {loading ? (
//         <PageLoader />
//       ) : complaints.length === 0 ? (
//         <EmptyState icon="📭" title="No complaints found" subtitle="Try adjusting filters or search terms" />
//       ) : (
//         <div className="table-wrapper">
//           <table>
//             <thead>
//               <tr>
//                 <th>Complaint Id</th>
//                 <th>Title</th>
//                 <th>Category</th>
//                 <th>Citizen Name</th>
//                 <th>Status</th>
//                 <th>Priority</th>
//                 <th>Officer Name</th>
//                 <th>Deadline</th>
//                 <th>Filed On</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {complaints.map(c => (
//                 <tr key={c.id}>
//                   <td><span className="font-mono text-blue" style={{ fontSize: 12 }}>{c.complaint_number}</span></td>
//                   <td style={{ maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.title}</td>
//                   <td style={{ textTransform: 'capitalize' }}>{c.category?.replace('_', ' ')}</td>
//                   <td>
//                     <div className="font-medium">{c.complainant_name}</div>
//                     <div className="text-xs text-gray">{c.complainant_phone}</div>
//                   </td>
//                   <td><StatusBadge status={c.status} /></td>
//                   <td><PriorityBadge priority={c.priority} /></td>
//                   <td>{c.assigned_officer_name || '—'}</td>
//                   <td>
//                     <span style={{ color: c.is_overdue ? '#dc2626' : '#374151', fontWeight: c.is_overdue ? 600 : 400 }}>
//                       {formatDate(c.deadline)}{c.is_overdue && ' ⚠️'}
//                     </span>
//                   </td>
//                   <td className="text-gray">{formatDate(c.created_at)}</td>
//                   <td>
//                     <Link to={`/complaints/${c.id}`} style={{ color: '#1d4ed8', fontSize: 13, fontWeight: 500 }}>
//                       View →
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useEffect, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { complaintsAPI } from '../services/api';
import { StatusBadge, PriorityBadge, PageLoader, EmptyState } from '../components/UI';
import { formatDate, STATUSES, CATEGORIES, PRIORITIES } from '../utils/helpers';
import { useAuth } from '../context/AuthContext';

export default function ComplaintsListPage() {
  const { isRole } = useAuth();
  const [searchParams] = useSearchParams();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    status: searchParams.get('status') || '',
    priority: '',
    category: '',
  });

  const fetchComplaints = useCallback(async () => {
    setLoading(true);
    try {
      const params = { ...filters };
      if (search) params.search = search;
      const res = await complaintsAPI.list(params);
      setComplaints(res.data.results || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters, search]);

  useEffect(() => { fetchComplaints(); }, [fetchComplaints]);

  // Count active filters
  const activeFilters = Object.values(filters).filter(v => v !== '').length;

  const clearFilters = () => {
    setFilters({ status: '', priority: '', category: '' });
    setSearch('');
  };

  return (
    <div className="page">

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">All Complaints</h1>
          <p className="page-subtitle">
            {loading ? 'Loading…' : (
              <>
                <span className="complaints-count">{complaints.length}</span> complaints found
                {activeFilters > 0 && (
                  <span className="active-filter-tag">{activeFilters} filter{activeFilters > 1 ? 's' : ''} active</span>
                )}
              </>
            )}
          </p>
        </div>
        {isRole('operator', 'admin') && (
          <Link to="/complaints/new" className="btn-primary">
            + File Complaint
          </Link>
        )}
      </div>

      {/* Filter Bar */}
      <div className="complaints-filter-card">
        <div className="complaints-filter-top">
          <span className="complaints-filter-label">Search & Filter</span>
          {(activeFilters > 0 || search) && (
            <button onClick={clearFilters} className="complaints-clear-btn">
              ✕ Clear All
            </button>
          )}
        </div>
        <div className="complaints-filter-grid">
          <div className="complaints-search-wrap">
            <span className="complaints-search-icon">🔍</span>
            <input
              className="complaints-search-input"
              placeholder="Search by name, complaint number, phone…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button
                className="complaints-search-clear"
                onClick={() => setSearch('')}
              >✕</button>
            )}
          </div>
          <select
            className="input"
            value={filters.status}
            onChange={e => setFilters(p => ({ ...p, status: e.target.value }))}
          >
            <option value="">All Statuses</option>
            {STATUSES.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
          <select
            className="input"
            value={filters.priority}
            onChange={e => setFilters(p => ({ ...p, priority: e.target.value }))}
          >
            <option value="">All Priorities</option>
            {PRIORITIES.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
          <select
            className="input"
            value={filters.category}
            onChange={e => setFilters(p => ({ ...p, category: e.target.value }))}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <PageLoader />
      ) : complaints.length === 0 ? (
        <div className="complaints-empty">
          <EmptyState
            icon="📭"
            title="No complaints found"
            subtitle="Try adjusting your filters or search terms"
          />
          {(activeFilters > 0 || search) && (
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <button onClick={clearFilters} className="btn-secondary">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="complaints-table-wrapper">
          <table className="complaints-table">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Citizen</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Officer</th>
                <th>Deadline</th>
                <th>Filed On</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {complaints.map(c => (
                <tr key={c.id} className="complaints-table-row">
                  <td>
                    <span className="complaint-id-badge">
                      {c.complaint_number}
                    </span>
                  </td>
                  <td>
                    <span className="complaint-title-cell">
                      {c.title}
                    </span>
                  </td>
                  <td>
                    <span className="complaint-category-cell">
                      {c.category?.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    <div className="complaint-citizen-name">{c.complainant_name}</div>
                    <div className="complaint-citizen-phone">{c.complainant_phone}</div>
                  </td>
                  <td><StatusBadge status={c.status} /></td>
                  <td><PriorityBadge priority={c.priority} /></td>
                  <td>
                    <span className="complaint-officer-cell">
                      {c.assigned_officer_name || (
                        <span className="complaint-unassigned">Unassigned</span>
                      )}
                    </span>
                  </td>
                  <td>
                    {c.deadline ? (
                      <span className={c.is_overdue ? 'complaint-overdue' : 'complaint-deadline'}>
                        {formatDate(c.deadline)}
                        {c.is_overdue && <span className="overdue-tag">Overdue</span>}
                      </span>
                    ) : (
                      <span className="complaint-no-deadline">—</span>
                    )}
                  </td>
                  <td className="complaint-date-cell">
                    {formatDate(c.created_at)}
                  </td>
                  <td>
                    <Link
                      to={`/complaints/${c.id}`}
                      className="complaint-view-btn"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Table Footer */}
          <div className="complaints-table-footer">
            <span>Showing {complaints.length} complaint{complaints.length !== 1 ? 's' : ''}</span>
            {activeFilters > 0 && (
              <button onClick={clearFilters} className="complaints-clear-btn">
                Clear Filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}