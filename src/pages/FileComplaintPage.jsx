// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { complaintsAPI } from '../services/api';
// import { CATEGORIES } from '../utils/helpers';
// import { Field } from '../components/UI';
// import toast from 'react-hot-toast';

// export default function FileComplaintPage() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     title: '', description: '', category: 'other',
//     incident_date: '', incident_location: '',
//     complainant_name: '', complainant_phone: '',
//     complainant_address: '', complainant_email: '',
//   });

//   const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await complaintsAPI.create(form);
//       toast.success('Complaint filed successfully!');
//       navigate('/complaints');
//     } catch (err) {
//       const errors = err.response?.data;
//       if (errors) Object.values(errors).flat().forEach(msg => toast.error(msg));
//       else toast.error('Failed to file complaint');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="page" style={{ maxWidth: 720 }}>
//       <div className="mb-6">
//         <h1 className="page-title">File New Complaint</h1>
//         <p className="page-subtitle">Fill in the citizen's details and incident information</p>
//       </div>

//       <form onSubmit={handleSubmit}>
//         {/* Complainant Info */}
//         <div className="card mb-6">
//           <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Complainant Information</h2>
//           <div className="grid-2">
//             <Field label="Full Name *">
//               <input className="input" required value={form.complainant_name}
//                 onChange={e => set('complainant_name', e.target.value)} placeholder="Citizen's full name" />
//             </Field>
//             <Field label="Phone Number *">
//               <input className="input" required value={form.complainant_phone}
//                 onChange={e => set('complainant_phone', e.target.value)} placeholder="10-digit mobile number" />
//             </Field>
//             <Field label="Email">
//               <input className="input" type="email" value={form.complainant_email}
//                 onChange={e => set('complainant_email', e.target.value)} placeholder="Optional" />
//             </Field>
//             <Field label="Address *">
//               <input className="input" required value={form.complainant_address}
//                 onChange={e => set('complainant_address', e.target.value)} placeholder="Residential address" />
//             </Field>
//           </div>
//         </div>

//         {/* Incident Details */}
//         <div className="card mb-6">
//           <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Incident Details</h2>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//             <Field label="Complaint Title *">
//               <input className="input" required value={form.title}
//                 onChange={e => set('title', e.target.value)} placeholder="Brief title of the complaint" />
//             </Field>
//             <div className="grid-2">
//               <Field label="Category *">
//                 <select className="input" value={form.category} onChange={e => set('category', e.target.value)}>
//                   {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
//                 </select>
//               </Field>
//               <Field label="Date of Incident *">
//                 <input className="input" type="date" required value={form.incident_date}
//                   onChange={e => set('incident_date', e.target.value)}
//                   max={new Date().toISOString().split('T')[0]} />
//               </Field>
//             </div>
//             <Field label="Location of Incident *">
//               <input className="input" required value={form.incident_location}
//                 onChange={e => set('incident_location', e.target.value)} placeholder="Where did the incident occur?" />
//             </Field>
//             <Field label="Detailed Description *">
//               <textarea className="input" rows={5} required value={form.description}
//                 onChange={e => set('description', e.target.value)}
//                 style={{ resize: 'none' }}
//                 placeholder="Provide a detailed description of the incident…" />
//             </Field>
//           </div>
//         </div>

//         <div className="flex gap-3">
//           <button type="submit" disabled={loading} className="btn-primary">
//             {loading ? 'Filing…' : 'File Complaint'}
//           </button>
//           <button type="button" onClick={() => navigate(-1)} className="btn-secondary">Cancel</button>
//         </div>
//       </form>
//     </div>
//   );
// }




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { complaintsAPI, authAPI } from '../services/api';
// import { CATEGORIES, PRIORITIES } from '../utils/helpers';
// import { Field } from '../components/UI';
// import toast from 'react-hot-toast';

// export default function FileComplaintPage() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [officers, setOfficers] = useState([]);
//   const [form, setForm] = useState({
//     title: '', description: '', category: 'other',
//     incident_date: '', incident_location: '',
//     complainant_name: '', complainant_phone: '',
//     complainant_address: '', complainant_email: '',
//     priority: 'medium',
//     assigned_officer: '',
//     deadline: '',
//   });

//   // Load officers list when page loads
//   useEffect(() => {
//     authAPI.getOfficers()
//       .then(res => setOfficers(res.data.results || res.data))
//       .catch(() => toast.error('Failed to load officers list'));
//   }, []);

//   const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   // Validate: if officer selected, deadline is required
//   if (form.assigned_officer && !form.deadline) {
//     toast.error('Please set a deadline when assigning an officer.');
//     return;
//   }

//   setLoading(true);
//   try {
//     // Step 1: File the complaint
//     const res = await complaintsAPI.create({
//       title: form.title,
//       description: form.description,
//       category: form.category,
//       incident_date: form.incident_date,
//       incident_location: form.incident_location,
//       complainant_name: form.complainant_name,
//       complainant_phone: form.complainant_phone,
//       complainant_address: form.complainant_address,
//       complainant_email: form.complainant_email,
//     });

//     const complaintId = res.data.id;
//     const complaintNumber = res.data.complaint_number;

//     if (!complaintId) {
//       toast.error('Complaint filed but could not get ID. Please assign officer manually.');
//       navigate('/complaints');
//       return;
//     }

//     // Step 2: Assign officer if provided
//     if (form.assigned_officer && form.deadline) {
//       try {
//         await complaintsAPI.assign(complaintId, {
//           assigned_officer: parseInt(form.assigned_officer),
//           priority: form.priority,
//           deadline: form.deadline,
//           note: 'Assigned during complaint filing by operator.',
//         });
//         toast.success(`Complaint ${complaintNumber} filed and assigned successfully!`);
//       } catch (assignErr) {
//         // Complaint was filed but assignment failed
//         const assignErrors = assignErr.response?.data;
//         const assignMsg = assignErrors ? JSON.stringify(assignErrors) : 'Unknown error';
//         toast.error(`Complaint filed but assignment failed: ${assignMsg}`);
//         toast('You can assign the officer from the complaint detail page.', { icon: 'ℹ️' });
//       }
//     } else {
//       toast.success(`Complaint ${complaintNumber} filed successfully!`);
//       if (!form.assigned_officer) {
//         toast('No officer assigned yet. Assign from the complaint detail page.', { icon: 'ℹ️' });
//       }
//     }

//     navigate('/complaints');
//   } catch (err) {
//     // Step 1 failed - complaint not filed
//     const errors = err.response?.data;
//     if (errors) {
//       Object.values(errors).flat().forEach(msg => toast.error(msg));
//     } else {
//       toast.error('Failed to file complaint. Please try again.');
//     }
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="page" style={{ maxWidth: 720 }}>
//       <div className="mb-6">
//         <h1 className="page-title">File New Complaint</h1>
//         <p className="page-subtitle">Fill in the citizen's details and incident information</p>
//       </div>

//       <form onSubmit={handleSubmit}>

//         {/* Complainant Info */}
//         <div className="card mb-6">
//           <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Complainant Information</h2>
//           <div className="grid-2">
//             <Field label="Full Name *">
//               <input className="input" required value={form.complainant_name}
//                 onChange={e => set('complainant_name', e.target.value)}
//                 placeholder="Citizen's full name" />
//             </Field>
//             <Field label="Phone Number *">
//               <input className="input" required value={form.complainant_phone}
//                 onChange={e => set('complainant_phone', e.target.value)}
//                 placeholder="10-digit mobile number" />
//             </Field>
//             <Field label="Email">
//               <input className="input" type="email" value={form.complainant_email}
//                 onChange={e => set('complainant_email', e.target.value)}
//                 placeholder="Optional" />
//             </Field>
//             <Field label="Address *">
//               <input className="input" required value={form.complainant_address}
//                 onChange={e => set('complainant_address', e.target.value)}
//                 placeholder="Residential address" />
//             </Field>
//           </div>
//         </div>

//         {/* Incident Details */}
//         <div className="card mb-6">
//           <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Incident Details</h2>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//             <Field label="Complaint Title *">
//               <input className="input" required value={form.title}
//                 onChange={e => set('title', e.target.value)}
//                 placeholder="Brief title of the complaint" />
//             </Field>
//             <div className="grid-2">
//               <Field label="Category *">
//                 <select className="input" value={form.category}
//                   onChange={e => set('category', e.target.value)}>
//                   {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
//                 </select>
//               </Field>
//               <Field label="Date of Incident *">
//                 <input className="input" type="date" required value={form.incident_date}
//                   onChange={e => set('incident_date', e.target.value)}
//                   max={new Date().toISOString().split('T')[0]} />
//               </Field>
//             </div>
//             <Field label="Location of Incident *">
//               <input className="input" required value={form.incident_location}
//                 onChange={e => set('incident_location', e.target.value)}
//                 placeholder="Where did the incident occur?" />
//             </Field>
//             <Field label="Detailed Description *">
//               <textarea className="input" rows={5} required value={form.description}
//                 onChange={e => set('description', e.target.value)}
//                 style={{ resize: 'none' }}
//                 placeholder="Provide a detailed description of the incident…" />
//             </Field>
//           </div>
//         </div>

//         {/* Assignment Details */}
//         <div className="card mb-6">
//           <h2 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Assignment Details</h2>
//           <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
//             You can assign now or do it later from the complaint detail page.
//           </p>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
//             <div className="grid-2">
//               <Field label="Priority *">
//                 <select className="input" value={form.priority}
//                   onChange={e => set('priority', e.target.value)}>
//                   {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
//                 </select>
//               </Field>
//               <Field label="Assign Officer">
//                 <select className="input" value={form.assigned_officer}
//                   onChange={e => set('assigned_officer', e.target.value)}>
//                   <option value="">— Select Officer (optional) —</option>
//                   {officers.map(o => (
//                     <option key={o.id} value={o.id}>
//                       {o.full_name}{o.badge_number ? ` — ${o.badge_number}` : ''}
//                     </option>
//                   ))}
//                 </select>
//               </Field>
//             </div>
//             <Field label={form.assigned_officer ? 'Deadline *' : 'Deadline'}>
//               <input
//                 className="input"
//                 type="date"
//                 value={form.deadline}
//                 onChange={e => set('deadline', e.target.value)}
//                 min={new Date().toISOString().split('T')[0]}
//                 required={!!form.assigned_officer}
//               />
//               {form.assigned_officer && !form.deadline && (
//                 <p style={{ fontSize: 12, color: '#dc2626', marginTop: 4 }}>
//                   Deadline is required when assigning an officer.
//                 </p>
//               )}
//             </Field>
//           </div>
//         </div>

//         <div className="flex gap-3">
//           <button type="submit" disabled={loading} className="btn-primary">
//             {loading ? 'Filing…' : 'File & Assign Complaint'}
//           </button>
//           <button type="button" onClick={() => navigate(-1)} className="btn-secondary">
//             Cancel
//           </button>
//         </div>

//       </form>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { complaintsAPI, authAPI } from '../services/api';
import { CATEGORIES, PRIORITIES } from '../utils/helpers';
import { Field } from '../components/UI';
import toast from 'react-hot-toast';

export default function FileComplaintPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [officers, setOfficers] = useState([]);
  const [form, setForm] = useState({
    title: '', description: '', category: 'other',
    incident_date: '', incident_location: '',
    complainant_name: '', complainant_phone: '',
    complainant_address: '', complainant_email: '',
    priority: 'medium',
    assigned_officer: '',
    deadline: '',
  });

  useEffect(() => {
    authAPI.getOfficers()
      .then(res => setOfficers(res.data.results || res.data))
      .catch(() => toast.error('Failed to load officers list'));
  }, []);

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.assigned_officer && !form.deadline) {
      toast.error('Please set a deadline when assigning an officer.');
      return;
    }
    setLoading(true);
    try {
      const res = await complaintsAPI.create({
        title: form.title,
        description: form.description,
        category: form.category,
        incident_date: form.incident_date,
        incident_location: form.incident_location,
        complainant_name: form.complainant_name,
        complainant_phone: form.complainant_phone,
        complainant_address: form.complainant_address,
        complainant_email: form.complainant_email,
      });

      const complaintId = res.data.id;
      const complaintNumber = res.data.complaint_number;

      if (!complaintId) {
        toast.error('Complaint filed but could not get ID. Please assign officer manually.');
        navigate('/complaints');
        return;
      }

      if (form.assigned_officer && form.deadline) {
        try {
          await complaintsAPI.assign(complaintId, {
            assigned_officer: parseInt(form.assigned_officer),
            priority: form.priority,
            deadline: form.deadline,
            note: 'Assigned during complaint filing by operator.',
          });
          toast.success(`Complaint ${complaintNumber} filed and assigned successfully!`);
        } catch (assignErr) {
          const assignErrors = assignErr.response?.data;
          const assignMsg = assignErrors ? JSON.stringify(assignErrors) : 'Unknown error';
          toast.error(`Complaint filed but assignment failed: ${assignMsg}`);
          toast('You can assign the officer from the complaint detail page.', { icon: 'ℹ️' });
        }
      } else {
        toast.success(`Complaint ${complaintNumber} filed successfully!`);
        if (!form.assigned_officer) {
          toast('No officer assigned yet. Assign from the complaint detail page.', { icon: 'ℹ️' });
        }
      }
      navigate('/complaints');
    } catch (err) {
      const errors = err.response?.data;
      if (errors) {
        Object.values(errors).flat().forEach(msg => toast.error(msg));
      } else {
        toast.error('Failed to file complaint. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-complaint-wrapper">
    <div style={{ maxWidth: 780, margin: '0 auto' }}>

      {/* Page Header */}
      <div className="form-page-header mb-6">
        <div className="form-page-header-icon">📋</div>
        <div>
          <h1 className="page-title">File New Complaint</h1>
          <p className="page-subtitle">Fill in the citizen's details and incident information carefully</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Step 1 — Complainant Info */}
        <div className="form-section mb-6">
          <div className="form-section-header">
            <div className="form-step-badge">1</div>
            <div>
              <h2 className="form-section-title">Complainant Information</h2>
              <p className="form-section-sub">Personal details of the citizen filing the complaint</p>
            </div>
          </div>
          <div className="form-section-body">
            <div className="grid-2">
              <Field label="Full Name *">
                <input className="input" required value={form.complainant_name}
                  onChange={e => set('complainant_name', e.target.value)}
                  placeholder="Citizen's full name" />
              </Field>
              <Field label="Phone Number *">
                <input className="input" required value={form.complainant_phone}
                  onChange={e => set('complainant_phone', e.target.value)}
                  placeholder="10-digit mobile number" />
              </Field>
              <Field label="Email Address">
                <input className="input" type="email" value={form.complainant_email}
                  onChange={e => set('complainant_email', e.target.value)}
                  placeholder="Optional" />
              </Field>
              <Field label="Residential Address *">
                <input className="input" required value={form.complainant_address}
                  onChange={e => set('complainant_address', e.target.value)}
                  placeholder="Full residential address" />
              </Field>
            </div>
          </div>
        </div>

        {/* Step 2 — Incident Details */}
        <div className="form-section mb-6">
          <div className="form-section-header">
            <div className="form-step-badge">2</div>
            <div>
              <h2 className="form-section-title">Incident Details</h2>
              <p className="form-section-sub">Describe the incident as accurately as possible</p>
            </div>
          </div>
          <div className="form-section-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Field label="Complaint Title *">
                <input className="input" required value={form.title}
                  onChange={e => set('title', e.target.value)}
                  placeholder="Brief title describing the complaint" />
              </Field>
              <div className="grid-2">
                <Field label="Category *">
                  <select className="input" value={form.category}
                    onChange={e => set('category', e.target.value)}>
                    {CATEGORIES.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Date of Incident *">
                  <input className="input" type="date" required value={form.incident_date}
                    onChange={e => set('incident_date', e.target.value)}
                    max={new Date().toISOString().split('T')[0]} />
                </Field>
              </div>
              <Field label="Location of Incident *">
                <input className="input" required value={form.incident_location}
                  onChange={e => set('incident_location', e.target.value)}
                  placeholder="Where did the incident occur?" />
              </Field>
              <Field label="Detailed Description *">
                <textarea className="input" rows={5} required value={form.description}
                  onChange={e => set('description', e.target.value)}
                  style={{ resize: 'none' }}
                  placeholder="Provide a detailed description of the incident. Include all relevant facts…" />
              </Field>
            </div>
          </div>
        </div>

        {/* Step 3 — Assignment Details */}
        <div className="form-section mb-6">
          <div className="form-section-header">
            <div className="form-step-badge">3</div>
            <div>
              <h2 className="form-section-title">Assignment Details</h2>
              <p className="form-section-sub">Assign officer now or do it later from the complaint detail page</p>
            </div>
          </div>
          <div className="form-section-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="grid-2">
                <Field label="Priority *">
                  <select className="input" value={form.priority}
                    onChange={e => set('priority', e.target.value)}>
                    {PRIORITIES.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Assign Officer">
                  <select className="input" value={form.assigned_officer}
                    onChange={e => set('assigned_officer', e.target.value)}>
                    <option value="">— Select Officer (optional) —</option>
                    {officers.map(o => (
                      <option key={o.id} value={o.id}>
                        {o.full_name}{o.badge_number ? ` — ${o.badge_number}` : ''}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label={form.assigned_officer ? 'Deadline *' : 'Deadline'}>
                <input
                  className="input"
                  type="date"
                  value={form.deadline}
                  onChange={e => set('deadline', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required={!!form.assigned_officer}
                />
                {form.assigned_officer && !form.deadline && (
                  <p style={{ fontSize: 12, color: '#dc2626', marginTop: 4 }}>
                    ⚠️ Deadline is required when assigning an officer.
                  </p>
                )}
              </Field>

              {/* Priority indicator */}
              {form.priority && (
                <div className={`priority-indicator priority-indicator-${form.priority}`}>
                  <span className="priority-indicator-dot" />
                  <span>
                    {form.priority === 'low' && 'Low Priority — Standard processing time applies'}
                    {form.priority === 'medium' && 'Medium Priority — Should be resolved within standard timeframe'}
                    {form.priority === 'high' && 'High Priority — Requires prompt attention and quick resolution'}
                    {form.priority === 'urgent' && 'Urgent — Immediate action required, escalate if not resolved quickly'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn-primary form-submit-btn">
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="spinner-sm" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }} />
                Filing Complaint…
              </span>
            ) : (
              '📋 File & Assign Complaint'
            )}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary">
            Cancel
          </button>
        </div>

      </form>
    </div>
    </div>
  );
}