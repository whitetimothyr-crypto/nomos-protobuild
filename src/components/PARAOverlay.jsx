import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TEAM, STEMS_DATA, PLAYERS } from '../data/teamData';

const PARA_SUGGESTIONS = {
  head_coach: [
    "How is team momentum trending this week?",
    "Who needs development attention right now?",
    "Build me a pregame checklist for Tuesday",
    "Suggest a PP drill for Monday practice",
  ],
  asst_coach: [
    "What are the team's defensive zone tendencies?",
    "Which players have been most consistent?",
    "Practice drill suggestions for compete",
  ],
  manager: [
    "Who hasn't confirmed for Saturday's game?",
    "Draft a carpool request message",
    "Show me outstanding dues",
    "What needs to be done before Tuesday?",
  ],
  parent: [
    "How is my player developing this season?",
    "What should they focus on at home?",
    "When is the next game and what do they need?",
  ],
  player: [
    "How am I doing this season?",
    "What should I work on before the next game?",
    "Hype me up for Tuesday",
  ],
  org_admin: [
    "Give me a team health summary",
    "Which teams need attention?",
    "Show compliance status across all teams",
  ],
};

export default function PARAOverlay() {
  const { paraOpen, setParaOpen, role } = useApp();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Alongside you. I'm PARA.\n\nTeam Pulse is 84/100. Momentum is up after the 5-2 win Saturday. Two players are showing engagement dips — worth a quick check-in before Tuesday's game.\n\nWhat do you need?`,
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!paraOpen) return null;

  const suggestions = PARA_SUGGESTIONS[role] || PARA_SUGGESTIONS.head_coach;

  const teamContext = `
You are PARA, the AI intelligence layer inside NOMOS, a youth hockey team management platform.
You are talking to the ${role.replace('_', ' ')} of ${TEAM.name} (${TEAM.league}, ${TEAM.level}).
Team record: ${TEAM.record.w}W-${TEAM.record.l}L-${TEAM.record.otl}OTL. Standing: ${TEAM.standing}.
Key players: Brody Nystrom (#16, C, 39pts team leader), Aidan Kowalski (#11, LW, 32pts, Captain).
STEMS diagnostics: Sentiment 78, Tempo 85, Engagement 82, Momentum 91, Synergy 74.
Next game: vs Detroit Honeybaked, April 8, 7pm, home.
PARA philosophy: You walk beside, you never lead. You scaffold, support, protect, advise, respond, and advance.
You are named for Elizabeth White, a para-educator. Every Moment Witnessed.
Keep responses concise, specific, and helpful. Use hockey language naturally. Reference real data.
Never be generic. Be direct. No corporate language.
  `;

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
      const reply = data.content?.[0]?.text || "Something went wrong. Try again.";
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection issue. Check your network." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 300,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(4px)',
      display: 'flex', flexDirection: 'column',
      maxWidth: 430, margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--surface)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--stats-dim)', border: '1px solid var(--stats)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
          }}>🤖</div>
          <div>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 20, letterSpacing: 2, color: 'var(--stats)' }}>PARA</div>
            <div style={{ fontSize: 10, color: 'var(--muted)' }}>Protect · Advise · Respond · Advance</div>
          </div>
        </div>
        <button onClick={() => setParaOpen(false)} style={{
          background: 'none', border: 'none', color: 'var(--muted)', fontSize: 22, cursor: 'pointer',
        }}>×</button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
          }}>
            <div style={{
              padding: '10px 14px',
              borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
              background: m.role === 'user' ? 'var(--primary)' : 'var(--surface2)',
              border: m.role === 'user' ? 'none' : '1px solid var(--border)',
              color: m.role === 'user' ? 'var(--bg)' : 'var(--text)',
              fontSize: 14,
              lineHeight: 1.5,
              whiteSpace: 'pre-wrap',
            }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start' }}>
            <div style={{ padding: '10px 14px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '4px 16px 16px 16px', color: 'var(--stats)', fontSize: 14 }}>
              <span className="animate-pulse-slow">PARA is thinking...</span>
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
              fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
            }}>{s}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{
        padding: '12px 16px 24px',
        borderTop: '1px solid var(--border)',
        background: 'var(--surface)',
        display: 'flex', gap: 8,
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask PARA anything..."
          style={{ flex: 1 }}
        />
        <button onClick={() => send()} className="btn-primary" style={{ flexShrink: 0 }}>
          Send
        </button>
      </div>
    </div>
  );
}
