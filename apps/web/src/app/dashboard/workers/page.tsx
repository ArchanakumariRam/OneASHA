"use client";
import React, { useState, useEffect } from 'react';

export default function WorkersPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<any>(null);
  const [workers, setWorkers] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/workers')
      .then(res => res.json())
      .then(data => {
        // Map backend User models to frontend display
        const formatted = data.map((u: any) => ({
          id: u.id,
          name: u.name,
          phone: u.phone,
          village: 'Rampur', // Mocking for now since schema doesn't have it
          active: 'Today',
          households: 0,
          deliveries: 0
        }));
        setWorkers(formatted);
      })
      .catch(err => console.error("Error fetching workers:", err));
  }, []);

  const handleAddWorker = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const newWorker = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      village: formData.get('village') as string,
      password: formData.get('password') as string,
    };

    try {
      const res = await fetch('http://localhost:4000/api/workers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWorker)
      });
      const saved = await res.json();
      
      setWorkers([{
        id: saved.id,
        name: saved.name,
        phone: saved.phone,
        village: newWorker.village,
        active: 'Just now',
        households: 0,
        deliveries: 0
      }, ...workers]);
      
      setShowAddModal(false);
    } catch (err) {
      console.error("Error saving worker:", err);
    }
  };

  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>ASHA Workers Directory</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Manage and monitor your field health workers.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>+ Add Worker</button>
      </header>

      <div className="glass-card animate-fade-in" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input type="text" className="input-field" placeholder="Search by name or village..." style={{ flex: 1 }} />
          <button className="btn" style={{ background: 'var(--surface-hover)', border: '1px solid var(--border)' }}>Filter</button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '1rem', fontWeight: '500' }}>Name</th>
              <th style={{ padding: '1rem', fontWeight: '500' }}>Phone</th>
              <th style={{ padding: '1rem', fontWeight: '500' }}>Assigned Village</th>
              <th style={{ padding: '1rem', fontWeight: '500' }}>Last Active</th>
              <th style={{ padding: '1rem', fontWeight: '500' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((row) => (
              <tr key={row.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem', color: 'var(--text-main)', fontWeight: '500' }}>{row.name}</td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{row.phone}</td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{row.village}</td>
                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{row.active}</td>
                <td style={{ padding: '1rem' }}>
                  <button 
                    className="btn" 
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' }} 
                    onClick={() => setSelectedWorker(row)}
                  >
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Worker Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Register New ASHA Worker</h2>
            <form onSubmit={handleAddWorker}>
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" name="name" className="input-field" required placeholder="e.g. Anita Devi" />
              </div>
              <div className="input-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" className="input-field" required placeholder="+91 99999 00000" />
              </div>
              <div className="input-group">
                <label>Assigned Village</label>
                <input type="text" name="village" className="input-field" required placeholder="e.g. Madhupur" />
              </div>
              <div className="input-group">
                <label>Assign 4-Digit PIN (for Mobile App Login)</label>
                <input type="text" name="password" className="input-field" required placeholder="e.g. 1234" maxLength={4} pattern="\d{4}" />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn" style={{ flex: 1, background: 'var(--surface-hover)', border: '1px solid var(--border)' }} onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Worker</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Profile Modal */}
      {selectedWorker && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: 'white', margin: '0 auto 1.5rem auto' }}>
              👩🏽‍⚕️
            </div>
            <h2 style={{ marginBottom: '0.5rem' }}>{selectedWorker.name}</h2>
            <p style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '1.5rem' }}>ASHA Worker - {selectedWorker.village}</p>
            
            <div style={{ background: 'rgba(var(--primary-hue), 85%, 55%, 0.1)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{selectedWorker.households}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Households</div>
              </div>
              <div style={{ width: '1px', background: 'var(--border)' }}></div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{selectedWorker.deliveries}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Deliveries</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Phone</span>
                <span style={{ fontWeight: '500' }}>{selectedWorker.phone}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Last Sync</span>
                <span style={{ fontWeight: '500' }}>{selectedWorker.active}</span>
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setSelectedWorker(null)}>Close Profile</button>
          </div>
        </div>
      )}
    </>
  );
}
