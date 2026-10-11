import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import StudentDetails from './pages/StudentDetails';
import EnrollmentForm from './pages/EnrollmentForm';
import Attendance from './pages/Attendance';
import Fees from './pages/Fees';
import Gradebook from './pages/Gradebook';
import Reports from './pages/Reports';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPlaceholder from './pages/admin/AdminPlaceholder';
import StudentLayout from './layouts/StudentLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentPlaceholder from './pages/student/StudentPlaceholder';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Faculty / staff (existing) */}
      <Route path="/app" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="students/enroll" element={<EnrollmentForm />} />
        <Route path="students/:id" element={<StudentDetails />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="fees" element={<Fees />} />
        <Route path="gradebook" element={<Gradebook />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* System Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="campuses" element={<AdminPlaceholder />} />
        <Route path="users" element={<AdminPlaceholder />} />
        <Route path="revenue" element={<AdminPlaceholder />} />
        <Route path="rbac" element={<AdminPlaceholder />} />
        <Route path="audit" element={<AdminPlaceholder />} />
        <Route path="integrations" element={<AdminPlaceholder />} />
        <Route path="comms" element={<AdminPlaceholder />} />
        <Route path="branding" element={<AdminPlaceholder />} />
      </Route>

      {/* Student */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="timetable" element={<StudentPlaceholder />} />
        <Route path="grades" element={<StudentPlaceholder />} />
        <Route path="attendance" element={<StudentPlaceholder />} />
        <Route path="fees" element={<StudentPlaceholder />} />
        <Route path="courses" element={<StudentPlaceholder />} />
        <Route path="profile" element={<StudentPlaceholder />} />
        <Route path="notices" element={<StudentPlaceholder />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}