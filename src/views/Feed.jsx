import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PLAYERS, STAFF } from '../data/teamData';

const roleColor = {
  head_coach: 'var(--primary)',
  asst_coach: 'var(--stats)',
  manager:    'var(--warning)',
  para:       'var(--stats)',
  parent:     'var(--success)',
  player:     'var(--text)',
};

const roleLabel = {
  head_coach: 'HC', asst_coach: 'AC', manager: 'MGR',
  para: 'PARA', parent: 'PAR', player: 'PLY',
};

const THREADS = [
  {
    id: 'team',
    name: 'Team',
    type: 'group',
    icon: '🏒',
    members: 'All 18 players + staff',
    lastMsg: 'Game vs Detroit Honeybaked Tuesday 7pm. Arrive 5:30.',
    lastFrom: 'Tim White',
    ts: '2026-04-06T14:30:00',
    unread: 2,
    pinned: true,
  },
  {
    id: 'coaches',
    name: 'Coaching Staff',
    type: 'group',
    icon: '📋',
    members: 'HC + AC + MGR',
    lastMsg: 'Film review tonight 8pm Zoom. Sending link.',
    lastFrom: 'Nick Jordan',
    ts: '2026-04-05T16:00:00',
    unread: 1,
    pinned: true,
    restricted: true,
  },
  {
    id: 'parents',
    name: 'Parents',
    type: 'group',
    icon: '👨‍👩‍👦',
    members: '18 families',
    lastMsg: 'Jersey pickup Monday 4-6pm at the rink.',
    lastFrom: 'Sarah Mitchell',
    ts: '2026-04-06T11:15:00',
    unread: 0,
  },
  {
    id: 'line1',
    name: 'Line 1',
    type: 'group',
    icon: '⚡',
    members: '#11 #16 #21',
    lastMsg: 'PP drill walkthrough before Monday practice?',
    lastFrom: 'Brody Nystrom',
    ts: '2026-04-05T19:00:00',
    unread: 3,
  },
  {
    id: 'para_intel',
    name: 'PARA Intelligence',
    type: 'system',
    icon: null,
    paraIcon: true,
    members: 'AI insights for your role',
    lastMsg: 'Team Pulse: 84/100. Momentum trending up after 5-2 win.',
    lastFrom: 'PARA',
    ts: '2026-04-06T08:00:00',
    unread: 1,
  },
  {
    id: 'dm_nick',
    name: 'Nick Jordan',
    type: 'dm',
    icon: '👤',
    lastMsg: 'Agreed on the PK adjustment. Let\'s talk before warmup.',
    lastFrom: 'You',
    ts: '2026-04-04T20:00:00',
    unread: 0,
  },
];

const MESSAGES = {
  team: [
    { id: 1, from: 'Tim White',      role: 'head_coach', text: 'Game vs Detroit Honeybaked Tuesday 7pm. Arrive 5:30 for pre-skate prep. Full dress.', ts: '2026-04-06T14:30:00', priority: true },
    { id: 2, from: 'Sarah Mitchell', role: 'manager',    text: 'Jersey numbers 29 and 11 need to pick up sweaters before Tuesday. I\'ll be at the rink Monday 4-6pm.', ts: '2026-04-06T11:15:00' },
    { id: 3, from: 'Tim White',      role: 'head_coach', text: 'Practice Monday 6am. Power play focus. Extra sticks on the bench.', ts: '2026-04-05T20:00:00' },
    { id: 4, from: 'Aidan Kowalski', role: 'player',     text: 'Confirmed. See everyone Monday.', ts: '2026-04-05T20:30:00' },
  ],
  coaches: [
    { id: 1, from: 'Nick Jordan',    role: 'asst_coach', text: 'Film review tonight optional 8pm Zoom. Focus on Detroit systems.', ts: '2026-04-05T16:00:00' },
    { id: 2, from: 'Tim White',      role: 'head_coach', text: 'Their #9 runs the PP. Kowalski tracks him all game.', ts: '2026-04-05T16:30:00' },
  ],
  para_intel: [
    { id: 1, from: 'PARA',   role: 'para', text: 'Team Pulse: 84/100. Momentum trending up after 5-2 win. 2 players showing fatigue markers. Recommend reduced intensity Monday practice.', ts: '2026-04-06T08:00:00' },
    { id: 2, from: 'PARA',   role: 'para', text: 'EMW Moment: Brody Nystrom hit 39 points today. Team high. Great season for #16.', ts: '2026-04-05T21:00:00' },
  ],
};

function timeAgo(ts) {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

export default function Feed() {
  const { role, sendWave } = useApp();
  const [activeThread, setActiveThread] = useState(null);
  const [draft, setDraft]               = useState('');
  const [filter, setFilter]             = useState('all');
  const canCompose = ['head_coach', 'asst_coach', 'manager'].includes(role);

  const filteredThreads = THREADS.filter(t => {
    if (filter === 'unread') return t.unread > 0;
    if (filter === 'groups') return t.type === 'group';
    if (filter === 'direct') return t.type === 'dm';
    return true;
  });

  if (activeThread) {
    const thread = THREADS.find(t => t.id === activeThread);
    const messages = MESSAGES[activeThread] || [];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', paddingTop: 58 }}>
        {/* Thread header */}
        <div style={{
          padding: '12px 16px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: 12,
          background: 'var(--surface)',
        }}>
          <button onClick={() => setActiveThread(null)} style={{
            background: 'none', border: 'none', color: 'var(--muted)',
            fontSize: 20, cursor: 'pointer', padding: 0,
          }}>←</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{thread?.name}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>{thread?.members}</div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.map(m => (
            <div key={m.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: `${roleColor[m.role] || 'var(--border)'}20`,
                border: `1px solid ${roleColor[m.role] || 'var(--border)'}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700, color: roleColor[m.role] || 'var(--muted)',
              }}>{roleLabel[m.role] || '?'}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 3, alignItems: 'baseline' }}>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>{m.from}</span>
                  <span style={{ fontSize: 10, color: 'var(--muted)' }}>{timeAgo(m.ts)}</span>
                  {m.priority && <span className="pill pill-danger">Priority</span>}
                </div>
                <div style={{
                  padding: '10px 12px', borderRadius: '4px 12px 12px 12px',
                  background: m.role === 'para' ? 'var(--stats-dim)' : 'var(--surface2)',
                  border: `1px solid ${m.role === 'para' ? 'var(--stats)40' : 'var(--border)'}`,
                  fontSize: 14, lineHeight: 1.5,
                }}>{m.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Compose */}
        {(canCompose || ['player', 'parent'].includes(role)) && (
          <div style={{
            padding: '12px 16px 80px', borderTop: '1px solid var(--border)',
            background: 'var(--surface)', display: 'flex', gap: 8,
          }}>
            <input value={draft} onChange={e => setDraft(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && draft.trim()) {
                  sendWave(draft);
                  setDraft('');
                }
              }}
              placeholder="Write a message..."
              style={{ flex: 1 }}
            />
            <button className="btn-primary" style={{ flexShrink: 0, padding: '10px 14px' }}
              onClick={() => { if (draft.trim()) { sendWave(draft); setDraft(''); } }}>
              ↑
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '70px 0 80px' }} className="animate-fadein">
      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 8, padding: '0 16px 12px', overflowX: 'auto', borderBottom: '1px solid var(--border)' }}>
        {['all', 'unread', 'groups', 'direct'].map(f => (
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

      {/* Thread list */}
      {filteredThreads.map(thread => (
        <div key={thread.id}
          onClick={() => setActiveThread(thread.id)}
          style={{
            padding: '14px 16px',
            borderBottom: '1px solid var(--border)',
            cursor: 'pointer',
            display: 'flex', gap: 12, alignItems: 'center',
            background: thread.pinned ? 'rgba(58,174,172,0.03)' : 'transparent',
            transition: 'background 0.1s',
          }}>
          {/* Avatar */}
          <div style={{
            width: 46, height: 46, borderRadius: thread.type === 'dm' ? '50%' : 12,
            flexShrink: 0,
            background: thread.paraIcon ? 'var(--stats-dim)' : 'var(--surface2)',
            border: `1px solid ${thread.paraIcon ? 'var(--stats)' : 'var(--border)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: thread.paraIcon ? 0 : 20,
          }}>
            {thread.paraIcon ? (
              <img src="/para_bold.png" alt="PARA"
                style={{ width: 28, filter: 'invert(1) sepia(1) saturate(2) hue-rotate(200deg)' }} />
            ) : thread.icon}
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: thread.unread > 0 ? 700 : 500 }}>
                  {thread.name}
                </span>
                {thread.pinned && <span style={{ fontSize: 9, color: 'var(--muted)' }}>📌</span>}
                {thread.restricted && <span className="pill pill-warning" style={{ fontSize: 9 }}>Staff</span>}
              </div>
              <span style={{ fontSize: 11, color: 'var(--muted)' }}>{timeAgo(thread.ts)}</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted2)', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              <span style={{ color: 'var(--muted)' }}>{thread.lastFrom}: </span>
              {thread.lastMsg}
            </div>
          </div>

          {/* Unread badge */}
          {thread.unread > 0 && (
            <div style={{
              width: 20, height: 20, borderRadius: '50%',
              background: thread.paraIcon ? 'var(--stats)' : 'var(--primary)',
              color: 'white', fontSize: 11, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>{thread.unread}</div>
          )}
        </div>
      ))}

      {/* New thread button */}
      {canCompose && (
        <div style={{ position: 'fixed', bottom: 88, right: 20 }}>
          <button style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'var(--primary)', border: 'none',
            fontSize: 22, cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(58,174,172,0.35)',
          }}>✏️</button>
        </div>
      )}
    </div>
  );
}
