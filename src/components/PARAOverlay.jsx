import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TEAM, STEMS_DATA } from '../data/teamData';

// Roles that get LIVE PARA access
const PARA_LIVE_ROLES = ['head_coach', 'asst_coach', 'manager', 'org_admin'];

// Pushed PARA content for players and parents - no live API
const PARA_PUSHED = {
  player: [
    { id: 1, type: 'hype',        icon: '⚡', title: 'You\'re on a run',       body: 'Last 3 games you\'ve been involved in 5 goals. Keep that energy Tuesday.' },
    { id: 2, type: 'development', icon: '📈', title: 'Focus area this week',   body: 'Work on your backdoor positioning at home. Walk through it in your head before the game.' },
    { id: 3, type: 'team',        icon: '🏒', title: 'Team is rolling',        body: 'Pulse is 84. Momentum is up after Saturday. Come ready to build on it.' },
    { id: 4, type: 'reminder',    icon: '📅', title: 'Tuesday — arrive 5:30',  body: 'vs Detroit Honeybaked. Home game. Full dress. Coach wants everyone early.' },
  ],
  parent: [
    { id: 1, type: 'emw',        icon: '✨', title: 'Season highlight',        body: 'Your player has been part of 9 goals in the last 5 games. That\'s a career-best stretch.' },
    { id: 2, type: 'schedule',   icon: '📅', title: 'This week',              body: 'Practice Monday 6am. Game Tuesday 7pm home. Arrive by 5:30.' },
    { id: 3, type: 'team',       icon: '🏒', title: 'Team update',            body: 'Record is 18-7-2. Sitting 3rd in MGHL Central. Playoff picture is strong.' },
    { id: 4, type: 'reminder',   icon: '🚗', title: 'Away game April 12',     body: 'Little Caesars Arena. Carpool options are available in the Schedule tab.' },
  ],
};

const typeColors = {
  hype:        'var(--primary)',
  development: 'var(--stats)',
  team:        'var(--success)',
  reminder:    'var(--warning)',
  emw:         'var(--primary)',
  schedule:    'var(--warning)',
};

const PARA_SUGGESTIONS = {
  head_coach: [
    'How is team momentum trending?',
    'Who needs development attention?',
    'Build me a pregame checklist for Tuesday',
    'PP drill for Monday practice',
  ],
  asst_coach: [
    'Defensive zone tendencies this week?',
    'Most consistent players last 5 games?',
    'Compete drill suggestions',
  ],
  manager: [
    'Who hasn\'t confirmed for Saturday?',
    'Draft a carpool request message',
    'What needs to be done before Tuesday?',
  ],
  org_admin: [
    'Team health summary across all 5 teams',
    'Which teams need attention?',
    'Compliance status overview',
  ],
};

// PUSHED view for player/parent
function PARAPushedView({ onClose }) {
  const { role } = useApp();
  const cards = PARA_PUSHED[role] || [];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 300,
      background: 'rgba(0,0,0,0.9)',
      backdropFilter: 'blur(4px)',
      display: 'flex', flexDirection: 'column',
      maxWidth: 430, margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--stats-dim)', border: '1px solid var(--stats)40',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontSize: 22, fontFamily: 'Georgia, serif',
              fontStyle: 'italic', fontWeight: 'bold', color: 'var(--stats)',
            }}>P</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 2, color: 'var(--stats)' }}>
              PARA
            </div>
            <div style={{ fontSize: 10, color: 'var(--muted)' }}>From your coaching staff</div>
          </div>
        </div>
        <button onClick={onClose} style={{
          background: 'none', border: 'none', color: 'var(--muted)',
          fontSize: 22, cursor: 'pointer',
        }}>×</button>
      </div>

      {/* Pushed cards */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>
          Your coaches use PARA to send you updates. Here's what's waiting.
        </div>
        {cards.map(card => (
          <div key={card.id} className="card" style={{
            padding: 16,
            borderColor: `${typeColors[card.type]}30`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 22 }}>{card.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: typeColors[card.type] }}>{card.title}</span>
            </div>
            <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6 }}>{card.body}</div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div style={{
        padding: '12px 20px 32px',
        borderTop: '1px solid var(--border)',
        background: 'var(--surface)',
        fontSize: 11, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.6,
      }}>
        PARA walks alongside. It doesn't lead.
      </div>
    </div>
  );
}

// LIVE view for coaches, managers, org admins
function PARALiveView({ onClose }) {
  const { role } = useApp();
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: `Alongside you. I'm PARA.\n\nTeam Pulse is 84/100. Momentum is up after the 5-2 win Saturday. Two players are showing engagement dips — worth a check-in before Tuesday.\n\nWhat do you need?`,
  }]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);

  const suggestions = PARA_SUGGESTIONS[role] || PARA_SUGGESTIONS.head_coach;

  const teamContext = `You are PARA, the AI intelligence layer inside NOMOS, a youth hockey team management platform.
You are talking to the ${role.replace('_', ' ')} of ${TEAM.name} (MGHL, 14U AA).
Team record: 18W-7L-2OTL. Standing: 3rd MGHL Central.
Key players: Brody Nystrom (#16, C, 39pts team leader), Aidan Kowalski (#11, LW, 32pts, Captain).
STEMS: Sentiment 78, Tempo 85, Engagement 82, Momentum 91, Synergy 74.
Next game: vs Detroit Honeybaked, April 8, 7pm, home.
PARA philosophy: Walk beside, scaffold, support. Never lead. Protect, Advise, Respond, Advance.
Named for Elizabeth White, a para-educator. Every Moment Witnessed.
Be concise, specific, direct. Use hockey language. Reference real data. No corporate filler.`;

  const send = async (text) => {
    const userMsg = text || input;
    if (!userMsg.trim()) return;
    setInput('');
    setLoading(true);
    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: teamContext,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || 'Connection issue. Try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection issue. Try again.' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 300,
      background: 'rgba(0,0,0,0.9)',
      backdropFilter: 'blur(4px)',
      display: 'flex', flexDirection: 'column',
      maxWidth: 430, margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--stats-dim)', border: '1px solid var(--stats)40',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontSize: 22, fontFamily: 'Georgia, serif',
              fontStyle: 'italic', fontWeight: 'bold', color: 'var(--stats)',
            }}>P</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 2, color: 'var(--stats)' }}>PARA</div>
            <div style={{ fontSize: 10, color: 'var(--muted)' }}>Protect · Advise · Respond · Advance</div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 22, cursor: 'pointer' }}>×</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
            <div style={{
              padding: '10px 14px',
              borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
              background: m.role === 'user' ? 'var(--primary)' : 'var(--surface2)',
              border: m.role === 'user' ? 'none' : '1px solid var(--border)',
              color: m.role === 'user' ? 'var(--bg)' : 'var(--text)',
              fontSize: 14, lineHeight: 1.5, whiteSpace: 'pre-wrap',
            }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start' }}>
            <div style={{ padding: '10px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '4px 16px 16px 16px', color: 'var(--stats)', fontSize: 14 }}>
              <span className="animate-pulse-slow">thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div style={{ padding: '8px 16px', display: 'flex', gap: 8, overflowX: 'auto' }}>
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => send(s)} style={{
              background: 'var(--surface2)', border: '1px solid var(--border)',
              borderRadius: 20, padding: '6px 12px', color: 'var(--muted2)',
              fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, fontFamily: 'inherit',
            }}>{s}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{
        padding: '12px 16px 24px', borderTop: '1px solid var(--border)',
        background: 'var(--surface)', display: 'flex', gap: 8,
      }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask PARA anything..." style={{ flex: 1 }} />
        <button onClick={() => send()} className="btn-primary" style={{ flexShrink: 0 }}>↑</button>
      </div>
    </div>
  );
}

export default function PARAOverlay() {
  const { paraOpen, setParaOpen, role } = useApp();
  if (!paraOpen) return null;

  const isLive = PARA_LIVE_ROLES.includes(role);

  return isLive
    ? <PARALiveView onClose={() => setParaOpen(false)} />
    : <PARAPushedView onClose={() => setParaOpen(false)} />;
}
