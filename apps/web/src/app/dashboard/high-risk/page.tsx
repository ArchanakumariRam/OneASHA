"use client";
import React, { useState, useEffect } from 'react';

export default function HighRiskPage() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const fetchPatients = () => {
    fetch('https://oneasha-backend.onrender.com/api/patients')
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((p: any) => ({
          fullId: p.id,  // Keep full UUID for API calls
          id: p.id.substring(0, 8).toUpperCase(),
          name: p.name,
          age: p.age,
          factor: p.riskFactor || 'Standard Checkup',
          worker: p.worker ? p.worker.name : 'Unknown ASHA',
          status: p.status
        }));
        setPatients(formatted);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchPatients(); }, []);

  const handleIntervene = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const notes = formData.get('notes') as string;
    const followUpDate = formData.get('followUpDate') as string;
    
    setSaving(true);
    try {
      const res = await fetch('https://oneasha-backend.onrender.com/api/interventions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId: selectedPatient.fullId, notes, followUpDate })
      });

      if (res.ok) {
        setToast(`✅ Intervention logged! ASHA worker will see follow-up reminder on ${followUpDate}.`);
        setTimeout(() => setToast(''), 4000);
        fetchPatients(); // Refresh list so status updates
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
      setSelectedPatient(null);
    }
  };

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>High-Risk Patients</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Monitor and track cases. Log interventions to notify ASHA workers.</p>
        </div>
      </header>

      <div className="glass-card animate-fade-in" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--danger)' }}>
          All Patients ({patients.length} total · {patients.filter(p => p.status === 'Pending').length} Active Alerts)
        </h2>
        {patients.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <p>No patients synced yet. Ask ASHA workers to register patients via the mobile app.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem', fontWeight: '500' }}>Patient ID</th>
                <th style={{ padding: '1rem', fontWeight: '500' }}>Name</th>
                <th style={{ padding: '1rem', fontWeight: '500' }}>Age</th>
                <th style={{ padding: '1rem', fontWeight: '500' }}>Risk Factor</th>
                <th style={{ padding: '1rem', fontWeight: '500' }}>ASHA Worker</th>
                <th style={{ padding: '1rem', fontWeight: '500' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((row) => (
                <tr key={row.fullId} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>{row.id}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-main)', fontWeight: '500' }}>{row.name}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{row.age} yrs</td>
                  <td style={{ padding: '1rem', color: row.factor !== 'Standard Checkup' ? 'var(--danger)' : 'var(--text-muted)', fontWeight: '600' }}>{row.factor}</td>
                  <td style={{ padding: '1rem', color: 'var(--primary)', fontWeight: '500' }}>{row.worker}</td>
                  <td style={{ padding: '1rem' }}>
                    {row.status === 'Pending' ? (
                      <button
                        className="btn"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem', background: 'var(--danger)', color: 'white', border: 'none' }}
                        onClick={() => setSelectedPatient(row)}
                      >
                        Intervene
                      </button>
                    ) : (
                      <span style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '0.875rem' }}>✅ Resolved</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Intervention Modal */}
      {selectedPatient && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '520px', padding: '2.5rem' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--danger)' }}>Initiate Intervention</h2>
            <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255, 80, 80, 0.1)', borderRadius: '8px', border: '1px solid rgba(255,80,80,0.2)' }}>
              <p style={{ margin: '0 0 0.5rem 0' }}><strong>Patient:</strong> {selectedPatient.name} ({selectedPatient.id})</p>
              <p style={{ margin: '0 0 0.5rem 0' }}><strong>Risk:</strong> {selectedPatient.factor}</p>
              <p style={{ margin: 0 }}><strong>Assigned ASHA:</strong> {selectedPatient.worker}</p>
            </div>
            
            <form onSubmit={handleIntervene}>
              <div className="input-group">
                <label>Action Taken / Doctor's Notes</label>
                <textarea
                  name="notes"
                  className="input-field"
                  required
                  placeholder="e.g. Dispatched ambulance to village. Contacted nearest PHC..."
                  style={{ minHeight: '100px', resize: 'vertical' }}
                />
              </div>
              
              <div className="input-group" style={{ marginTop: '1rem' }}>
                <label>Schedule Follow-up Date for ASHA Worker</label>
                <input type="date" name="followUpDate" className="input-field" required />
              </div>

              <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', fontSize: '0.875rem', color: 'var(--primary)' }}>
                📱 The assigned ASHA worker will receive a follow-up reminder on their mobile app.
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn" style={{ flex: 1, background: 'var(--surface-hover)', border: '1px solid var(--border)' }} onClick={() => setSelectedPatient(null)}>Cancel</button>
                <button type="submit" className="btn" disabled={saving} style={{ flex: 1, background: 'var(--danger)', color: 'white', border: 'none' }}>
                  {saving ? 'Sending...' : 'Log Intervention & Notify ASHA'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: 'var(--success)', color: 'white', padding: '1rem 2rem', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)', fontWeight: '600', zIndex: 2000, maxWidth: '400px', lineHeight: '1.5' }}>
          {toast}
        </div>
      )}
    </>
  );
}
