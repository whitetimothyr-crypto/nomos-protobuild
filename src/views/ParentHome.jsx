import { useState } from 'react';
import { SCHEDULE, PRACTICES, PLAYERS, CARPOOL, getPlayerById } from '../data/teamData';
import { useApp } from '../context/AppContext';

const MY_PLAYER_ID = 8; // Aidan Kowalski demo

function TeamLyftModal({ game, onClose }) {
  const [offered, setOffered] = useState(false);
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:200, display:'flex', alignItems:'flex-end' }}
      onClick={onClose}>
      <div style={{
        width:'100%', maxWidth:430, margin:'0 auto',
        background:'var(--surface)', borderRadius:'20px 20px 0 0',
        padding:'24px 20px 40px', borderTop:'1px solid var(--border)',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ width:36, height:4, background:'var(--border)', borderRadius:2, margin:'0 auto 20px' }} />
        <div style={{ fontSize:18, fontWeight:700, marginBottom:4 }}>TeamLyft</div>
        <div style={{ fontSize:13, color:'var(--muted)', marginBottom:20 }}>
          Can't make it to {game?.opponent}? Find or offer a ride for your player.
        </div>

        {!offered ? (
          <>
            <div style={{ fontSize:11, color:'var(--muted)', textTransform:'uppercase', letterSpacing:1, marginBottom:12 }}>Available Rides</div>
            {CARPOOL.map(c => (
              <div key={c.id} className="card" style={{ padding:14, marginBottom:10 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                  <div style={{ fontSize:14, fontWeight:600 }}>{c.driver}</div>
                  <span className={`pill ${c.seats - c.players.length > 0 ? 'pill-success' : 'pill-muted'}`}>
                    {c.seats - c.players.length > 0 ? `${c.seats - c.players.length} seat${c.seats - c.players.length > 1 ? 's' : ''} open` : 'Full'}
                  </span>
                </div>
                <div style={{ fontSize:12, color:'var(--muted)' }}>From: {c.from} · Departs {c.departure}</div>
                <div style={{ fontSize:12, color:'var(--muted)' }}>📞 {c.contact}</div>
                {c.seats - c.players.length > 0 && (
                  <button className="btn-primary" style={{ width:'100%', marginTop:10, fontSize:12 }}
                    onClick={() => setOffered(true)}>
                    Request This Ride
                  </button>
                )}
              </div>
            ))}
            <button className="btn-ghost" style={{ width:'100%', marginTop:4 }}
              onClick={() => setOffered(true)}>
              + Offer to Drive Instead
            </button>
          </>
        ) : (
          <div style={{ textAlign:'center', padding:'20px 0' }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🚗</div>
            <div style={{ fontSize:16, fontWeight:700, marginBottom:8 }}>Ride Request Sent</div>
            <div style={{ fontSize:13, color:'var(--muted)', lineHeight:1.6 }}>
              The driver will be notified. You'll receive a confirmation once they accept.
            </div>
            <button className="btn-primary" style={{ width:'100%', marginTop:20 }} onClick={onClose}>Done</button>
          </div>
        )}
      </div>
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
    if (status === 'no') setTeamLyftGame(game);
  };

  return (
    <div style={{ padding:'70px 16px 80px' }} className="animate-fadein">

      {teamLyftGame && <TeamLyftModal game={teamLyftGame} onClose={() => setTeamLyftGame(null)} />}

      {/* Player card */}
      <div className="card" style={{ padding:16, marginBottom:16, borderColor:'var(--primary)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{
            width:52, height:52, borderRadius:'50%',
            background:'var(--primary-dim)', border:'2px solid var(--primary)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:22, fontWeight:900, color:'var(--primary)', fontFamily:"'Bebas Neue', sans-serif",
          }}>#{player?.number}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:17, fontWeight:700 }}>{player?.name}</div>
            <div style={{ fontSize:12, color:'var(--muted)' }}>{player?.pos} · Biggby Coffee 14U AA</div>
          </div>
          {player?.captain && <span className="pill pill-warning">CAPTAIN</span>}
        </div>
        <div style={{ display:'flex', gap:12, marginTop:14, paddingTop:12, borderTop:'1px solid var(--border)' }}>
          {[['Points', player?.pts||0, 'stats'], ['Goals', player?.g||0, 'primary'], ['Assists', player?.a||0, 'text'], ['GP', player?.gp||0, 'muted']].map(([label, val, color]) => (
            <div key={label} style={{ flex:1, textAlign:'center' }}>
              <div style={{ fontSize:22, fontWeight:800, color:`var(--${color})` }}>{val}</div>
              <div style={{ fontSize:11, color:'var(--muted)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section tabs */}
      <div style={{ display:'flex', gap:8, marginBottom:16 }}>
        {['upcoming','past','practices','carpool'].map(s => (
          <button key={s} onClick={() => setActiveSection(s)} style={{
            flex:1, padding:'8px 4px', borderRadius:8, fontSize:10, fontWeight:700,
            textTransform:'uppercase', cursor:'pointer',
            background: activeSection===s ? 'var(--primary-dim)' : 'transparent',
            border: `1px solid ${activeSection===s ? 'var(--primary)' : 'var(--border)'}`,
            color: activeSection===s ? 'var(--primary)' : 'var(--muted)', fontFamily:'inherit',
          }}>{s}</button>
        ))}
      </div>

      {/* Upcoming games with RSVP */}
      {activeSection === 'upcoming' && upcoming.map(game => {
        const status = getRsvp(game.id);
        const date   = new Date(game.date);
        return (
          <div key={game.id} className="card" style={{ padding:16, marginBottom:10 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
              <div>
                <div style={{ fontSize:14, fontWeight:700 }}>vs {game.opponent}</div>
                <div style={{ fontSize:12, color:'var(--muted)', marginTop:2 }}>
                  {date.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})} · {game.time}
                </div>
                <div style={{ fontSize:11, color:'var(--muted)', marginTop:2 }}>{game.rink}</div>
              </div>
              <span className={`pill ${game.home ? 'pill-primary' : 'pill-muted'}`}>
                {game.home ? 'HOME' : 'AWAY'}
              </span>
            </div>
            {!game.home && <div style={{ fontSize:11, color:'var(--muted)', marginBottom:8 }}>📍 {game.address}</div>}

            <div style={{ display:'flex', gap:6, marginTop:8, paddingTop:8, borderTop:'1px solid var(--border)', alignItems:'center' }}>
              <div style={{ fontSize:11, color:'var(--muted)', marginRight:4 }}>RSVP:</div>
              {['yes','maybe','no'].map(s => (
                <button key={s} onClick={() => handleRsvp(game.id, s, game)} style={{
                  flex:1, padding:'7px', borderRadius:6, fontSize:11, fontWeight:700, cursor:'pointer',
                  textTransform:'uppercase', fontFamily:'inherit',
                  background: status===s ? (s==='yes'?'var(--success-dim)':s==='no'?'var(--danger-dim)':'var(--warning-dim)') : 'transparent',
                  border: `1px solid ${status===s ? (s==='yes'?'var(--success)':s==='no'?'var(--danger)':'var(--warning)') : 'var(--border)'}`,
                  color: status===s ? (s==='yes'?'var(--success)':s==='no'?'var(--danger)':'var(--warning)') : 'var(--muted)',
                }}>{s}</button>
              ))}
            </div>

            {status === 'no' && (
              <button onClick={() => setTeamLyftGame(game)} style={{
                width:'100%', marginTop:8, padding:'8px', borderRadius:8,
                background:'rgba(58,174,172,0.08)', border:'1px solid var(--primary)40',
                color:'var(--primary)', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit',
              }}>🚗 Find a Ride with TeamLyft</button>
            )}
          </div>
        );
      })}

      {/* Past results */}
      {activeSection === 'past' && past.map(game => {
        const date = new Date(game.date);
        const won  = game.result?.startsWith('W');
        return (
          <div key={game.id} className="card" style={{ padding:14, marginBottom:8, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div style={{ fontSize:13, fontWeight:600 }}>{game.opponent}</div>
              <div style={{ fontSize:11, color:'var(--muted)' }}>
                {date.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})}
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
          <div key={p.id} className="card" style={{ padding:14, marginBottom:10 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
              <div style={{ fontSize:14, fontWeight:600 }}>Practice</div>
              <span className="pill pill-primary">{p.focus}</span>
            </div>
            <div style={{ fontSize:12, color:'var(--muted)' }}>
              {date.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})} · {p.time}
            </div>
            <div style={{ fontSize:12, color:'var(--muted)' }}>{p.rink} · {p.duration} min</div>
            <div style={{ fontSize:13, color:'var(--text)', marginTop:8 }}>{p.notes}</div>
          </div>
        );
      })}

      {/* Carpool */}
      {activeSection === 'carpool' && (
        <div>
          <div style={{ fontSize:12, color:'var(--muted)', marginBottom:12 }}>
            April 12 — Little Caesars Arena · 11:30am departure
          </div>
          {CARPOOL.map(c => (
            <div key={c.id} className="card" style={{ padding:14, marginBottom:10 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <div style={{ fontSize:14, fontWeight:600 }}>{c.driver}</div>
                <span className={`pill ${c.seats-c.players.length > 0 ? 'pill-success' : 'pill-muted'}`}>
                  {c.seats-c.players.length > 0 ? `${c.seats-c.players.length} open` : 'Full'}
                </span>
              </div>
              <div style={{ fontSize:12, color:'var(--muted)' }}>From: {c.from} · {c.departure}</div>
              <div style={{ fontSize:12, color:'var(--muted)' }}>📞 {c.contact}</div>
              <div style={{ display:'flex', gap:6, marginTop:8, flexWrap:'wrap' }}>
                {c.players.map(pid => {
                  const p = getPlayerById(pid);
                  return p ? <span key={pid} className="pill pill-primary">#{p.number} {p.name.split(' ')[1]}</span> : null;
                })}
              </div>
              {c.seats-c.players.length > 0 && (
                <button className="btn-primary" style={{ width:'100%', marginTop:10, fontSize:12 }}>Request a Seat</button>
              )}
            </div>
          ))}
          <button className="btn-ghost" style={{ width:'100%', marginTop:8 }}>+ Offer to Drive</button>
        </div>
      )}
    </div>
  );
}
