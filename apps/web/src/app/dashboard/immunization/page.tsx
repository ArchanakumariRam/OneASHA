"use client";
import React from 'react';

export default function ImmunizationPage() {
  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Immunization Tracking</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Schedule and track upcoming vaccinations for infants and children.</p>
        </div>
      </header>

      <div className="glass-card animate-fade-in" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--warning)' }}>Upcoming & Overdue (850 Total)</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '1rem', fontWeight: '500' }}>Child Name</th>
              <th style={{ padding: '1rem', fontWeight: '500' }}>Age</th>
              <th style={{ padding: '1rem', fontWeight: '500' }}>Vaccine Due</th>
              <th style={{ padding: '1rem', fontWeight: '500' }}>Due Date</th>
              <th style={{ padding: '1rem', fontWeight: '500' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Aarav Kumar', age: '6 weeks', vaccine: 'OPV-1, Pentavalent-1', date: '12 Oct 2026', status: 'Overdue' },
              { name: 'Diya Sharma', age: '14 weeks', vaccine: 'OPV-3, Pentavalent-3', date: '18 Oct 2026', status: 'Upcoming' },
              { name: 'Vihaan Singh', age: '9 months', vaccine: 'Measles-1, Vitamin A', date: '20 Oct 2026', status: 'Upcoming' },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem', color: 'var(--text-main)', fontWeight: '500' }}>{row.name}</td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{row.age}</td>
                <td style={{ padding: '1rem', color: 'var(--text-main)' }}>{row.vaccine}</td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{row.date}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    background: row.status === 'Overdue' ? 'rgba(355, 85%, 55%, 0.1)' : 'rgba(40, 95%, 50%, 0.1)', 
                    color: row.status === 'Overdue' ? 'var(--danger)' : 'var(--warning)', 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
