import { useState } from 'react';
import { PLAYERS, SCHEDULE, getPlayerById } from '../data/teamData';
import { useApp } from '../context/AppContext';

const PREGAME_CHECKLIST = [
  { id: 1, item: "Jersey and socks in bag", done: false },
  { id: 2, item: "Helmet and cage inspection", done: false },
  { id: 3, item: "Skates sharp and ready", done: true },
  { id: 4, item: "Water bottle filled", done: false },
  { id: 5, item: "Mouthguard packed", done: true },
  { id: 6, item: "Stick taped", done: false },
  { id: 7, item: "Arrived 90 min early", done: false },
];

export default function GameDay() {
  const { role } = useApp();
  const [tab, setTab]     = useState('warmup');
  const [checks, setChecks] = useState(PREGAME_CHECKLIST);
  const [score, setScore]   = useState({ us: 0, them: 0 });
  const [period, setPeriod] = useState(1);
  const [goals, setGoals]   = useState([]);

  const nextGame = SCHEDULE.filter(g => !g.result).sort((a,b) => new Date(a.date) - new Date(b.date))[0];
  const toggleCheck = (id) => setChecks(prev => prev.map(c => c.id === id ? { ...c, done: !c.done } : c));
  const checkedCount = checks.filter(c => c.done).length;

  const logGoal = (scorer, assist1) => {
    setScore(s => ({ ...s, us: s.us + 1 }));
    const scorerPlayer = getPlayerById(scorer);
    setGoals(prev => [...prev, {
      id: Date.now(), period, time: '12:34', scorer: scorerPlayer?.name,
      assist1: getPlayerById(assist1)?.name, team: 'us',
    }]);
  };

  return (
    <div style={{ padding: '70px 16px 80px' }} className="animate-fadein">
      {/* Scoreboard */}
      {nextGame && (
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--primary)40',
          borderRadius: 16, padding: 20, marginBottom: 16,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
            {nextGame.home ? 'HOME' : 'AWAY'} · Period {period} · MGHL
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700 }}>BIGGBY</div>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 56, color: 'var(--primary)', lineHeight: 1 }}>{score.us}</div>
            </div>
            <div style={{ fontSize: 28, color: 'var(--muted)' }}>—</div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700 }}>{nextGame.opponent.split(' ').slice(-1)}</div>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 56, color: 'var(--muted)', lineHeight: 1 }}>{score.them}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 12 }}>
            {role === 'head_coach' && (
              <>
                <button onClick={() => logGoal(9, 8)} className="btn-primary" style={{ fontSize: 12 }}>+ Goal</button>
                <button onClick={() => setScore(s => ({ ...s, them: s.them + 1 }))} className="btn-ghost" style={{ fontSize: 12 }}>Opp Goal</button>
                <button onClick={() => setPeriod(p => Math.min(3, p + 1))} className="btn-ghost" style={{ fontSize: 12 }}>Next Per</button>
              </>
            )}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['warmup', 'checklist', 'scoring', 'music'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: '7px 2px', borderRadius: 8, fontSize: 10, fontWeight: 700,
            textTransform: 'uppercase', cursor: 'pointer',
            background: tab === t ? 'var(--primary-dim)' : 'transparent',
            border: `1px solid ${tab === t ? 'var(--primary)' : 'var(--border)'}`,
            color: tab === t ? 'var(--primary)' : 'var(--muted)',
          }}>{t}</button>
        ))}
      </div>

      {tab === 'warmup' && (
        <div>
          <div className="card" style={{ padding: 16, marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Pre-Game Timeline</div>
            {[
              { time: '-90min', label: 'Arrive at rink', done: false },
              { time: '-70min', label: 'Locker room open, dress', done: false },
              { time: '-45min', label: 'Dry-land warm-up', done: false },
              { time: '-30min', label: 'On ice warm-up', done: false },
              { time: '-15min', label: 'Coaches talk, music up', done: false },
              { time: '-5min',  label: 'Final stretch, line up', done: false },
              { time: '0:00',   label: 'Puck drop', done: false },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 44, fontSize: 11, fontFamily: 'Space Mono', color: 'var(--primary)', flexShrink: 0 }}>{item.time}</div>
                <div style={{ fontSize: 13 }}>{item.label}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Coach Notes</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>
              Detroit Honeybaked plays a 1-3-1 PP. We're killing PK with aggressive F1 pressure. Talk to Nystrom before the game about tracking their #9.
            </div>
          </div>
        </div>
      )}

      {tab === 'checklist' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>{checkedCount}/{checks.length} complete</div>
            <div style={{ height: 6, width: 120, background: 'var(--border)', borderRadius: 3 }}>
              <div style={{ height: '100%', width: `${(checkedCount/checks.length)*100}%`, background: 'var(--primary)', borderRadius: 3 }} />
            </div>
          </div>
          <div className="card">
            {checks.map(c => (
              <div key={c.id} className="wave-item" onClick={() => toggleCheck(c.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                  background: c.done ? 'var(--success)' : 'transparent',
                  border: `2px solid ${c.done ? 'var(--success)' : 'var(--border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 13,
                }}>{c.done ? '✓' : ''}</div>
                <span style={{ fontSize: 14, color: c.done ? 'var(--muted)' : 'var(--text)', textDecoration: c.done ? 'line-through' : 'none' }}>
                  {c.item}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'scoring' && (
        <div>
          <div style={{ marginBottom: 12 }}>
            {goals.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: 'var(--muted)', fontSize: 13 }}>No goals yet</div>
            ) : goals.map(g => (
              <div key={g.id} className="card" style={{ padding: 12, marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)' }}>🏒 {g.scorer}</div>
                    {g.assist1 && <div style={{ fontSize: 11, color: 'var(--muted)' }}>A: {g.assist1}</div>}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>P{g.period} · {g.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {role === 'head_coach' && (
            <div className="card" style={{ padding: 16 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 10 }}>Quick Log Goal</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {PLAYERS.filter(p => p.pos !== 'G').map(p => (
                  <button key={p.id} onClick={() => logGoal(p.id, 9)} style={{
                    padding: '6px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                    background: 'var(--surface2)', border: '1px solid var(--border)',
                    color: 'var(--text)', cursor: 'pointer',
                  }}>#{p.number}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'music' && (
        <div>
          <div style={{ padding: '30px 20px', textAlign: 'center', background: 'var(--surface2)', borderRadius: 12, marginBottom: 16 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🎵</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Superhero</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>Metro Boomin</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 16 }}>
              <button style={{ background: 'none', border: 'none', fontSize: 28, cursor: 'pointer' }}>⏮</button>
              <button style={{ background: 'none', border: 'none', fontSize: 36, cursor: 'pointer', color: 'var(--primary)' }}>⏸</button>
              <button style={{ background: 'none', border: 'none', fontSize: 28, cursor: 'pointer' }}>⏭</button>
            </div>
          </div>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8 }}>Team Billboard</div>
            <div style={{ fontSize: 14, color: 'var(--primary)', fontStyle: 'italic', lineHeight: 1.6 }}>
              "Let's get it tonight. We know what we can do. Trust each other. Play for the name on the front." — Coach Tim
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
