import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUserJobPostsAPI } from '../../services/allApis';
import ViewApplicants from './ViewApplicants';
import { Eye, Briefcase, Plus } from 'lucide-react';

function MyJobPosts() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getCurrentUserJobPostsAPI();
        setPosts(res.data?.posts || res.data || []);
      } catch (err) { /* handled */ }
      finally { setLoading(false); }
    };
    fetchPosts();
  }, []);

  const stateMap = { 0: 'Open', 1: 'In Progress', 2: 'Closed' };
  const stateStyle = { 0: 'badge-success', 1: 'badge-info', 2: 'badge-danger' };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: '80px' }}></div>)}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <Briefcase size={48} className="empty-state-icon" />
        <h3 className="empty-state-title">No job posts yet</h3>
        <p className="empty-state-text">Create your first job listing to find talent</p>
        <Link to="/jobs/addjobs" className="btn-primary-custom" style={{ marginTop: 'var(--space-4)' }}>
          <Plus size={16} /> Post a Job
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      {posts.map((post, idx) => (
        <div key={post._id} className="card-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)', padding: 'var(--space-4) var(--space-6)' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <Link to={`/job/view/jobdetail/${post._id}`} style={{ textDecoration: 'none' }}>
              <h3 style={{ fontSize: 'var(--text-base)', margin: 0, marginBottom: 'var(--space-1)' }}>{post.jobTitle}</h3>
            </Link>
            <span className={`badge-custom ${stateStyle[post.state]}`}>{stateMap[post.state]}</span>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
            <Link to={`/job/view/jobdetail/${post._id}`} className="btn-ghost btn-sm">
              <Eye size={14} /> View
            </Link>
            <ViewApplicants jobPostId={post._id} jobState={post.state} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyJobPosts;
