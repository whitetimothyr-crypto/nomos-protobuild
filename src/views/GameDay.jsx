import { useState, useEffect, useRef } from 'react';
import { PLAYERS, SCHEDULE, getPlayerById } from '../data/teamData';
import { useApp } from '../context/AppContext';

function ZoneTimer({ label, color, active, onToggle, totalSeconds }) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return (
    <div className="card2" style={{ padding: 14, textAlign: 'center' }}>
      <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 28, fontWeight: 700, color: active ? color : 'var(--text)' }}>
        {String(mins).padStart(2,'0')}:{String(secs).padStart(2,'0')}
      </div>
      <button onClick={onToggle} style={{
        marginTop: 10, width: '100%', padding: '8px',
        borderRadius: 8, border: `1px solid ${active ? color : 'var(--border)'}`,
        background: active ? `${color}20` : 'transparent',
        color: active ? color : 'var(--muted)',
        fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
      }}>{active ? '⏹ STOP' : '▶ START'}</button>
    </div>
  );
}

export default function GameDay() {
  const { role } = useApp();
  const [tab, setTab]         = useState('score');
  const [checks, setChecks]   = useState([
    { id:1, item:"Jersey and socks in bag", done:false },
    { id:2, item:"Helmet and cage inspection", done:false },
    { id:3, item:"Skates sharp and ready", done:true },
    { id:4, item:"Water bottle filled", done:false },
    { id:5, item:"Mouthguard packed", done:true },
    { id:6, item:"Stick taped", done:false },
    { id:7, item:"Arrived 90 min early", done:false },
  ]);
  const [score, setScore]     = useState({ us: 0, them: 0 });
  const [period, setPeriod]   = useState(1);
  const [goals, setGoals]     = useState([]);
  const [shots, setShots]     = useState({ for: 0, against: 0 });
  const [ozActive, setOzActive] = useState(false);
  const [dzActive, setDzActive] = useState(false);
  const [ozSec, setOzSec]     = useState(0);
  const [dzSec, setDzSec]     = useState(0);
  const ozRef = useRef(null);
  const dzRef = useRef(null);

  useEffect(() => {
    if (ozActive) { ozRef.current = setInterval(() => setOzSec(s => s+1), 1000); }
    else { clearInterval(ozRef.current); }
    return () => clearInterval(ozRef.current);
  }, [ozActive]);

  useEffect(() => {
    if (dzActive) { dzRef.current = setInterval(() => setDzSec(s => s+1), 1000); }
    else { clearInterval(dzRef.current); }
    return () => clearInterval(dzRef.current);
  }, [dzActive]);

  const nextGame = SCHEDULE.filter(g => !g.result).sort((a,b) => new Date(a.date)-new Date(b.date))[0];
  const checkedCount = checks.filter(c => c.done).length;
  const isCoach = ['head_coach','asst_coach'].includes(role);
  const totalZone = ozSec + dzSec;
  const ozPct = totalZone > 0 ? Math.round((ozSec/totalZone)*100) : 50;

  const logGoal = (id) => {
    const p = getPlayerById(id);
    setScore(s => ({...s, us: s.us+1}));
    setGoals(prev => [...prev, { id: Date.now(), period, scorer: p?.name, number: p?.number, ts: new Date().toLocaleTimeString() }]);
  };

  return (
    <div style={{ padding: '70px 16px 80px' }} className="animate-fadein">

      {/* Scoreboard */}
      {nextGame && (
        <div style={{
          background: 'linear-gradient(135deg, var(--surface) 0%, rgba(58,174,172,0.08) 100%)',
          border: '1px solid var(--primary)30', borderRadius: 16, padding: 20, marginBottom: 14, textAlign: 'center',
        }}>
          <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
            {nextGame.home ? 'HOME' : 'AWAY'} · Period {period} · MGHL
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
            <div>
              <div style={{ fontSize: 10, color: 'var(--primary)', fontWeight: 700, letterSpacing: 1 }}>BIGGBY</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, color: 'var(--primary)', lineHeight: 1 }}>{score.us}</div>
            </div>
            <div style={{ fontSize: 24, color: 'var(--muted)' }}>—</div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, letterSpacing: 1 }}>{nextGame.opponent.split(' ').slice(-1)[0].toUpperCase()}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 64, color: 'var(--muted)', lineHeight: 1 }}>{score.them}</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              Shots: <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{shots.for}</span>
              <span style={{ color: 'var(--muted)' }}> — </span>
              <span style={{ color: 'var(--muted2)', fontWeight: 700 }}>{shots.against}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              OZ: <span style={{ color: 'var(--success)', fontWeight: 700 }}>{ozPct}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        {['score','stats','zones','checklist'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: '7px 2px', borderRadius: 8, fontSize: 10, fontWeight: 700,
            textTransform: 'uppercase', cursor: 'pointer',
            background: tab===t ? 'var(--primary-dim)' : 'transparent',
            border: `1px solid ${tab===t ? 'var(--primary)' : 'var(--border)'}`,
            color: tab===t ? 'var(--primary)' : 'var(--muted)', fontFamily: 'inherit',
          }}>{t}</button>
        ))}
      </div>

      {/* SCORE */}
      {tab === 'score' && (
        <div>
          {isCoach && (
            <div className="card" style={{ padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Log Goal</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                {PLAYERS.filter(p => p.pos !== 'G').map(p => (
                  <button key={p.id} onClick={() => logGoal(p.id)} style={{
                    padding: '6px 10px', borderRadius: 8, background: 'var(--surface2)',
                    border: '1px solid var(--border)', color: 'var(--text)', fontSize: 12,
                    fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                  }}>#{p.number}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setScore(s => ({...s, them: s.them+1}))} className="btn-ghost" style={{ flex: 1, fontSize: 12 }}>Opp Goal</button>
                <button onClick={() => setPeriod(p => Math.min(3,p+1))} className="btn-ghost" style={{ flex: 1, fontSize: 12 }}>Next Period</button>
              </div>
            </div>
          )}
          {goals.length > 0 ? goals.map(g => (
            <div key={g.id} className="card" style={{ padding: 12, marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)' }}>🏒 #{g.number} {g.scorer}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>Period {g.period}</div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>{g.ts}</div>
            </div>
          )) : (
            <div style={{ textAlign: 'center', padding: 30, color: 'var(--muted)', fontSize: 13 }}>No goals logged yet</div>
          )}
        </div>
      )}

      {/* STATS - Shot tracking */}
      {tab === 'stats' && (
        <div>
          <div className="card" style={{ padding: 20, marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Shots on Goal</div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700, marginBottom: 8 }}>FOR</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, color: 'var(--primary)', lineHeight: 1 }}>{shots.for}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 10, justifyContent: 'center' }}>
                  <button onClick={() => setShots(s => ({...s, for: Math.max(0,s.for-1)}))}
                    style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--surface2)', border: '1px solid var(--border)', fontSize: 22, cursor: 'pointer', color: 'var(--muted)', fontFamily: 'inherit' }}>−</button>
                  <button onClick={() => setShots(s => ({...s, for: s.for+1}))}
                    style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--primary-dim)', border: '1px solid var(--primary)', fontSize: 22, cursor: 'pointer', color: 'var(--primary)', fontWeight: 700, fontFamily: 'inherit' }}>+</button>
                </div>
              </div>
              <div style={{ width: 1, background: 'var(--border)' }} />
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 700, marginBottom: 8 }}>AGAINST</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, color: 'var(--muted2)', lineHeight: 1 }}>{shots.against}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 10, justifyContent: 'center' }}>
                  <button onClick={() => setShots(s => ({...s, against: Math.max(0,s.against-1)}))}
                    style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--surface2)', border: '1px solid var(--border)', fontSize: 22, cursor: 'pointer', color: 'var(--muted)', fontFamily: 'inherit' }}>−</button>
                  <button onClick={() => setShots(s => ({...s, against: s.against+1}))}
                    style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--danger-dim)', border: '1px solid var(--danger)', fontSize: 22, cursor: 'pointer', color: 'var(--danger)', fontWeight: 700, fontFamily: 'inherit' }}>+</button>
                </div>
              </div>
            </div>
            {(shots.for+shots.against) > 0 && (
              <div>
                <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(shots.for/(shots.for+shots.against))*100}%`, background: 'var(--primary)', borderRadius: 4, transition: 'width 0.3s' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ fontSize: 10, color: 'var(--primary)' }}>{Math.round((shots.for/(shots.for+shots.against))*100)}% share</span>
                  <span style={{ fontSize: 10, color: 'var(--muted)' }}>{shots.for+shots.against} total</span>
                </div>
              </div>
            )}
          </div>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Game Summary</div>
            {[['Score', `${score.us} — ${score.them}`], ['Shots For', shots.for], ['Shots Against', shots.against], ['Shot Differential', `${shots.for - shots.against > 0 ? '+' : ''}${shots.for - shots.against}`], ['Period', period]].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ZONES */}
      {tab === 'zones' && (
        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, lineHeight: 1.6 }}>
            Tap Start when your team enters a zone. Timers are mutually exclusive.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <ZoneTimer label="Offensive Zone" color="var(--success)" active={ozActive}
              onToggle={() => { if(dzActive) setDzActive(false); setOzActive(a => !a); }}
              totalSeconds={ozSec} />
            <ZoneTimer label="Defensive Zone" color="var(--danger)" active={dzActive}
              onToggle={() => { if(ozActive) setOzActive(false); setDzActive(a => !a); }}
              totalSeconds={dzSec} />
          </div>
          <div className="card" style={{ padding: 16, marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Zone Time Split</div>
            <div style={{ height: 12, background: 'var(--border)', borderRadius: 6, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ height: '100%', width: `${ozPct}%`, background: 'linear-gradient(90deg, var(--success), var(--primary))', borderRadius: 6, transition: 'width 0.5s' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700 }}>
              <span style={{ color: 'var(--success)' }}>OZ {ozPct}%</span>
              <span style={{ color: 'var(--danger)' }}>DZ {100-ozPct}%</span>
            </div>
            <button onClick={() => { setOzSec(0); setDzSec(0); setOzActive(false); setDzActive(false); }}
              className="btn-ghost" style={{ width: '100%', marginTop: 12, fontSize: 12 }}>Reset All Timers</button>
          </div>
          <div style={{ padding: 12, background: 'var(--surface2)', borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>PARA</div>
            <div style={{ fontSize: 12, color: 'var(--text)' }}>
              {ozPct > 55 ? 'Strong OZ presence. Keep the forecheck on.' :
               ozPct < 40 ? 'Too much time in your own end. Get pucks deep.' :
               'Even zone time. Next shift decides it.'}
            </div>
          </div>
        </div>
      )}

      {/* CHECKLIST */}
      {tab === 'checklist' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>{checkedCount}/{checks.length} ready</span>
            <div style={{ height: 6, width: 120, background: 'var(--border)', borderRadius: 3 }}>
              <div style={{ height: '100%', width: `${(checkedCount/checks.length)*100}%`, background: 'var(--primary)', borderRadius: 3 }} />
            </div>
          </div>
          <div className="card">
            {checks.map(c => (
              <div key={c.id} className="wave-item"
                onClick={() => setChecks(prev => prev.map(x => x.id===c.id ? {...x,done:!x.done} : x))}
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
    </div>
  );
}
