import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../context/ContextShare';
import { getJobPostAPI, requestTaskAPI, deleteRequestAPI } from '../../services/allApis';
import ImgCarousel from '../../components/commonComponents/ImgCarousel';
import UserAvatar from '../../components/avatar/UserAvatar';
import toast from 'react-hot-toast';
import { MapPin, Briefcase, GraduationCap, MessageSquare, ExternalLink, Loader2 } from 'lucide-react';

function JobDetails() {
  const { jobPostId } = useParams();
  const { user } = useAuth();
  const [jobPost, setJobPost] = useState(null);
  const [poster, setPoster] = useState(null);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const stateMap = { 0: 'Open', 1: 'In Progress', 2: 'Closed' };
  const stateStyle = { 0: 'badge-success', 1: 'badge-info', 2: 'badge-danger' };

  const fetchData = useCallback(async () => {
    try {
      const res = await getJobPostAPI(jobPostId);
      const data = res.data;
      setJobPost(data.jobPost);
      setPoster(data.jobPoster);
      setRequest(data.jobPostRequests);
    } catch (err) {
      toast.error('Failed to load job details');
    } finally {
      setLoading(false);
    }
  }, [jobPostId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const handleRequestTask = async () => {
    setActionLoading(true);
    try {
      if (!request) {
        const res = await requestTaskAPI({ jobPostId: jobPost._id, requestType: 0 });
        if (res.data?.success) {
          if (window.socket && poster?._id) {
            window.socket.emit('Request Notification', {
              jobPosterId: poster._id,
              notification: res.data.request
            });
          }
          toast.success('Request sent successfully!');
        }
      } else if (request.requestType === 0) {
        const res = await deleteRequestAPI(request._id);
        if (res.data?.success) toast.success('Request withdrawn');
      }
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  const getButtonConfig = () => {
    if (!request) return { text: 'Apply for this job', variant: 'btn-primary-custom', disabled: false };
    if (request.requestType === 0) return { text: 'Withdraw application', variant: 'btn-danger-custom', disabled: false };
    if (request.requestType === 2) return { text: 'Completed', variant: 'btn-success-custom', disabled: true };
    return { text: 'In Progress', variant: 'btn-secondary-custom', disabled: true };
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="container-custom">
          <div className="grid" style={{ gridTemplateColumns: '300px 1fr', gap: 'var(--space-8)' }}>
            <div className="skeleton" style={{ height: '400px', borderRadius: 'var(--radius-lg)' }}></div>
            <div>
              <div className="skeleton skeleton-title" style={{ width: '70%' }}></div>
              <div className="skeleton" style={{ height: '250px', marginTop: 'var(--space-4)' }}></div>
              <div className="skeleton skeleton-text" style={{ marginTop: 'var(--space-4)' }}></div>
              <div className="skeleton skeleton-text"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isOwner = user?._id === poster?._id;
  const btn = getButtonConfig();

  return (
    <div className="page-wrapper">
      <div className="container-custom">
        <div className="job-detail-grid">
          {/* Sidebar - Poster Info */}
          <aside className="card-custom job-poster-card">
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-4)', fontWeight: 600 }}>
                Job Provider
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                <UserAvatar userData={poster} heightxwidth={6} fontSize="1.8rem" />
              </div>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>
                {poster?.firstname} {poster?.lastname}
              </h3>

              {(poster?.city || poster?.state) && (
                <div className="flex items-center justify-center gap-2" style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>
                  <MapPin size={14} />
                  <span>{[poster?.city, poster?.state].filter(Boolean).join(', ') || 'Location not set'}</span>
                </div>
              )}

              {poster?.jobTitle && (
                <div className="flex items-center justify-center gap-2" style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>
                  <Briefcase size={14} />
                  <span>{poster.jobTitle}</span>
                </div>
              )}

              {poster?.education && (
                <div className="flex items-center justify-center gap-2" style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)' }}>
                  <GraduationCap size={14} />
                  <span>{poster.education}</span>
                </div>
              )}

              {/* Social Links */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
                {poster?.github && <a href={poster.github} target="_blank" rel="noopener noreferrer" className="btn-icon" title="GitHub"><ExternalLink size={16} /></a>}
                {poster?.linkedin && <a href={poster.linkedin} target="_blank" rel="noopener noreferrer" className="btn-icon" title="LinkedIn"><ExternalLink size={16} /></a>}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
                {!isOwner && (
                  <Link to={`/user/chats/${poster?._id}`} className="btn-primary-custom btn-block">
                    <MessageSquare size={16} /> Contact
                  </Link>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main>
            <div className="card-custom" style={{ marginBottom: 'var(--space-6)' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                <h1 style={{ fontSize: 'var(--text-2xl)', margin: 0, flex: 1 }}>{jobPost?.jobTitle}</h1>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>₹{jobPost?.jobRate}</p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', margin: 0 }}>Fixed price</p>
                  <span className={`badge-custom ${stateStyle[jobPost?.state]}`} style={{ marginTop: 'var(--space-2)' }}>
                    {stateMap[jobPost?.state]}
                  </span>
                </div>
              </div>

              {/* Images */}
              {jobPost?.jobImages?.length > 0 && (
                <div style={{ marginBottom: 'var(--space-6)' }}>
                  <ImgCarousel jobPostData={jobPost} height="320px" />
                </div>
              )}

              {/* Description */}
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-3)' }}>Description</h3>
                <p style={{ lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{jobPost?.jobDescription}</p>
              </div>

              {/* Skills */}
              {jobPost?.jobSkills?.length > 0 && (
                <div style={{ marginBottom: 'var(--space-6)' }}>
                  <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-3)' }}>Skills Required</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {jobPost.jobSkills.map((skill, i) => (
                      <span key={i} className="badge-custom badge-neutral">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              {!isOwner && (
                <button
                  className={`${btn.variant} btn-block btn-lg`}
                  disabled={btn.disabled || actionLoading}
                  onClick={handleRequestTask}
                >
                  {actionLoading ? <Loader2 size={18} className="spinning" /> : btn.text}
                </button>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// Inject styles
const jobDetailStyles = `
.job-detail-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--space-8);
  align-items: start;
}
.job-poster-card {
  position: sticky;
  top: calc(var(--header-height) + var(--space-6));
}
@media (max-width: 768px) {
  .job-detail-grid {
    grid-template-columns: 1fr;
  }
  .job-poster-card { position: static; }
}
`;
if (typeof document !== 'undefined') {
  const s = document.createElement('style');
  s.textContent = jobDetailStyles;
  document.head.appendChild(s);
}

export default JobDetails;
