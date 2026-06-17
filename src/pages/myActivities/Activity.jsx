import React, { useState } from 'react';
import MyJobPosts from './MyJobPosts';
import MyWorks from './MyWorks';
import { Briefcase, FolderKanban } from 'lucide-react';

function Activity() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="page-wrapper">
      <div className="container-custom">
        <h1 style={{ marginBottom: 'var(--space-6)' }}>My Activity</h1>

        <div className="tabs" style={{ marginBottom: 'var(--space-8)' }}>
          <button className={`tab ${activeTab === 0 ? 'active' : ''}`} onClick={() => setActiveTab(0)}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Briefcase size={15} /> My Job Posts
            </span>
          </button>
          <button className={`tab ${activeTab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <FolderKanban size={15} /> My Works
            </span>
          </button>
        </div>

        {activeTab === 0 ? <MyJobPosts /> : <MyWorks />}
      </div>
    </div>
  );
}

export default Activity;
