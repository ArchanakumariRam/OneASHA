"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login network request
    setTimeout(() => {
      setLoading(false);
      // In a real app we'd redirect to a protected dashboard route
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <main className="bg-gradient-mesh flex-center" style={{ minHeight: '100vh', padding: '2rem' }}>
      <div className="container" style={{ maxWidth: '400px' }}>
        <div className="glass-card animate-fade-in" style={{ padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Welcome Back</h2>
            <p style={{ fontSize: '0.875rem' }}>Login to your OneASHA account</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                className="input-field" 
                placeholder="+91 98765 43210" 
                required 
              />
            </div>
            
            <div className="input-group" style={{ marginBottom: '2rem' }}>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                className="input-field" 
                placeholder="••••••••" 
                required 
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
            <Link href="/" style={{ color: 'var(--primary)', fontWeight: '600' }}>
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
