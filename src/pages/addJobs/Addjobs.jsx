import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJobPostAPI } from '../../services/allApis';
import toast from 'react-hot-toast';
import { ArrowLeft, ArrowRight, Check, X, Plus, Upload, Loader2 } from 'lucide-react';

const STEPS = ['Title', 'Skills', 'Images', 'Description', 'Budget'];

function Addjobs() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '', jobSkills: [], jobImages: [], jobDescription: '', jobRate: ''
  });
  const [skillInput, setSkillInput] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleNext = () => { if (step < 4) setStep(step + 1); };
  const handleBack = () => { if (step > 0) setStep(step - 1); };

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !formData.jobSkills.includes(s)) {
      setFormData({ ...formData, jobSkills: [...formData.jobSkills, s] });
    }
    setSkillInput('');
  };

  const removeSkill = (idx) => {
    setFormData({ ...formData, jobSkills: formData.jobSkills.filter((_, i) => i !== idx) });
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    const valid = files.filter(f => ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(f.type));
    if (valid.length !== files.length) toast.error('Only PNG, JPG, WebP images allowed');
    setFormData({ ...formData, jobImages: [...formData.jobImages, ...valid] });
    setImagePreviews(prev => [...prev, ...valid.map(f => URL.createObjectURL(f))]);
  };

  const removeImage = (idx) => {
    setFormData({ ...formData, jobImages: formData.jobImages.filter((_, i) => i !== idx) });
    setImagePreviews(imagePreviews.filter((_, i) => i !== idx));
  };

  const handlePost = async () => {
    const { jobTitle, jobSkills, jobDescription, jobRate } = formData;
    if (!jobTitle) { toast.error('Title is required'); setStep(0); return; }
    if (jobSkills.length === 0) { toast.error('Add at least one skill'); setStep(1); return; }
    if (!jobDescription || jobDescription.length < 50) { toast.error('Description must be at least 50 characters'); setStep(3); return; }
    if (!jobRate) { toast.error('Budget is required'); setStep(4); return; }

    setLoading(true);
    try {
      const body = new FormData();
      body.append('jobTitle', jobTitle);
      body.append('jobDescription', jobDescription);
      body.append('jobRate', jobRate);
      jobSkills.forEach(s => body.append('jobSkills', s));
      formData.jobImages.forEach(f => body.append('jobImages', f));

      const res = await createJobPostAPI(body);
      if (res.data?.success) {
        toast.success('Job posted successfully!');
        navigate('/home');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container-custom" style={{ maxWidth: '680px' }}>
        {/* Progress */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
            {STEPS.map((s, i) => (
              <button key={i} onClick={() => setStep(i)} style={{
                fontSize: 'var(--text-xs)', fontWeight: 500, border: 'none', background: 'none', cursor: 'pointer',
                color: i <= step ? 'var(--accent)' : 'var(--text-tertiary)', fontFamily: 'var(--font-sans)'
              }}>{s}</button>
            ))}
          </div>
          <div style={{ height: '3px', background: 'var(--bg-tertiary)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${((step + 1) / 5) * 100}%`, background: 'var(--accent)', transition: 'width 0.3s ease', borderRadius: '2px' }} />
          </div>
        </div>

        <div className="card-custom">
          <h2 style={{ marginBottom: 'var(--space-2)' }}>
            {['Job Title', 'Required Skills', 'Project Images', 'Job Description', 'Set Budget'][step]}
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>
            {[
              'Give your project a clear, descriptive title',
              'Add skills required for this project',
              'Upload images to showcase your project (optional)',
              'Describe the work needed in detail',
              'Set the budget for this project'
            ][step]}
          </p>

          {/* Step 0: Title */}
          {step === 0 && (
            <div className="form-group">
              <input className="input-custom" placeholder="e.g. Build a responsive e-commerce website" value={formData.jobTitle}
                onChange={e => setFormData({ ...formData, jobTitle: e.target.value })} autoFocus />
            </div>
          )}

          {/* Step 1: Skills */}
          {step === 1 && (
            <>
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <input className="input-custom" placeholder="Type a skill and press Add" value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }} />
                <button className="btn-primary-custom" onClick={addSkill} style={{ flexShrink: 0 }}><Plus size={16} /> Add</button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {formData.jobSkills.map((s, i) => (
                  <span key={i} className="badge-custom badge-info" style={{ cursor: 'pointer', gap: '6px' }} onClick={() => removeSkill(i)}>
                    {s} <X size={12} />
                  </span>
                ))}
              </div>
              {formData.jobSkills.length === 0 && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', marginTop: 'var(--space-3)' }}>No skills added yet</p>}
            </>
          )}

          {/* Step 2: Images */}
          {step === 2 && (
            <>
              <label style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: 'var(--space-10)', border: '2px dashed var(--border-primary)', borderRadius: 'var(--radius-lg)',
                cursor: 'pointer', transition: 'all 0.2s', marginBottom: 'var(--space-4)'
              }}>
                <Upload size={24} style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)' }} />
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', margin: 0 }}>Click to upload images</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', margin: 0 }}>PNG, JPG, WebP up to 10MB each</p>
                <input type="file" accept="image/*" multiple onChange={handleImages} style={{ display: 'none' }} />
              </label>
              {imagePreviews.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)' }}>
                  {imagePreviews.map((url, i) => (
                    <div key={i} style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', aspectRatio: '16/9' }}>
                      <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button onClick={() => removeImage(i)} style={{
                        position: 'absolute', top: '4px', right: '4px', width: '24px', height: '24px',
                        borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.6)', color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                      }}><X size={12} /></button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Step 3: Description */}
          {step === 3 && (
            <div className="form-group">
              <textarea className="textarea-custom" placeholder="Describe the project scope, deliverables, timeline..."
                value={formData.jobDescription} onChange={e => setFormData({ ...formData, jobDescription: e.target.value })}
                style={{ minHeight: '200px' }} />
              <p className="form-hint">{formData.jobDescription.length}/50 minimum characters</p>
            </div>
          )}

          {/* Step 4: Budget */}
          {step === 4 && (
            <div className="form-group">
              <label className="form-label-custom">Fixed Price (₹)</label>
              <input className="input-custom" type="number" placeholder="Enter amount" value={formData.jobRate}
                onChange={e => setFormData({ ...formData, jobRate: e.target.value })} min="1" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-6)' }}>
          <button className="btn-secondary-custom" onClick={handleBack} disabled={step === 0}>
            <ArrowLeft size={16} /> Back
          </button>
          {step < 4 ? (
            <button className="btn-primary-custom" onClick={handleNext}>
              Next <ArrowRight size={16} />
            </button>
          ) : (
            <button className="btn-success-custom" onClick={handlePost} disabled={loading}>
              {loading ? <Loader2 size={18} className="spinning" /> : <><Check size={16} /> Post Job</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Addjobs;
