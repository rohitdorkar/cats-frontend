// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import toast from 'react-hot-toast';

// export default function LoginPage() {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const user = await login(form.email, form.password);
//       toast.success(`Welcome back, ${user.full_name}!`);
//       if (['operator', 'officer', 'senior', 'admin'].includes(user.role)) {
//         navigate('/dashboard');
//       } else {
//         navigate('/complaints');
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.detail || 'Invalid credentials');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-box">

//         {/* Logo */}
//         <div className="login-logo">
//           <div className="login-logo-icon">🚔</div>
//           <div className="login-logo-title">CATS</div>
//           <div className="login-logo-sub">Complaint Application Tracking System</div>
//         </div>

//         {/* Card */}
//         <div className="login-card">
//           <h2>Sign in to your account</h2>
//           <form className="login-form" onSubmit={handleSubmit}>
//             <div>
//               <label className="label">Email Address</label>
//               <input
//                 type="email"
//                 className="input"
//                 placeholder="you@example.com"
//                 value={form.email}
//                 onChange={e => setForm({ ...form, email: e.target.value })}
//                 required
//               />
//             </div>
//             <div>
//               <label className="label">Password</label>
//               <input
//                 type="password"
//                 className="input"
//                 placeholder="••••••••"
//                 value={form.password}
//                 onChange={e => setForm({ ...form, password: e.target.value })}
//                 required
//               />
//             </div>
//             <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '10px' }}>
//               {loading ? 'Signing in…' : 'Sign In'}
//             </button>
//           </form>

//           <div className="login-footer">
//             Want to track your complaint?{' '}
//             <Link to="/track" style={{ color: '#1d4ed8', fontWeight: 500 }}>
//               Track Here
//             </Link>
//           </div>
//         </div>

//         {/* Demo credentials */}
//         <div className="login-demo">
//           <p><strong>Demo Credentials:</strong></p>
//           <p>Admin: admin@cats.gov.in / admin123</p>
//           <p>Operator: operator@cats.gov.in / operator123</p>
//           <p>Officer: officer1@cats.gov.in / officer123</p>
//         </div>

//       </div>
//     </div>
//   );
// }



import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success(`Welcome back, ${user.full_name}!`);
      if (['operator', 'officer', 'senior', 'admin'].includes(user.role)) {
        navigate('/dashboard');
      } else {
        navigate('/complaints');
      }
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* Left Panel */}
      <div className="login-left-panel">
        <div className="login-left-content">
          <div className="login-brand-icon">🚔</div>
          <h1 className="login-brand-title">CATS</h1>
          <p className="login-brand-full">
            Complaint Application Tracking System
          </p>
          <div className="login-divider" />
          <p className="login-brand-desc">
            A centralized digital platform for citizens to register,
            track and resolve complaints with full transparency.
          </p>

          {/* Feature points */}
          <div className="login-features">
            <div className="login-feature-item">
              <span className="login-feature-icon">📋</span>
              <span>Register complaints online instantly</span>
            </div>
            <div className="login-feature-item">
              <span className="login-feature-icon">🔄</span>
              <span>Real-time status tracking via SMS</span>
            </div>
            <div className="login-feature-item">
              <span className="login-feature-icon">👮</span>
              <span>Assigned to verified police officers</span>
            </div>
            <div className="login-feature-item">
              <span className="login-feature-icon">⚡</span>
              <span>Auto escalation for unresolved cases</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="login-right-panel">
        <div className="login-right-content">

          {/* Header */}
          <div className="login-right-header">
            <div className="login-right-icon">🚔</div>
            <h2 className="login-right-title">Welcome Back</h2>
            <p className="login-right-sub">
              Sign in to access your CATS dashboard
            </p>
          </div>

          {/* Form */}
          <form className="login-form-new" onSubmit={handleSubmit}>
            <div className="login-field">
              <label className="login-label">Email Address</label>
              <div className="login-input-wrap">
                <span className="login-input-icon">✉️</span>
                <input
                  type="email"
                  className="login-input"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="login-field">
              <label className="login-label">Password</label>
              <div className="login-input-wrap">
                <span className="login-input-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="login-input"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="login-show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="login-submit-btn"
            >
              {loading ? (
                <span className="login-btn-loading">
                  <span className="login-spinner" />
                  Signing in…
                </span>
              ) : (
                'Sign In →'
              )}
            </button>
          </form>

          {/* Track link */}
          <div className="login-track-link">
            <span>Want to track your complaint?</span>
            <Link to="/track" className="login-track-anchor">
              Track Here →
            </Link>
          </div>

          {/* Demo credentials */}
          <div className="login-demo-box">
            <p className="login-demo-title">🔑 Demo Credentials</p>
            <div className="login-demo-grid">
              <div className="login-demo-item">
                <span className="login-demo-role">Operator</span>
                <span className="login-demo-cred">operator@cats.gov.in / operator123</span>
              </div>
              <div className="login-demo-item">
                <span className="login-demo-role">Officer1</span>
                <span className="login-demo-cred">officer1@cats.gov.in / officer123</span>
              </div>
              <div className="login-demo-item">
                <span className="login-demo-role">Officer2</span>
                <span className="login-demo-cred">officer2@cats.gov.in / officer123</span>
              </div>
              <div className="login-demo-item">
                <span className="login-demo-role">Officer3</span>
                <span className="login-demo-cred">officer3@cats.gov.in / officer123</span>
              </div>
              <div className="login-demo-item">
                <span className="login-demo-role">Admin</span>
                <span className="login-demo-cred">admin@cats.gov.in / admin123</span>
              </div>
              <div className="login-demo-item">
                <span className="login-demo-role">Senior officer1</span>
                <span className="login-demo-cred">senior@cats.gov.in / senior123</span>
              </div>
              <div className="login-demo-item">
                <span className="login-demo-role">Senior officer2</span>
                <span className="login-demo-cred">amey@cats.gov.in / senior123</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}