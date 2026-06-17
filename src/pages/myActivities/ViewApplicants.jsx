import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getRequestedUsersAPI, updateRequestAPI } from '../../services/allApis';
import UserAvatar from '../../components/avatar/UserAvatar';
import toast from 'react-hot-toast';
import { Users, MessageSquare, UserPlus, CheckCircle, X } from 'lucide-react';

function ViewApplicants({ jobPostId, jobState }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [applicants, setApplicants] = useState([]);

  const fetchApplicants = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getRequestedUsersAPI(jobPostId);
      setApplicants(res.data?.applicants || res.data || []);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, [jobPostId]);

  useEffect(() => {
    if (isOpen) fetchApplicants();
  }, [isOpen, fetchApplicants]);

  const handleUpdate = async (requestId, userId, state) => {
    try {
      await updateRequestAPI({ requestId, requestedUserId: userId, jobPostId, state });
      toast.success('Updated successfully');
      fetchApplicants();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <>
      <button className="btn-primary-custom btn-sm" onClick={() => setIsOpen(true)}>
        <Users size={14} /> Applicants
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}>
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Applicants</h3>
              <button className="btn-icon" onClick={() => setIsOpen(false)}><X size={18} /></button>
            </div>

            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {[1,2].map(i => <div key={i} className="skeleton" style={{ height: '60px' }}></div>)}
              </div>
            ) : applicants.length === 0 ? (
              <div className="empty-state" style={{ padding: 'var(--space-8)' }}>
                <Users size={36} className="empty-state-icon" />
                <h3 className="empty-state-title">No applicants yet</h3>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {applicants.map((app) => {
                  const appUser = app.user?.[0] || {};
                  return (
                    <div key={app._id} className="card-custom" style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <UserAvatar userData={appUser} heightxwidth={2.5} fontSize="14px" />
                        <div>
                          <p style={{ fontWeight: 600, margin: 0, fontSize: 'var(--text-sm)' }}>{appUser.username || 'User'}</p>
                          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', margin: 0 }}>
                            {appUser.firstname} {appUser.lastname}
                          </p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                        <Link to={`/user/chats/${appUser._id}`} className="btn-ghost btn-sm">
                          <MessageSquare size={14} />
                        </Link>
                        {app.state === 0 && (
                          <button className="btn-success-custom btn-sm" onClick={() => handleUpdate(app._id, appUser._id, 1)}>
                            <UserPlus size={14} /> Hire
                          </button>
                        )}
                        {app.state === 1 && (
                          <button className="btn-primary-custom btn-sm" onClick={() => handleUpdate(app._id, appUser._id, 2)}>
                            <CheckCircle size={14} /> Complete
                          </button>
                        )}
                        {app.state === 2 && (
                          <span className="badge-custom badge-success"><CheckCircle size={12} /> Done</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ViewApplicants;
