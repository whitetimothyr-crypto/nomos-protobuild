import { useState } from 'react';
import { SCHEDULE, PRACTICES, PLAYERS, CARPOOL, getPlayerById } from '../data/teamData';
import { useApp } from '../context/AppContext';

const MY_PLAYER_ID = 8;

// TeamLyft sheet - shown inline after YES rsvp, no modal, no OK button
function TeamLyftInline({ game, onClose }) {
  const [mode, setMode]       = useState(null); // 'need' | 'drive'
  const [seats, setSeats]     = useState(2);
  const [requested, setReq]   = useState(false);
  const [offered, setOffered] = useState(false);

  if (mode === 'need' && requested) {
    return (
      <div style={{ padding: '12px 0 4px' }}>
        <div style={{ fontSize: 12, color: 'var(--primary)' }}>
          🚗 Ride request out. You'll be notified when someone responds.
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 11, cursor: 'pointer', padding: '4px 0' }}>
          dismiss
        </button>
      </div>
    );
  }

  if (mode === 'drive' && offered) {
    return (
      <div style={{ padding: '12px 0 4px' }}>
        <div style={{ fontSize: 12, color: 'var(--success)' }}>
          ✓ Listed as a driver with {seats} seat{seats > 1 ? 's' : ''}. You'll be notified if someone needs a ride.
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 11, cursor: 'pointer', padding: '4px 0' }}>
          dismiss
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '10px 0 4px', borderTop: '1px solid var(--border)', marginTop: 8 }}>
      <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 10 }}>Transportation for {game.opponent}?</div>

      {!mode && (
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setMode('need')} style={{
            flex: 1, padding: '8px', borderRadius: 8, fontSize: 12, fontWeight: 600,
            background: 'var(--surface2)', border: '1px solid var(--border)',
            color: 'var(--text)', cursor: 'pointer', fontFamily: 'inherit',
          }}>Need a Ride</button>
          <button onClick={() => setMode('drive')} style={{
            flex: 1, padding: '8px', borderRadius: 8, fontSize: 12, fontWeight: 600,
            background: 'var(--surface2)', border: '1px solid var(--border)',
            color: 'var(--text)', cursor: 'pointer', fontFamily: 'inherit',
          }}>Can Drive</button>
          <button onClick={onClose} style={{
            padding: '8px 12px', borderRadius: 8, fontSize: 12,
            background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--muted)', cursor: 'pointer', fontFamily: 'inherit',
          }}>Skip</button>
        </div>
      )}

      {mode === 'need' && (
        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>
            A request will go out to families near you.
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setReq(true)} style={{
              flex: 1, padding: '8px', borderRadius: 8, fontSize: 12, fontWeight: 700,
              background: 'var(--primary)', border: 'none', color: 'var(--bg)',
              cursor: 'pointer', fontFamily: 'inherit',
            }}>Send Request</button>
            <button onClick={() => setMode(null)} style={{
              padding: '8px 12px', borderRadius: 8, fontSize: 12,
              background: 'transparent', border: '1px solid var(--border)',
              color: 'var(--muted)', cursor: 'pointer', fontFamily: 'inherit',
            }}>Back</button>
          </div>
        </div>
      )}

      {mode === 'drive' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>Open seats:</span>
            <button onClick={() => setSeats(s => Math.max(1, s - 1))} style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 16, cursor: 'pointer' }}>−</button>
            <span style={{ fontSize: 14, fontWeight: 700, minWidth: 20, textAlign: 'center' }}>{seats}</span>
            <button onClick={() => setSeats(s => Math.min(6, s + 1))} style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 16, cursor: 'pointer' }}>+</button>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setOffered(true)} style={{
              flex: 1, padding: '8px', borderRadius: 8, fontSize: 12, fontWeight: 700,
              background: 'var(--success)', border: 'none', color: 'white',
              cursor: 'pointer', fontFamily: 'inherit',
            }}>List as Driver</button>
            <button onClick={() => setMode(null)} style={{
              padding: '8px 12px', borderRadius: 8, fontSize: 12,
              background: 'transparent', border: '1px solid var(--border)',
              color: 'var(--muted)', cursor: 'pointer', fontFamily: 'inherit',
            }}>Back</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ParentHome() {
  const { rsvp, updateRsvp } = useApp();
  const player = getPlayerById(MY_PLAYER_ID);
  const [activeSection, setActiveSection] = useState('upcoming');
  const [teamLyftGame, setTeamLyftGame]   = useState(null);

  const upcoming = SCHEDULE.filter(g => !g.result).sort((a,b) => new Date(a.date)-new Date(b.date));
  const past     = SCHEDULE.filter(g =>  g.result).sort((a,b) => new Date(b.date)-new Date(a.date));
  const getRsvp  = (gameId) => rsvp[`${gameId}-${MY_PLAYER_ID}`] || null;

  const handleRsvp = (gameId, status, game) => {
    updateRsvp(gameId, MY_PLAYER_ID, status);
    // Away games only — show TeamLyft inline on YES
    if (status === 'yes' && !game.home) {
      setTeamLyftGame(gameId);
    } else {
      setTeamLyftGame(null);
    }
  };

  return (
    <div style={{ padding: '70px 16px 80px' }} className="animate-fadein">

      {/* Player card */}
      <div className="card" style={{ padding: 16, marginBottom: 16, borderColor: 'var(--primary)40' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'var(--primary-dim)', border: '2px solid var(--primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 900, color: 'var(--primary)',
            fontFamily: "'Bebas Neue', sans-serif",
          }}>#{player?.number}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>{player?.name}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{player?.pos} · Biggby Coffee 14U AA</div>
          </div>
          {player?.captain && <span className="pill pill-warning">CAPTAIN</span>}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          {[['Points', player?.pts||0, 'stats'], ['Goals', player?.g||0, 'primary'], ['Assists', player?.a||0, 'text'], ['GP', player?.gp||0, 'muted']].map(([label, val, color]) => (
            <div key={label} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: `var(--${color})` }}>{val}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['upcoming', 'past', 'practices', 'carpool'].map(s => (
          <button key={s} onClick={() => setActiveSection(s)} style={{
            flex: 1, padding: '8px 4px', borderRadius: 8, fontSize: 10, fontWeight: 700,
            textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit',
            background: activeSection === s ? 'var(--primary-dim)' : 'transparent',
            border: `1px solid ${activeSection === s ? 'var(--primary)' : 'var(--border)'}`,
            color: activeSection === s ? 'var(--primary)' : 'var(--muted)',
          }}>{s}</button>
        ))}
      </div>

      {/* Upcoming games */}
      {activeSection === 'upcoming' && upcoming.map(game => {
        const status = getRsvp(game.id);
        const date   = new Date(game.date);
        const showLyft = teamLyftGame === game.id;
        return (
          <div key={game.id} className="card" style={{ padding: 16, marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>vs {game.opponent}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                  {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · {game.time}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{game.rink}</div>
              </div>
              <span className={`pill ${game.home ? 'pill-primary' : 'pill-muted'}`}>
                {game.home ? 'HOME' : 'AWAY'}
              </span>
            </div>

            {/* RSVP — three buttons, no modals, no confirmations */}
            <div style={{ display: 'flex', gap: 6, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
              {['yes', 'maybe', 'no'].map(s => (
                <button key={s} onClick={() => handleRsvp(game.id, s, game)} style={{
                  flex: 1, padding: '7px', borderRadius: 6, fontSize: 11, fontWeight: 700,
                  textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit',
                  background: status === s
                    ? s === 'yes' ? 'var(--success-dim)' : s === 'no' ? 'var(--danger-dim)' : 'var(--warning-dim)'
                    : 'transparent',
                  border: `1px solid ${status === s
                    ? s === 'yes' ? 'var(--success)' : s === 'no' ? 'var(--danger)' : 'var(--warning)'
                    : 'var(--border)'}`,
                  color: status === s
                    ? s === 'yes' ? 'var(--success)' : s === 'no' ? 'var(--danger)' : 'var(--warning)'
                    : 'var(--muted)',
                }}>{s === 'yes' ? '✓ Yes' : s === 'maybe' ? '? Maybe' : '✕ No'}</button>
              ))}
            </div>

            {/* TeamLyft — inline, no modal, away games + YES only */}
            {showLyft && (
              <TeamLyftInline
                game={game}
                onClose={() => setTeamLyftGame(null)}
              />
            )}
          </div>
        );
      })}

      {/* Past results */}
      {activeSection === 'past' && past.map(game => {
        const date = new Date(game.date);
        const won  = game.result?.startsWith('W');
        return (
          <div key={game.id} className="card" style={{ padding: 14, marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{game.opponent}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
            </div>
            <span className={`pill ${won ? 'pill-success' : 'pill-danger'}`}>{game.result}</span>
          </div>
        );
      })}

      {/* Practices */}
      {activeSection === 'practices' && PRACTICES.map(p => {
        const date = new Date(p.date);
        return (
          <div key={p.id} className="card" style={{ padding: 14, marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Practice</div>
              <span className="pill pill-primary">{p.focus}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · {p.time}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{p.rink} · {p.duration} min</div>
            <div style={{ fontSize: 13, color: 'var(--text)', marginTop: 8 }}>{p.notes}</div>
          </div>
        );
      })}

      {/* Carpool */}
      {activeSection === 'carpool' && (
        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>
            April 12 — Little Caesars Arena · 11:30am departure
          </div>
          {CARPOOL.map(c => (
            <div key={c.id} className="card" style={{ padding: 14, marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{c.driver}</div>
                <span className={`pill ${c.seats - c.players.length > 0 ? 'pill-success' : 'pill-muted'}`}>
                  {c.seats - c.players.length > 0 ? `${c.seats - c.players.length} open` : 'Full'}
                </span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>From: {c.from} · {c.departure}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                {c.players.map(pid => {
                  const p = getPlayerById(pid);
                  return p ? <span key={pid} className="pill pill-primary">#{p.number} {p.name.split(' ')[1]}</span> : null;
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
