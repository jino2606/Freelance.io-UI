import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userRegister } from '../../services/allApis';
import toast from 'react-hot-toast';
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';

function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', firstname: '', lastname: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.username || form.username.length < 3) errs.username = 'Username must be at least 3 characters';
    if (!form.firstname) errs.firstname = 'First name is required';
    if (!form.lastname) errs.lastname = 'Last name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password || form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const result = await userRegister(form);
      if (result.data?.success) {
        toast.success('Account created! Please sign in.');
        navigate('/auth/login');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <span className="logo-dot"></span>
            Freelance.io
          </Link>
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Start your freelancing journey today</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label className="form-label-custom" htmlFor="signup-username">Username</label>
            <input id="signup-username" type="text" name="username" className={`input-custom ${errors.username ? 'input-error' : ''}`}
              placeholder="johndoe" value={form.username} onChange={handleChange} autoFocus />
            {errors.username && <p className="form-error">{errors.username}</p>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label-custom" htmlFor="signup-firstname">First name</label>
              <input id="signup-firstname" type="text" name="firstname" className={`input-custom ${errors.firstname ? 'input-error' : ''}`}
                placeholder="John" value={form.firstname} onChange={handleChange} />
              {errors.firstname && <p className="form-error">{errors.firstname}</p>}
            </div>
            <div className="form-group">
              <label className="form-label-custom" htmlFor="signup-lastname">Last name</label>
              <input id="signup-lastname" type="text" name="lastname" className={`input-custom ${errors.lastname ? 'input-error' : ''}`}
                placeholder="Doe" value={form.lastname} onChange={handleChange} />
              {errors.lastname && <p className="form-error">{errors.lastname}</p>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label-custom" htmlFor="signup-email">Email</label>
            <input id="signup-email" type="email" name="email" className={`input-custom ${errors.email ? 'input-error' : ''}`}
              placeholder="you@example.com" value={form.email} onChange={handleChange} autoComplete="email" />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label-custom" htmlFor="signup-password">Password</label>
            <div className="input-with-icon">
              <input id="signup-password" type={showPassword ? 'text' : 'password'} name="password"
                className={`input-custom ${errors.password ? 'input-error' : ''}`}
                placeholder="Min. 6 characters" value={form.password} onChange={handleChange} autoComplete="new-password" />
              <button type="button" className="input-icon-btn" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="form-error">{errors.password}</p>}
          </div>

          <button type="submit" className="btn-primary-custom btn-block btn-lg" disabled={loading}>
            {loading ? <Loader2 size={18} className="spinning" /> : <>Create account <ArrowRight size={16} /></>}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/auth/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
