import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gradient-mesh flex-center" style={{ minHeight: '100vh', padding: '2rem' }}>
      <div className="container">
        <div className="glass-card animate-fade-in" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            {/* Placeholder for OneASHA Logo */}
            <div style={{
              width: '80px', 
              height: '80px', 
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '2rem',
              fontWeight: 'bold',
              boxShadow: 'var(--shadow-lg)'
            }}>
              +
            </div>
          </div>
          
          <h1 style={{ color: 'var(--text-main)' }}>Welcome to OneASHA</h1>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem' }}>
            Unified Offline-First Healthcare Platform for ASHA Workers. 
            Real-time analytics, household surveys, and predictive health tracking.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/oneasha.apk" download="oneasha.apk" style={{ textDecoration: 'none' }}>
              <button className="btn btn-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download Mobile App
              </button>
            </a>
            <Link href="/login">
              <button className="btn" style={{ 
                background: 'var(--surface)', 
                color: 'var(--text-main)', 
                border: '1px solid var(--border)' 
              }}>
                Login to Admin Dashboard
              </button>
            </Link>
          </div>
          
          <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
            <div style={{ padding: '1.5rem', background: 'var(--surface-hover)', borderRadius: '12px' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>12,450</h3>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>Households Registered</p>
            </div>
            <div style={{ padding: '1.5rem', background: 'var(--surface-hover)', borderRadius: '12px' }}>
              <h3 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>8,230</h3>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>Maternal Records</p>
            </div>
            <div style={{ padding: '1.5rem', background: 'var(--surface-hover)', borderRadius: '12px' }}>
              <h3 style={{ color: 'var(--success)', marginBottom: '0.5rem' }}>95%</h3>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>Sync Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
