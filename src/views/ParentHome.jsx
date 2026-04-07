import { useState } from 'react';
import { SCHEDULE, PRACTICES, CARPOOL, WAVES, getPlayerById } from '../data/teamData';
import { useApp } from '../context/AppContext';

export default function ParentHome() {
  const { rsvp, updateRsvp, waves } = useApp();
  const myPlayerId = 8; // Aidan Kowalski - demo parent
  const player = getPlayerById(myPlayerId);
  const [activeSection, setActiveSection] = useState('upcoming');

  const upcoming = SCHEDULE.filter(g => !g.result).sort((a, b) => new Date(a.date) - new Date(b.date));
  const past     = SCHEDULE.filter(g => g.result).sort((a, b) => new Date(b.date) - new Date(a.date));
  const upcomingWaves = waves.filter(w => !w.read).slice(0, 3);

  const getRsvpStatus = (gameId) => rsvp[`${gameId}-${myPlayerId}`] || null;

  return (
    <div style={{ padding: '70px 16px 80px' }} className="animate-fadein">
      {/* My Player card */}
      <div className="card" style={{ padding: 16, marginBottom: 16, borderColor: 'var(--primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'var(--primary-dim)', border: '2px solid var(--primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 900, color: 'var(--primary)', fontFamily: "'Bebas Neue'",
          }}>#{player?.number}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>{player?.name}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{player?.pos} · Biggby Coffee 14U AA</div>
          </div>
          {player?.captain && <span className="pill pill-warning">CAPTAIN</span>}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>Points</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--stats)' }}>{player?.pts || 0}</div>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>Goals</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>{player?.g || 0}</div>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>Assists</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)' }}>{player?.a || 0}</div>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>GP</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)' }}>{player?.gp || 0}</div>
          </div>
        </div>
      </div>

      {/* Unread waves */}
      {upcomingWaves.length > 0 && (
        <div className="card" style={{ padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
            New Waves
          </div>
          {upcomingWaves.map(w => (
            <div key={w.id} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', display: 'flex', gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', marginTop: 5, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 2 }}>{w.from}</div>
                <div style={{ fontSize: 13, color: 'var(--text)' }}>{w.content}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['upcoming', 'past', 'practices', 'carpool'].map(s => (
          <button key={s} onClick={() => setActiveSection(s)} style={{
            flex: 1, padding: '8px 4px', borderRadius: 8, fontSize: 10, fontWeight: 700,
            textTransform: 'uppercase', cursor: 'pointer',
            background: activeSection === s ? 'var(--primary-dim)' : 'transparent',
            border: `1px solid ${activeSection === s ? 'var(--primary)' : 'var(--border)'}`,
            color: activeSection === s ? 'var(--primary)' : 'var(--muted)',
          }}>{s}</button>
        ))}
      </div>

      {/* Upcoming games with RSVP */}
      {activeSection === 'upcoming' && upcoming.map(game => {
        const status = getRsvpStatus(game.id);
        const date = new Date(game.date);
        return (
          <div key={game.id} className="card" style={{ padding: 16, marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>vs {game.opponent}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                  {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · {game.time}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{game.rink}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className={`pill ${game.home ? 'pill-primary' : 'pill-muted'}`}>
                  {game.home ? 'HOME' : 'AWAY'}
                </span>
                <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4 }}>{game.type}</div>
              </div>
            </div>
            {!game.home && (
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8 }}>📍 {game.address}</div>
            )}
            <div style={{ display: 'flex', gap: 6, marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', alignSelf: 'center', marginRight: 4 }}>RSVP:</div>
              {['yes', 'maybe', 'no'].map(s => (
                <button key={s} onClick={() => updateRsvp(game.id, myPlayerId, s)} style={{
                  flex: 1, padding: '6px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                  textTransform: 'uppercase',
                  background: status === s ? (s === 'yes' ? 'var(--success-dim)' : s === 'no' ? 'var(--danger-dim)' : 'var(--warning-dim)') : 'transparent',
                  border: `1px solid ${status === s ? (s === 'yes' ? 'var(--success)' : s === 'no' ? 'var(--danger)' : 'var(--warning)') : 'var(--border)'}`,
                  color: status === s ? (s === 'yes' ? 'var(--success)' : s === 'no' ? 'var(--danger)' : 'var(--warning)') : 'var(--muted)',
                }}>{s}</button>
              ))}
            </div>
          </div>
        );
      })}

      {/* Past results */}
      {activeSection === 'past' && past.map(game => {
        const date = new Date(game.date);
        const won = game.result?.startsWith('W');
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
      {activeSection === 'practices' && (
        <div>
          {PRACTICES.map(p => {
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
        </div>
      )}

      {/* Carpool */}
      {activeSection === 'carpool' && (
        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>
            Next away game: Little Caesars Arena, Apr 12
          </div>
          {CARPOOL.map(c => (
            <div key={c.id} className="card" style={{ padding: 14, marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{c.driver}</div>
                <span className="pill pill-muted">{c.seats - c.players.length} seats open</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>From: {c.from} · Departs {c.departure}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Contact: {c.contact}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                {c.players.map(pid => {
                  const p = getPlayerById(pid);
                  return p ? <span key={pid} className="pill pill-primary">#{p.number} {p.name.split(' ')[1]}</span> : null;
                })}
              </div>
              {c.seats - c.players.length > 0 && (
                <button className="btn-primary" style={{ width: '100%', marginTop: 10, fontSize: 12 }}>
                  Request a Seat
                </button>
              )}
            </div>
          ))}
          <button className="btn-ghost" style={{ width: '100%', marginTop: 8 }}>
            + Offer to Drive
          </button>
        </div>
      )}
    </div>
  );
}
