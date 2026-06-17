import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/header/Header';
import { useAuth } from './context/ContextShare';
import socketConnection from './services/socketConnect';

// Lazy-loaded pages
const LandingPage = lazy(() => import('./pages/landingPage/LandingPage'));
const Login = lazy(() => import('./pages/Authentication/Login'));
const SignUp = lazy(() => import('./pages/Authentication/SignUp'));
const Home = lazy(() => import('./pages/homePage/Home'));
const UserData = lazy(() => import('./pages/user/UserData'));
const Addjobs = lazy(() => import('./pages/addJobs/Addjobs'));
const JobDetails = lazy(() => import('./pages/viewJob/JobDetails'));
const ChatWindow = lazy(() => import('./pages/chatapp/ChatWindow'));
const Activity = lazy(() => import('./pages/myActivities/Activity'));

// Route guard
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
  return children;
}

function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/home" replace />;
  return children;
}

// Page loader
function PageLoader() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'60vh' }}>
      <div className="spinner-lg"></div>
    </div>
  );
}

function AppLayout({ children, showHeader = true }) {
  return (
    <>
      {showHeader && <Header />}
      <Suspense fallback={<PageLoader />}>
        {children}
      </Suspense>
    </>
  );
}

function App() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      socketConnection();
    }
  }, [isAuthenticated]);

  return (
    <>
      <Routes>
        {/* Public */}
        <Route path="/" element={
          <Suspense fallback={<PageLoader />}><LandingPage /></Suspense>
        } />
        <Route path="/auth/login" element={
          <GuestRoute><Suspense fallback={<PageLoader />}><Login /></Suspense></GuestRoute>
        } />
        <Route path="/auth/signup" element={
          <GuestRoute><Suspense fallback={<PageLoader />}><SignUp /></Suspense></GuestRoute>
        } />

        {/* Protected */}
        <Route path="/home" element={
          <ProtectedRoute><AppLayout><Home /></AppLayout></ProtectedRoute>
        } />
        <Route path="/user/profile" element={
          <ProtectedRoute><AppLayout><UserData /></AppLayout></ProtectedRoute>
        } />
        <Route path="/jobs/addjobs" element={
          <ProtectedRoute><AppLayout><Addjobs /></AppLayout></ProtectedRoute>
        } />
        <Route path="/job/view/jobdetail/:jobPostId" element={
          <ProtectedRoute><AppLayout><JobDetails /></AppLayout></ProtectedRoute>
        } />
        <Route path="/user/chats/:selectedReceiverId" element={
          <ProtectedRoute><AppLayout><ChatWindow /></AppLayout></ProtectedRoute>
        } />
        <Route path="/user/activity" element={
          <ProtectedRoute><AppLayout><Activity /></AppLayout></ProtectedRoute>
        } />

        {/* 404 */}
        <Route path="*" element={
          <AppLayout>
            <div className="page-wrapper">
              <div className="container-custom">
                <div className="empty-state">
                  <h1>404</h1>
                  <p className="empty-state-text">Page not found</p>
                </div>
              </div>
            </div>
          </AppLayout>
        } />
      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            borderRadius: '8px',
            background: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-secondary)',
            boxShadow: 'var(--shadow-lg)'
          },
          success: { iconTheme: { primary: 'var(--success)', secondary: '#fff' } },
          error: { iconTheme: { primary: 'var(--danger)', secondary: '#fff' } }
        }}
      />
    </>
  );
}

export default App;
