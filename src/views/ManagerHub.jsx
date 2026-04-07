import { useState } from 'react';
import { SCHEDULE, PRACTICES, PLAYERS, CARPOOL, FUNDRAISING } from '../data/teamData';
import { useApp } from '../context/AppContext';

export default function ManagerHub() {
  const { rsvp } = useApp();
  const [tab, setTab] = useState('hub');

  const nextGame = SCHEDULE.filter(g => !g.result).sort((a,b) => new Date(a.date) - new Date(b.date))[0];
  const confirmedCount = nextGame ? PLAYERS.filter(p => rsvp[`${nextGame.id}-${p.id}`] === 'yes').length : 0;
  const pendingCount   = nextGame ? PLAYERS.filter(p => !rsvp[`${nextGame.id}-${p.id}`]).length : 0;

  return (
    <div style={{ padding: '70px 16px 80px' }} className="animate-fadein">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['hub', 'schedule', 'finance', 'carpool'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: 8, borderRadius: 8, fontSize: 10, fontWeight: 700,
            textTransform: 'uppercase', cursor: 'pointer',
            background: tab === t ? 'var(--warning-dim)' : 'transparent',
            border: `1px solid ${tab === t ? 'var(--warning)' : 'var(--border)'}`,
            color: tab === t ? 'var(--warning)' : 'var(--muted)',
          }}>{t}</button>
        ))}
      </div>

      {tab === 'hub' && (
        <div>
          {/* Action items */}
          <div className="card" style={{ padding: 16, marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
              Today's Tasks
            </div>
            {[
              { done: false, text: `Confirm RSVP for ${nextGame?.opponent} game (${pendingCount} pending)`, priority: true },
              { done: false, text: "Send jersey pickup reminder to #29 and #11", priority: true },
              { done: true,  text: "Book ice time for Monday 6am practice" },
              { done: false, text: "Collect tournament fees from 3 families" },
              { done: false, text: "Arrange bus for April 12 away game" },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{
                  width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                  background: item.done ? 'var(--success)' : 'transparent',
                  border: `2px solid ${item.done ? 'var(--success)' : 'var(--border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, color: 'white',
                }}>{item.done ? '✓' : ''}</div>
                <div style={{ flex: 1, fontSize: 13, color: item.done ? 'var(--muted)' : 'var(--text)', textDecoration: item.done ? 'line-through' : 'none' }}>
                  {item.text}
                </div>
                {item.priority && !item.done && <span className="pill pill-danger">!</span>}
              </div>
            ))}
          </div>

          {/* RSVP summary */}
          {nextGame && (
            <div className="card" style={{ padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
                RSVP Status — vs {nextGame.opponent}
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <div style={{ flex: 1, padding: 10, background: 'var(--success-dim)', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--success)' }}>{confirmedCount}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>Confirmed</div>
                </div>
                <div style={{ flex: 1, padding: 10, background: 'var(--warning-dim)', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--warning)' }}>{pendingCount}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>No Response</div>
                </div>
                <div style={{ flex: 1, padding: 10, background: 'var(--danger-dim)', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--danger)' }}>{PLAYERS.length - confirmedCount - pendingCount}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>Can't Make It</div>
                </div>
              </div>
              <button className="btn-ghost" style={{ width: '100%', fontSize: 12 }}>Send Reminder to Non-Responders</button>
            </div>
          )}
        </div>
      )}

      {tab === 'schedule' && (
        <div>
          {SCHEDULE.sort((a,b) => new Date(a.date) - new Date(b.date)).map(game => {
            const date = new Date(game.date);
            const past = !!game.result;
            return (
              <div key={game.id} className="card" style={{ padding: 14, marginBottom: 10, opacity: past ? 0.7 : 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>vs {game.opponent}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                      {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · {game.time}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>{game.rink}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {game.result ? (
                      <span className={`pill ${game.result.startsWith('W') ? 'pill-success' : 'pill-danger'}`}>{game.result}</span>
                    ) : (
                      <span className={`pill ${game.home ? 'pill-primary' : 'pill-muted'}`}>{game.home ? 'HOME' : 'AWAY'}</span>
                    )}
                    <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4 }}>{game.type}</div>
                  </div>
                </div>
              </div>
            );
          })}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 4 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>Practices</div>
            {PRACTICES.map(p => (
              <div key={p.id} className="card" style={{ padding: 12, marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>Practice — {p.focus}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                      {new Date(p.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · {p.time} · {p.duration}min
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'finance' && (
        <div>
          <div className="card" style={{ padding: 16, marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Season Fundraising</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)' }}>${FUNDRAISING.raised.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>of ${FUNDRAISING.goal.toLocaleString()} goal</div>
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--stats)' }}>
                {Math.round((FUNDRAISING.raised / FUNDRAISING.goal) * 100)}%
              </div>
            </div>
            <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(FUNDRAISING.raised/FUNDRAISING.goal)*100}%`, background: 'var(--primary)' }} />
            </div>
            <div style={{ marginTop: 16 }}>
              {FUNDRAISING.campaigns.map(c => (
                <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderTop: '1px solid var(--border)' }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>${c.raised.toLocaleString()} / ${c.goal.toLocaleString()}</div>
                  </div>
                  <span className={`pill ${c.status === 'complete' ? 'pill-success' : c.status === 'active' ? 'pill-primary' : 'pill-muted'}`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Outstanding Dues</div>
            {[
              { name: "Lafferty Family",  amount: 120, days: 14 },
              { name: "Webb Family",      amount: 240, days: 7  },
              { name: "Sorenson Family",  amount: 120, days: 3  },
            ].map((d, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{d.days} days overdue</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--danger)' }}>${d.amount}</div>
                  <button style={{ fontSize: 10, color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer' }}>Send Reminder</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'carpool' && (
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
                  const p = PLAYERS.find(pl => pl.id === pid);
                  return p ? <span key={pid} className="pill pill-primary">#{p.number}</span> : null;
                })}
              </div>
            </div>
          ))}
          <div className="card" style={{ padding: 14, marginTop: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Need Rides</div>
            {PLAYERS.filter(p => !CARPOOL.some(c => c.players.includes(p.id)) && p.pos !== 'G').slice(0,4).map(p => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: 13 }}>#{p.number} {p.name}</span>
                <span className="pill pill-warning">Needs Ride</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
