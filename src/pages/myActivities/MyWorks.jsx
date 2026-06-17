import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyWorksAPI } from '../../services/allApis';
import { Eye, FolderKanban } from 'lucide-react';

function MyWorks() {
  const [loading, setLoading] = useState(true);
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await getMyWorksAPI();
        setWorks(res.data?.works || res.data || []);
      } catch (err) { /* handled */ }
      finally { setLoading(false); }
    };
    fetchWorks();
  }, []);

  const stateMap = { 0: 'Requested', 1: 'In Progress', 2: 'Completed' };
  const stateStyle = { 0: 'badge-info', 1: 'badge-warning', 2: 'badge-success' };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: '80px' }}></div>)}
      </div>
    );
  }

  if (works.length === 0) {
    return (
      <div className="empty-state">
        <FolderKanban size={48} className="empty-state-icon" />
        <h3 className="empty-state-title">No works yet</h3>
        <p className="empty-state-text">Apply to jobs to start building your portfolio</p>
        <Link to="/home" className="btn-primary-custom" style={{ marginTop: 'var(--space-4)' }}>
          Browse Jobs
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      {works.map((work) => {
        const job = work.jobPostId || {};
        return (
          <div key={work._id} className="card-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)', padding: 'var(--space-4) var(--space-6)' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <Link to={`/job/view/jobdetail/${job._id}`} style={{ textDecoration: 'none' }}>
                <h3 style={{ fontSize: 'var(--text-base)', margin: 0, marginBottom: 'var(--space-1)' }}>{job.jobTitle || 'Untitled'}</h3>
              </Link>
              <span className={`badge-custom ${stateStyle[work.requestType]}`}>{stateMap[work.requestType]}</span>
            </div>
            <Link to={`/job/view/jobdetail/${job._id}`} className="btn-ghost btn-sm">
              <Eye size={14} /> View Job
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default MyWorks;
