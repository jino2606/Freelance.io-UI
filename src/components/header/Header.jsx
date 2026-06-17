import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/ContextShare';
import { useTheme } from '../../context/ContextShare';
import { userLogout } from '../../services/allApis';
import { Menu, X, Sun, Moon, Bell, ChevronDown, User, LogOut, Briefcase, LayoutDashboard } from 'lucide-react';
import toast from 'react-hot-toast';
import './header.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await userLogout();
    } catch (e) { /* continue logout even if API fails */ }
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const getInitials = () => {
    if (!user) return '?';
    return `${(user.firstname?.[0] || '').toUpperCase()}${(user.lastname?.[0] || '').toUpperCase()}`;
  };

  return (
    <header className="app-header">
      <div className="header-inner container-custom">
        <Link to={isAuthenticated ? '/home' : '/'} className="header-logo">
          <span className="logo-dot"></span>
          Freelance.io
        </Link>

        {isAuthenticated ? (
          <>
            <nav className={`header-nav ${mobileMenuOpen ? 'open' : ''}`}>
              <Link to="/home" className={`nav-link ${isActive('/home') ? 'active' : ''}`}>
                <LayoutDashboard size={16} />
                <span>Browse</span>
              </Link>
              <Link to="/jobs/addjobs" className={`nav-link ${isActive('/jobs/addjobs') ? 'active' : ''}`}>
                <Briefcase size={16} />
                <span>Post a Job</span>
              </Link>
              <Link to="/user/activity" className={`nav-link ${isActive('/user/activity') ? 'active' : ''}`}>
                <LayoutDashboard size={16} />
                <span>My Activity</span>
              </Link>
            </nav>

            <div className="header-actions">
              <button className="btn-icon" onClick={toggleTheme} aria-label="Toggle theme" title={theme === 'light' ? 'Dark mode' : 'Light mode'}>
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
              <button className="btn-icon" aria-label="Notifications">
                <Bell size={18} />
              </button>

              <div className="profile-dropdown" ref={dropdownRef}>
                <button className="profile-trigger" onClick={() => setProfileOpen(!profileOpen)}>
                  <div className="avatar avatar-sm">
                    {getInitials()}
                  </div>
                  <ChevronDown size={14} className={`chevron ${profileOpen ? 'rotated' : ''}`} />
                </button>

                {profileOpen && (
                  <div className="dropdown-menu-custom">
                    <div className="dropdown-header">
                      <p className="dropdown-name">{user?.firstname} {user?.lastname}</p>
                      <p className="dropdown-email">{user?.email}</p>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link to="/user/profile" className="dropdown-item">
                      <User size={15} /> Profile
                    </Link>
                    <Link to="/user/activity" className="dropdown-item">
                      <Briefcase size={15} /> My Activity
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item danger" onClick={handleLogout}>
                      <LogOut size={15} /> Sign out
                    </button>
                  </div>
                )}
              </div>

              <button className="mobile-menu-btn btn-icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </>
        ) : (
          <div className="header-actions">
            <button className="btn-icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <Link to="/auth/login" className="btn-ghost">Log in</Link>
            <Link to="/auth/signup" className="btn-primary-custom btn-sm">Sign up</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
