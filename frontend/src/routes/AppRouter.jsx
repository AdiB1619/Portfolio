import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';

// Route guard
import ProtectedRoute from './ProtectedRoute';

// Public pages
import Home from '../pages/public/Home';

// Admin pages
import Login from '../pages/admin/Login';
import Dashboard from '../pages/admin/Dashboard';

// Lazy-loaded admin CRUD pages (will be created in later steps)
// import ProjectsPage from '../pages/admin/ProjectsPage';
// import SkillsPage from '../pages/admin/SkillsPage';
// import ExperiencePage from '../pages/admin/ExperiencePage';
// import InboxPage from '../pages/admin/InboxPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public routes ──────────────────────────────────────────── */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* ── Admin login (public) ────────────────────────────────────── */}
        <Route path="/admin/login" element={<Login />} />

        {/* ── Protected admin routes ──────────────────────────────────── */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            {/* Future routes: */}
            {/* <Route path="/admin/projects" element={<ProjectsPage />} /> */}
            {/* <Route path="/admin/skills" element={<SkillsPage />} /> */}
            {/* <Route path="/admin/experience" element={<ExperiencePage />} /> */}
            {/* <Route path="/admin/inbox" element={<InboxPage />} /> */}
          </Route>
        </Route>

        {/* ── Catch-all ───────────────────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
