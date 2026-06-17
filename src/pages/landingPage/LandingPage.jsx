import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import { ArrowRight, Users, Briefcase, Shield, Zap } from 'lucide-react';

function LandingPage() {
  return (
    <>
      <Header />
      <main className="page-wrapper" style={{ paddingTop: 'calc(var(--header-height) + var(--space-16))' }}>
        {/* Hero */}
        <section className="container-custom" style={{ textAlign: 'center', maxWidth: '720px', marginBottom: 'var(--space-16)' }}>
          <div className="badge-custom badge-info" style={{ marginBottom: 'var(--space-5)', display: 'inline-flex' }}>
            <Zap size={12} /> New: Instant project matching
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: 'var(--space-5)' }}>
            Find talent. Get hired.<br />Build something great.
          </h1>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto var(--space-8)' }}>
            Connect with skilled freelancers or find your next project. Post jobs, apply to gigs, and collaborate — all in one place.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/auth/signup" className="btn-primary-custom btn-lg">
              Get started free <ArrowRight size={16} />
            </Link>
            <Link to="/auth/login" className="btn-secondary-custom btn-lg">
              Sign in
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="container-custom" style={{ marginBottom: 'var(--space-16)' }}>
          <div className="grid grid-cols-3" style={{ maxWidth: '960px', margin: '0 auto' }}>
            {[
              { icon: <Briefcase size={22} />, title: 'Post & Find Jobs', desc: 'Create detailed job listings or browse available projects that match your skills.' },
              { icon: <Users size={22} />, title: 'Connect Directly', desc: 'Chat with clients or freelancers in real-time. No middlemen, no delays.' },
              { icon: <Shield size={22} />, title: 'Manage Projects', desc: 'Track applications, hire talent, and manage project status from your dashboard.' }
            ].map((f, i) => (
              <div key={i} className="card-custom" style={{ textAlign: 'center' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: 'var(--radius-lg)',
                  background: 'var(--accent-light)', color: 'var(--accent)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 'var(--space-4)'
                }}>{f.icon}</div>
                <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>{f.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)', margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section style={{ background: 'var(--bg-primary)', padding: 'var(--space-16) 0', borderTop: '1px solid var(--border-secondary)', borderBottom: '1px solid var(--border-secondary)' }}>
          <div className="container-custom" style={{ maxWidth: '720px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: 'var(--space-10)' }}>How it works</h2>
            <div className="grid grid-cols-3">
              {[
                { num: '1', title: 'Create your profile', desc: 'Sign up and showcase your skills and experience' },
                { num: '2', title: 'Post or apply', desc: 'List a job or browse available opportunities' },
                { num: '3', title: 'Collaborate', desc: 'Connect, negotiate, and deliver great work' }
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: 'var(--radius-full)',
                    background: 'var(--accent)', color: '#fff', fontSize: 'var(--text-sm)',
                    fontWeight: 700, display: 'inline-flex', alignItems: 'center',
                    justifyContent: 'center', marginBottom: 'var(--space-4)'
                  }}>{s.num}</div>
                  <h4 style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>{s.title}</h4>
                  <p style={{ fontSize: 'var(--text-sm)', margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-custom" style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Ready to get started?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>Join thousands of freelancers and clients on Freelance.io</p>
          <Link to="/auth/signup" className="btn-primary-custom btn-lg">
            Create free account <ArrowRight size={16} />
          </Link>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid var(--border-secondary)', padding: 'var(--space-6) 0' }}>
          <div className="container-custom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>© 2024 Freelance.io</span>
            <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>Privacy</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>Terms</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

export default LandingPage;
