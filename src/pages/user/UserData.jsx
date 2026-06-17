import React, { useState } from 'react';
import { useAuth } from '../../context/ContextShare';
import { updateProfileAPI } from '../../services/allApis';
import { BASE_URL } from '../../services/baseUrl';
import toast from 'react-hot-toast';
import { Camera, Edit3, Save, X, MapPin, Briefcase, GraduationCap, ExternalLink, Globe, Loader2 } from 'lucide-react';

function UserData() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({ ...user });
  const [profileImg, setProfileImg] = useState(null);
  const [imgPreview, setImgPreview] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProfileImg(file);
    setImgPreview(URL.createObjectURL(file));
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({ ...user });
    setProfileImg(null);
    setImgPreview('');
    setIsEditing(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const body = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (val !== undefined && val !== null && key !== 'profileImg' && key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'contactedUsers') {
          body.append(key, val);
        }
      });
      if (profileImg) body.append('profileImg', profileImg);

      const res = await updateProfileAPI(body);
      const updated = res.data?.user || res.data;
      if (updated) {
        updateUser(updated);
        setFormData({ ...updated });
        toast.success('Profile updated');
        setIsEditing(false);
        setImgPreview('');
        setProfileImg(null);
      }
    } catch (err) {
      toast.error('Update failed');
    } finally {
      setSaving(false);
    }
  };

  const getInitials = () => {
    return `${(user?.firstname?.[0] || '').toUpperCase()}${(user?.lastname?.[0] || '').toUpperCase()}`;
  };

  const avatarSrc = imgPreview || (user?.profileImg?.length > 0 && user.profileImg[0]?.filename
    ? `${BASE_URL}/uploads/${user.profileImg[0].filename}` : null);

  const Field = ({ label, name, type = 'text', placeholder, icon, disabled }) => (
    <div className="form-group">
      <label className="form-label-custom">{icon} {label}</label>
      <input className="input-custom" type={type} name={name} placeholder={placeholder}
        value={formData?.[name] || ''} onChange={handleChange} disabled={disabled || !isEditing} />
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="container-custom" style={{ maxWidth: '800px' }}>
        {/* Profile Header */}
        <div className="card-custom" style={{ marginBottom: 'var(--space-6)', textAlign: 'center', paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-10)' }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 'var(--space-5)' }}>
            <div className="avatar avatar-2xl">
              {avatarSrc ? (
                <img src={avatarSrc} alt="Profile" />
              ) : getInitials()}
            </div>
            <label style={{
              position: 'absolute', bottom: '2px', right: '2px', width: '32px', height: '32px',
              borderRadius: '50%', background: 'var(--accent)', color: '#fff', border: '3px solid var(--bg-elevated)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }}>
              <Camera size={14} />
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </label>
          </div>

          <h2 style={{ marginBottom: 'var(--space-1)' }}>{user?.firstname} {user?.lastname}</h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', margin: 0 }}>@{user?.username}</p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-6)', marginTop: 'var(--space-4)', flexWrap: 'wrap' }}>
            {user?.city && <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}><MapPin size={14} /> {user.city}{user.state ? `, ${user.state}` : ''}</span>}
            {user?.jobTitle && <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}><Briefcase size={14} /> {user.jobTitle}</span>}
            {user?.education && <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}><GraduationCap size={14} /> {user.education}</span>}
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
            {user?.github && <a href={user.github} target="_blank" rel="noopener noreferrer" className="btn-icon"><ExternalLink size={18} /></a>}
            {user?.linkedin && <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="btn-icon"><ExternalLink size={18} /></a>}
            {user?.profile && <a href={user.profile} target="_blank" rel="noopener noreferrer" className="btn-icon"><Globe size={18} /></a>}
          </div>
        </div>

        {/* Edit Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          {!isEditing ? (
            <button className="btn-primary-custom" onClick={() => setIsEditing(true)}><Edit3 size={15} /> Edit Profile</button>
          ) : (
            <>
              <button className="btn-secondary-custom" onClick={handleCancel}><X size={15} /> Cancel</button>
              <button className="btn-success-custom" onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 size={15} className="spinning" /> : <><Save size={15} /> Save</>}
              </button>
            </>
          )}
        </div>

        {/* Personal Info */}
        <div className="card-custom" style={{ marginBottom: 'var(--space-6)' }}>
          <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-5)' }}>Personal Information</h3>
          <div className="grid grid-cols-3">
            <Field label="Username" name="username" placeholder="Username" />
            <Field label="First Name" name="firstname" placeholder="First name" />
            <Field label="Last Name" name="lastname" placeholder="Last name" />
          </div>
          <Field label="Email" name="email" type="email" placeholder="Email" />
        </div>

        {/* Professional */}
        <div className="card-custom" style={{ marginBottom: 'var(--space-6)' }}>
          <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-5)' }}>Professional</h3>
          <div className="grid grid-cols-2">
            <Field label="Job Title" name="jobTitle" placeholder="Your profession" />
            <Field label="Education" name="education" placeholder="College / University" />
          </div>
          <div className="form-group">
            <label className="form-label-custom">About</label>
            <textarea className="textarea-custom" name="userDescription" placeholder="Tell us about yourself..."
              value={formData?.userDescription || ''} onChange={handleChange} disabled={!isEditing} />
          </div>
        </div>

        {/* Social Links */}
        <div className="card-custom" style={{ marginBottom: 'var(--space-6)' }}>
          <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-5)' }}>Social Links</h3>
          <div className="grid grid-cols-3">
            <Field label="GitHub" name="github" placeholder="GitHub URL" />
            <Field label="LinkedIn" name="linkedin" placeholder="LinkedIn URL" />
            <Field label="Portfolio" name="profile" placeholder="Portfolio URL" />
          </div>
        </div>

        {/* Address */}
        <div className="card-custom">
          <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-5)' }}>Address</h3>
          <Field label="Address Line 1" name="address1" placeholder="Street address" />
          <Field label="Address Line 2" name="address2" placeholder="Apartment, suite, etc." />
          <div className="grid grid-cols-3">
            <Field label="City" name="city" placeholder="City" />
            <Field label="State" name="state" placeholder="State" />
            <Field label="Zip Code" name="zipcode" placeholder="Zip" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserData;
