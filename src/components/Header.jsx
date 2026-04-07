import { useState } from 'react';
import { useApp, ROLES } from '../context/AppContext';
import { TEAM } from '../data/teamData';

export default function Header({ title, onRoleChange }) {
  const { role, setRole } = useApp();
  const [showPicker, setShowPicker] = useState(false);
  const roleData = ROLES[role];

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    if (onRoleChange) onRoleChange(newRole);
    setShowPicker(false);
  };

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        background: 'rgba(8,8,16,0.95)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        padding: '10px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        zIndex: 100, maxWidth: 430, margin: '0 auto',
      }}>
        <div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: 'var(--primary)', letterSpacing: 3, lineHeight: 1 }}>
            NOMOS
          </div>
          <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 1 }}>{TEAM.name}</div>
        </div>

        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{title}</div>

        <button onClick={() => setShowPicker(true)} style={{
          background: 'var(--surface2)',
          border: `1px solid ${roleData.color}50`,
          borderRadius: 8, padding: '5px 10px',
          color: roleData.color, fontSize: 11, fontWeight: 700,
          cursor: 'pointer', letterSpacing: 0.5,
        }}>
          {roleData.icon} {roleData.short}
        </button>
      </header>

      {showPicker && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
          zIndex: 200, display: 'flex', alignItems: 'flex-end',
        }} onClick={() => setShowPicker(false)}>
          <div style={{
            width: '100%', maxWidth: 430, margin: '0 auto',
            background: 'var(--surface)', borderRadius: '20px 20px 0 0',
            padding: '20px 20px 40px', borderTop: '1px solid var(--border)',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ width: 36, height: 4, background: 'var(--border)', borderRadius: 2, margin: '0 auto 20px' }} />
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>
              Switch Role · Demo Mode
            </div>
            {Object.entries(ROLES).map(([key, r]) => (
              <button key={key} onClick={() => handleRoleSwitch(key)} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                width: '100%', padding: '13px 16px', marginBottom: 8,
                background: role === key ? `${r.color}15` : 'var(--surface2)',
                border: `1px solid ${role === key ? r.color : 'var(--border)'}`,
                borderRadius: 12, cursor: 'pointer',
              }}>
                <span style={{ fontSize: 22 }}>{r.icon}</span>
                <span style={{ fontSize: 14, fontWeight: role === key ? 700 : 400, color: role === key ? r.color : 'var(--text)' }}>
                  {r.label}
                </span>
                {role === key && (
                  <span style={{ marginLeft: 'auto', fontSize: 11, color: r.color, fontWeight: 600 }}>● ACTIVE</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
