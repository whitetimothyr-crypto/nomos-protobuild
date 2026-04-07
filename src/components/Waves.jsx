import { useState } from 'react';
import { useApp } from '../context/AppContext';

const roleColor = {
  head_coach: 'var(--primary)',
  asst_coach: 'var(--stats)',
  manager:    'var(--warning)',
  para:       'var(--stats)',
  parent:     'var(--success)',
  player:     'var(--text)',
};

const roleLabel = {
  head_coach: 'HC',
  asst_coach: 'AC',
  manager:    'MGR',
  para:       'PARA',
  parent:     'PAR',
  player:     'PLY',
};

function timeAgo(ts) {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs/24)}d ago`;
}

export default function Waves() {
  const { waves, markWaveRead, sendWave, role } = useApp();
  const [compose, setCompose] = useState(false);
  const [draft, setDraft] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  const canCompose = ['head_coach', 'asst_coach', 'manager'].includes(role);

  const filtered = filter === 'all' ? waves :
    filter === 'unread' ? waves.filter(w => !w.read) :
    waves.filter(w => w.type === filter);

  return (
    <div style={{ padding: '0 0 80px' }}>
      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px', overflowX: 'auto', borderBottom: '1px solid var(--border)' }}>
        {['all', 'unread', 'announcement', 'coach', 'logistics', 'intelligence'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: 0.5, cursor: 'pointer',
            whiteSpace: 'nowrap', flexShrink: 0,
            background: filter === f ? 'var(--primary-dim)' : 'transparent',
            border: filter === f ? '1px solid var(--primary)' : '1px solid var(--border)',
            color: filter === f ? 'var(--primary)' : 'var(--muted)',
          }}>{f}</button>
        ))}
      </div>

      {/* Wave list */}
      <div>
        {filtered.map(wave => (
          <div key={wave.id} className="wave-item"
            onClick={() => { markWaveRead(wave.id); setSelected(wave); }}
            style={{ opacity: wave.read ? 0.7 : 1 }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: `${roleColor[wave.role]}20`,
                border: `1px solid ${roleColor[wave.role]}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, color: roleColor[wave.role],
              }}>{roleLabel[wave.role]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{wave.from}</span>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>{timeAgo(wave.ts)}</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--muted2)', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  {wave.content}
                </div>
              </div>
              {!wave.read && (
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0, marginTop: 6 }} />
              )}
            </div>
            {wave.priority && (
              <div style={{ marginTop: 6, marginLeft: 42 }}>
                <span className="pill pill-danger">Priority</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Compose */}
      {canCompose && (
        <div style={{ position: 'fixed', bottom: 80, right: 16 }}>
          {!compose ? (
            <button onClick={() => setCompose(true)} style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'var(--primary)', border: 'none',
              fontSize: 22, cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(58,174,172,0.4)',
            }}>+</button>
          ) : (
            <div style={{
              position: 'fixed', bottom: 80, left: 0, right: 0,
              background: 'var(--surface)', borderTop: '1px solid var(--border)',
              padding: '16px', maxWidth: 430, margin: '0 auto',
            }}>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>New Wave to Team</div>
              <textarea value={draft} onChange={e => setDraft(e.target.value)}
                placeholder="What does the team need to know?" rows={3}
                style={{ marginBottom: 8 }} />
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-primary" onClick={() => { sendWave(draft); setDraft(''); setCompose(false); }}>
                  Send Wave
                </button>
                <button className="btn-ghost" onClick={() => setCompose(false)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Message detail modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 150 }}
          onClick={() => setSelected(null)}>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'var(--surface)', borderRadius: '16px 16px 0 0',
            padding: 20, maxWidth: 430, margin: '0 auto',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{selected.from}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{timeAgo(selected.ts)}</div>
              </div>
              <span className={`pill pill-${selected.type === 'intelligence' ? 'stats' : selected.type === 'announcement' ? 'primary' : 'muted'}`}>
                {selected.type}
              </span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text)' }}>{selected.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}
