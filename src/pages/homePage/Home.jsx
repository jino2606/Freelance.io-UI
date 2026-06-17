import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getJobPosts } from './getPostsSlice';
import { useAuth } from '../../context/ContextShare';
import { Search, Plus, Briefcase } from 'lucide-react';
import { BASE_URL } from '../../services/baseUrl';
import '../../pages/landingPage/landingPage.css';

function Home() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { response, loading } = useSelector((state) => state.jobPostReducer);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getJobPosts());
  }, [dispatch]);

  const posts = useMemo(() => {
    const data = response?.posts || response || [];
    if (!search) return data;
    return data.filter(p =>
      p.jobTitle?.toLowerCase().includes(search.toLowerCase()) ||
      p.jobSkills?.some(s => s.toLowerCase().includes(search.toLowerCase()))
    );
  }, [response, search]);

  const stateLabels = { 0: 'Open', 1: 'In Progress', 2: 'Closed' };
  const stateStyles = { 0: 'badge-success', 1: 'badge-info', 2: 'badge-danger' };

  const getInitials = (u) => {
    if (!u) return '?';
    return `${(u.firstname?.[0] || '').toUpperCase()}${(u.lastname?.[0] || '').toUpperCase()}`;
  };

  return (
    <div className="page-wrapper">
      <div className="container-custom">
        {/* Greeting & Quick Actions */}
        <div className="home-top">
          <div>
            <h1 style={{ marginBottom: '4px' }}>
              Welcome back{user?.firstname ? `, ${user.firstname}` : ''}
            </h1>
            <p style={{ margin: 0, fontSize: 'var(--text-sm)' }}>Find your next opportunity or post a job</p>
          </div>
          <Link to="/jobs/addjobs" className="btn-primary-custom">
            <Plus size={16} /> Post a Job
          </Link>
        </div>

        {/* Search */}
        <div className="search-container" style={{ marginTop: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
          <div className="input-with-icon" style={{ maxWidth: '560px' }}>
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input
              className="input-custom"
              style={{ paddingLeft: '38px' }}
              placeholder="Search jobs by title or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Section Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>Recent Jobs</h2>
          <span className="badge-custom badge-neutral">{posts.length} {posts.length === 1 ? 'job' : 'jobs'}</span>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-3">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="skeleton skeleton-card" style={{ height: '320px' }}></div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && posts.length === 0 && (
          <div className="empty-state">
            <Briefcase size={48} className="empty-state-icon" />
            <h3 className="empty-state-title">{search ? 'No jobs match your search' : 'No jobs posted yet'}</h3>
            <p className="empty-state-text">{search ? 'Try adjusting your search terms' : 'Be the first to post a job!'}</p>
            {!search && (
              <Link to="/jobs/addjobs" className="btn-primary-custom" style={{ marginTop: 'var(--space-5)' }}>
                <Plus size={16} /> Post a Job
              </Link>
            )}
          </div>
        )}

        {/* Job Cards Grid */}
        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-3">
            {posts.map((post) => {
              const postUser = post.user?.[0] || post.userId || {};
              const firstImage = post.jobImages?.[0];
              const imgSrc = firstImage?.filename
                ? `${BASE_URL}/uploads/job/posts/${firstImage.filename}`
                : null;

              return (
                <Link to={`/job/view/jobdetail/${post._id}`} key={post._id} style={{ textDecoration: 'none' }}>
                  <div className="card-custom card-interactive" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Image */}
                    {imgSrc && (
                      <div style={{
                        height: '160px',
                        borderRadius: 'var(--radius-md)', overflow: 'hidden',
                        background: 'var(--bg-tertiary)', margin: 'calc(-1 * var(--space-6))',
                        marginBottom: 'var(--space-4)'
                      }}>
                        <img src={imgSrc} alt={post.jobTitle} loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}

                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                      <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 600, margin: 0, flex: 1, lineHeight: 1.4 }}>
                        {post.jobTitle?.length > 60 ? post.jobTitle.substring(0, 60) + '...' : post.jobTitle}
                      </h3>
                      <span className={`badge-custom ${stateStyles[post.state] || 'badge-neutral'}`}>
                        {stateLabels[post.state] || 'Unknown'}
                      </span>
                    </div>

                    {/* Description */}
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', margin: 0, marginBottom: 'var(--space-4)', flex: 1, lineHeight: 1.6 }}>
                      {post.jobDescription?.substring(0, 120)}{post.jobDescription?.length > 120 ? '...' : ''}
                    </p>

                    {/* Skills */}
                    {post.jobSkills?.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                        {post.jobSkills.slice(0, 4).map((skill, idx) => (
                          <span key={idx} className="badge-custom badge-neutral">{skill}</span>
                        ))}
                        {post.jobSkills.length > 4 && <span className="badge-custom badge-neutral">+{post.jobSkills.length - 4}</span>}
                      </div>
                    )}

                    {/* Footer */}
                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-secondary)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <div className="avatar avatar-xs">{getInitials(postUser)}</div>
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                          {postUser.username || 'Unknown'}
                        </span>
                      </div>
                      <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>
                        ₹{post.jobRate}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* Inline style helper */
const styles = `
.home-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-4);
}
@media (max-width: 640px) {
  .home-top { flex-direction: column; align-items: flex-start; }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = styles;
  document.head.appendChild(style);
}

export default Home;
