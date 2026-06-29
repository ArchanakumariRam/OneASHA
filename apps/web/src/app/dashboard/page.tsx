"use client";
import React, { useState } from 'react';

export default function DashboardOverview() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportReady, setReportReady] = useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setReportReady(false);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setReportReady(true);
      
      // Create a dummy CSV file for download
      const csvContent = "data:text/csv;charset=utf-8,Patient_ID,Name,Risk_Factor,Status\nPT-9942,Kavita Verma,Severe Anemia,Pending\nPT-8120,Rani Kumari,High Blood Pressure,Pending";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "OneASHA_Field_Report.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Auto close the ready modal after a few seconds
      setTimeout(() => {
        setReportReady(false);
      }, 3000);
    }, 2000);
  };

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Real-time health statistics from the field.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            className="btn btn-primary" 
            onClick={handleGenerateReport}
            disabled={isGenerating}
          >
            {isGenerating ? 'Compiling PDF...' : 'Generate Report'}
          </button>
          <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--surface-hover)', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             👤
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass-card animate-fade-in" style={{ padding: '1.5rem', animationDelay: '0s' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Households</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-main)' }}>12,450</div>
          <div style={{ color: 'var(--success)', fontSize: '0.875rem', marginTop: '0.5rem' }}>+12% from last month</div>
        </div>
        <div className="glass-card animate-fade-in" style={{ padding: '1.5rem', animationDelay: '0.1s' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>High-Risk Pregnancies</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--danger)' }}>142</div>
          <div style={{ color: 'var(--danger)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Requires immediate follow-up</div>
        </div>
        <div className="glass-card animate-fade-in" style={{ padding: '1.5rem', animationDelay: '0.2s' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Immunization Due</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--warning)' }}>850</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Children &lt; 5 years</div>
        </div>
        <div className="glass-card animate-fade-in" style={{ padding: '1.5rem', animationDelay: '0.3s' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Active ASHA Workers</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>24</div>
          <div style={{ color: 'var(--success)', fontSize: '0.875rem', marginTop: '0.5rem' }}>100% Sync Rate today</div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="glass-card animate-fade-in" style={{ padding: '2rem', animationDelay: '0.4s' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Recent Field Syncs</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '1rem', fontWeight: '500' }}>ASHA Worker</th>
              <th style={{ padding: '1rem', fontWeight: '500' }}>Village</th>
              <th style={{ padding: '1rem', fontWeight: '500' }}>Sync Time</th>
              <th style={{ padding: '1rem', fontWeight: '500' }}>New Records</th>
              <th style={{ padding: '1rem', fontWeight: '500' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Sunita Devi', village: 'Rampur', time: '10 mins ago', records: '+14', status: 'Success' },
              { name: 'Meena Kumari', village: 'Shantipur', time: '25 mins ago', records: '+5', status: 'Success' },
              { name: 'Pooja Singh', village: 'Kishanpur', time: '1 hour ago', records: '+2', status: 'Success' },
              { name: 'Aarti Devi', village: 'Madhupur', time: '3 hours ago', records: '+0', status: 'Success' }
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem', color: 'var(--text-main)', fontWeight: '500' }}>{row.name}</td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{row.village}</td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{row.time}</td>
                <td style={{ padding: '1rem', color: 'var(--primary)', fontWeight: '600' }}>{row.records}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    background: 'rgba(var(--primary-hue), 85%, 55%, 0.1)', 
                    color: 'var(--success)', 
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

      {/* Report Ready Toast */}
      {reportReady && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'var(--success)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          fontWeight: '600',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          ✅ Report downloaded successfully!
        </div>
      )}
    </>
  );
}
