"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: '📊' },
    { name: 'ASHA Workers', href: '/dashboard/workers', icon: '👥' },
    { name: 'High-Risk Patients', href: '/dashboard/high-risk', icon: '🏥' },
    { name: 'Immunization', href: '/dashboard/immunization', icon: '💉' },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '3rem',
          color: 'var(--primary)',
          fontWeight: 'bold',
          fontSize: '1.5rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}>
            +
          </div>
          OneASHA
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} style={{ textDecoration: 'none' }}>
                <div style={{ 
                  padding: '0.75rem 1rem', 
                  background: isActive ? 'rgba(var(--primary-hue), 85%, 55%, 0.1)' : 'transparent', 
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)', 
                  borderRadius: '8px', 
                  fontWeight: isActive ? '600' : '400',
                  transition: 'background 0.2s, color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span>{item.icon}</span> {item.name}
                </div>
              </Link>
            );
          })}
        </nav>
        
        <div style={{ marginTop: 'auto' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <button className="btn" style={{ width: '100%', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              Log Out
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}
