import React, { useEffect, useState } from 'react';
import { complaintsAPI } from '../services/api';
import { PageLoader } from '../components/UI';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend
} from 'recharts';

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const params = {};
      if (dateFrom) params.date_from = dateFrom;
      if (dateTo) params.date_to = dateTo;
      const res = await complaintsAPI.analytics(params);
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAnalytics(); }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchAnalytics();
  };

  const handleClear = () => {
    setDateFrom('');
    setDateTo('');
    setTimeout(fetchAnalytics, 100);
  };

  if (loading) return <PageLoader />;
  if (!data) return null;

  const { summary, monthly_trend, category_breakdown, officer_performance } = data;

  const categoryChartData = Object.values(category_breakdown).map(c => ({
    name: c.label,
    Total: c.total,
    Resolved: c.resolved,
    Escalated: c.escalated,
  }));

  return (
    <div className="page">

      {/* Page Header */}
      <div className="analytics-header mb-6">
        <div>
          <h1 className="page-title">Analytics & Reports</h1>
          <p className="page-subtitle">
            Detailed insights and performance statistics
          </p>
        </div>

        {/* Date Range Filter */}
        <form onSubmit={handleFilter} className="analytics-date-filter">
          <div className="analytics-date-group">
            <label className="label">From</label>
            <input
              type="date"
              className="input"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
            />
          </div>
          <div className="analytics-date-group">
            <label className="label">To</label>
            <input
              type="date"
              className="input"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary">Apply</button>
          {(dateFrom || dateTo) && (
            <button type="button" onClick={handleClear} className="btn-secondary">
              Clear
            </button>
          )}
        </form>
      </div>

      {/* Summary Cards */}
      <div className="analytics-summary-grid mb-6">
        <div className="analytics-summary-card analytics-card-blue">
          <div className="analytics-card-icon">📋</div>
          <div className="analytics-card-value">{summary.total}</div>
          <div className="analytics-card-label">Total Complaints</div>
        </div>
        <div className="analytics-summary-card analytics-card-green">
          <div className="analytics-card-icon">✅</div>
          <div className="analytics-card-value">{summary.resolved}</div>
          <div className="analytics-card-label">Resolved</div>
        </div>
        <div className="analytics-summary-card analytics-card-purple">
          <div className="analytics-card-icon">📊</div>
          <div className="analytics-card-value">{summary.resolution_rate}%</div>
          <div className="analytics-card-label">Resolution Rate</div>
        </div>
        <div className="analytics-summary-card analytics-card-orange">
          <div className="analytics-card-icon">⚠️</div>
          <div className="analytics-card-value">{summary.escalated}</div>
          <div className="analytics-card-label">Escalated</div>
        </div>
        <div className="analytics-summary-card analytics-card-red">
          <div className="analytics-card-icon">📈</div>
          <div className="analytics-card-value">{summary.escalation_rate}%</div>
          <div className="analytics-card-label">Escalation Rate</div>
        </div>
        <div className="analytics-summary-card analytics-card-teal">
          <div className="analytics-card-icon">🕐</div>
          <div className="analytics-card-value">{summary.avg_days_to_resolve}</div>
          <div className="analytics-card-label">Avg Days to Resolve</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid-2 mb-6">

        {/* Monthly Trend */}
        <div className="card">
          <div className="analytics-chart-header">
            <h2 className="analytics-chart-title">📅 Monthly Complaint Trend</h2>
            <span className="chart-badge">{monthly_trend.length} months</span>
          </div>
          {monthly_trend.length === 0 ? (
            <p style={{ color: '#9ca3af', fontSize: 14, textAlign: 'center', padding: 40 }}>
              No data available
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={monthly_trend}
                margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, fontSize: 13, border: '1px solid #e5e7eb' }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#1d4ed8"
                  strokeWidth={2}
                  dot={{ fill: '#1d4ed8', r: 4 }}
                  name="Complaints"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Category Breakdown Chart */}
        <div className="card">
          <div className="analytics-chart-header">
            <h2 className="analytics-chart-title">🏷️ Category Breakdown</h2>
            <span className="chart-badge">{categoryChartData.length} categories</span>
          </div>
          {categoryChartData.length === 0 ? (
            <p style={{ color: '#9ca3af', fontSize: 14, textAlign: 'center', padding: 40 }}>
              No data available
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={categoryChartData}
                margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, fontSize: 13, border: '1px solid #e5e7eb' }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Total" fill="#1d4ed8" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Resolved" fill="#16a34a" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Escalated" fill="#f97316" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Category Detailed Table */}
      <div className="card mb-6">
        <div className="analytics-chart-header mb-4">
          <h2 className="analytics-chart-title">🏷️ Category Wise Detailed Breakdown</h2>
        </div>
        {Object.keys(category_breakdown).length === 0 ? (
          <p style={{ color: '#9ca3af', fontSize: 14 }}>No data available</p>
        ) : (
          <div className="table-wrapper" style={{ boxShadow: 'none', border: '1px solid #f3f4f6' }}>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Total</th>
                  <th>Resolved</th>
                  <th>Pending</th>
                  <th>Escalated</th>
                  <th>Resolution Rate</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(category_breakdown).map(cat => (
                  <tr key={cat.label}>
                    <td style={{ fontWeight: 500, textTransform: 'capitalize' }}>
                      {cat.label}
                    </td>
                    <td>{cat.total}</td>
                    <td style={{ color: '#16a34a', fontWeight: 500 }}>{cat.resolved}</td>
                    <td style={{ color: '#ca8a04', fontWeight: 500 }}>{cat.pending}</td>
                    <td style={{ color: '#f97316', fontWeight: 500 }}>{cat.escalated}</td>
                    <td>
                      <div className="analytics-rate-cell">
                        <div className="analytics-rate-bar-wrap">
                          <div
                            className="analytics-rate-bar"
                            style={{ width: `${cat.resolution_rate}%` }}
                          />
                        </div>
                        <span className="analytics-rate-text">{cat.resolution_rate}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Officer Performance Table */}
      <div className="card">
        <div className="analytics-chart-header mb-4">
          <h2 className="analytics-chart-title">👮 Officer Performance Dashboard</h2>
          <span className="chart-badge">{officer_performance.length} officers</span>
        </div>
        {officer_performance.length === 0 ? (
          <p style={{ color: '#9ca3af', fontSize: 14 }}>No officer data available</p>
        ) : (
          <div className="table-wrapper" style={{ boxShadow: 'none', border: '1px solid #f3f4f6' }}>
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Officer Name</th>
                  <th>Badge</th>
                  <th>Station</th>
                  <th>Assigned</th>
                  <th>Resolved</th>
                  <th>Escalated</th>
                  <th>Pending</th>
                  <th>Avg Days</th>
                  <th>Resolution Rate</th>
                </tr>
              </thead>
              <tbody>
                {officer_performance.map((officer, index) => (
                  <tr key={officer.id}>
                    <td>
                      <span className={`analytics-rank analytics-rank-${index + 1}`}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600, color: '#111827' }}>{officer.name}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{officer.badge_number}</td>
                    <td style={{ color: '#6b7280' }}>{officer.station}</td>
                    <td style={{ fontWeight: 500 }}>{officer.total}</td>
                    <td style={{ color: '#16a34a', fontWeight: 600 }}>{officer.resolved}</td>
                    <td style={{ color: '#f97316', fontWeight: 500 }}>{officer.escalated}</td>
                    <td style={{ color: '#ca8a04', fontWeight: 500 }}>{officer.pending}</td>
                    <td style={{ color: '#6b7280' }}>{officer.avg_days_to_resolve} days</td>
                    <td>
                      <div className="analytics-rate-cell">
                        <div className="analytics-rate-bar-wrap">
                          <div
                            className="analytics-rate-bar"
                            style={{
                              width: `${officer.resolution_rate}%`,
                              background: officer.resolution_rate >= 75
                                ? '#16a34a'
                                : officer.resolution_rate >= 50
                                  ? '#ca8a04'
                                  : '#dc2626'
                            }}
                          />
                        </div>
                        <span className="analytics-rate-text">{officer.resolution_rate}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}