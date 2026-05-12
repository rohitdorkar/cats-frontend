import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import LoginPage from './pages/LoginPage';
import TrackComplaintPage from './pages/TrackComplaintPage';
import DashboardPage from './pages/DashboardPage';
import ComplaintsListPage from './pages/ComplaintsListPage';
import ComplaintDetailPage from './pages/ComplaintDetailPage';
import FileComplaintPage from './pages/FileComplaintPage';
import EscalatedPage from './pages/EscalatedPage';
import StaffManagementPage from './pages/StaffManagementPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { fontSize: '14px', borderRadius: '10px' },
            success: { iconTheme: { primary: '#16a34a', secondary: '#fff' } },
            error: { iconTheme: { primary: '#dc2626', secondary: '#fff' } },
          }}
        />
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/track" element={<TrackComplaintPage />} />

          {/* Protected – with sidebar layout */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<Navigate to="/complaints" replace />} />

            {/* Dashboard – staff only */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute roles={['operator', 'officer', 'senior', 'admin']}>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Complaints */}
            <Route path="/complaints" element={<ComplaintsListPage />} />
            <Route path="/complaints/:id" element={<ComplaintDetailPage />} />
            <Route
              path="/complaints/new"
              element={
                <ProtectedRoute roles={['operator', 'admin']}>
                  <FileComplaintPage />
                </ProtectedRoute>
              }
            />

            {/* Escalated – senior/admin */}
            <Route
              path="/escalated"
              element={
                <ProtectedRoute roles={['senior', 'admin']}>
                  <EscalatedPage />
                </ProtectedRoute>
              }
            />

            {/* Staff – admin only */}
            <Route
              path="/staff"
              element={
                <ProtectedRoute roles={['admin']}>
                  <StaffManagementPage />
                </ProtectedRoute>
              }
            />

            {/* Profile */}
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/complaints" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}