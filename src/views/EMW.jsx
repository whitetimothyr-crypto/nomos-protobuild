import { getPlayerById, SCHEDULE } from '../data/teamData';

const EMW_MOMENTS = [
  { id: 1, date: "2026-04-05", type: "goal",       icon: "🏒", title: "Goal",        desc: "Aidan scored on the power play in the 2nd period. Team goal #47 of the season.", game: "vs Oakland Jr Grizzlies", highlight: true },
  { id: 2, date: "2026-04-05", type: "assist",     icon: "🅰️", title: "Assist",      desc: "Assisted on the insurance goal. Made a perfect backdoor feed.", game: "vs Oakland Jr Grizzlies" },
  { id: 3, date: "2026-03-22", type: "teamwin",    icon: "🏆", title: "Team Win",    desc: "4-1 win vs Michigan Wolverines. Aidan had a 2-point night.", game: "vs Michigan Wolverines", highlight: true },
  { id: 4, date: "2026-03-15", type: "milestone",  icon: "⭐", title: "Milestone",   desc: "30 points on the season. Top 3 in team scoring.", game: "Season stat" },
  { id: 5, date: "2026-03-08", type: "captain",    icon: "©️",  title: "Leadership", desc: "Named team captain for the remainder of the season.", game: "Team announcement" },
  { id: 6, date: "2026-02-22", type: "assist",     icon: "🅰️", title: "Assist",      desc: "2-assist game. Both on the power play.", game: "vs Compuware 14U" },
  { id: 7, date: "2026-02-14", type: "goal",       icon: "🏒", title: "Hattrick",   desc: "Hat trick. First of his career. Crowd reaction was electric.", game: "vs Detroit Honeybaked", highlight: true },
  { id: 8, date: "2026-01-28", type: "development",icon: "📈", title: "Development","desc": "Eval updated. Puck skills score moved from 88 to 94. Coach notes exceptional improvement.", game: "Mid-season eval" },
];

export default function EMW() {
  const player = getPlayerById(8);

  return (
    <div style={{ padding: '70px 16px 80px' }} className="animate-fadein">
      {/* EMW Header */}
      <div style={{
        textAlign: 'center', padding: '20px 0', marginBottom: 16,
        background: 'linear-gradient(180deg, rgba(58,174,172,0.1) 0%, transparent 100%)',
        borderRadius: 12, border: '1px solid var(--border)',
      }}>
        <div style={{ fontSize: 32, marginBottom: 4 }}>✨</div>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: 28, letterSpacing: 3, color: 'var(--primary)' }}>
          EVERY MOMENT WITNESSED
        </div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>
          {player?.name} · #{player?.number} · 2025-26 Season
        </div>
      </div>

      {/* Season summary */}
      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--stats)' }}>{player?.pts}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>Points</div>
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)' }}>{player?.g}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>Goals</div>
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)' }}>{player?.a}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>Assists</div>
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--success)' }}>{player?.plus || 0 > 0 ? '+' : ''}{player?.plus || 0}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>+/-</div>
          </div>
        </div>
      </div>

      {/* EMW tribute */}
      <div style={{
        padding: 16, marginBottom: 16,
        background: 'rgba(58,174,172,0.05)',
        border: '1px solid var(--border)',
        borderRadius: 12,
      }}>
        <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7, fontStyle: 'italic' }}>
          "Our mission is providing the opportunity for growth. Our passion is watching theirs grow."
        </div>
        <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 6 }}>Elizabeth Mary White · EMW</div>
      </div>

      {/* Moments timeline */}
      <div style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
        Season Moments
      </div>
      {EMW_MOMENTS.map((m, i) => (
        <div key={m.id} style={{ display: 'flex', gap: 12, marginBottom: 16, position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
              background: m.highlight ? 'var(--primary-dim)' : 'var(--surface2)',
              border: `2px solid ${m.highlight ? 'var(--primary)' : 'var(--border)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}>{m.icon}</div>
            {i < EMW_MOMENTS.length - 1 && (
              <div style={{ width: 1, flex: 1, background: 'var(--border)', marginTop: 4 }} />
            )}
          </div>
          <div className={m.highlight ? 'card' : ''} style={{ flex: 1, padding: m.highlight ? 12 : 0, paddingBottom: m.highlight ? 12 : 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: m.highlight ? 'var(--primary)' : 'var(--text)' }}>
                {m.title}
              </span>
              <span style={{ fontSize: 10, color: 'var(--muted)' }}>
                {new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{m.desc}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>{m.game}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
