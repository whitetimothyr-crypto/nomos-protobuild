import { useState } from 'react';
import { SCHEDULE, PRACTICES, PLAYERS, CARPOOL, getPlayerById } from '../data/teamData';
import { useApp } from '../context/AppContext';

const MY_PLAYER_ID = 8;

// TeamLyft ride request — geofenced, distance-sorted
// In production this pulls from address-sharing consent + geofence data
const NEARBY_PLAYERS = [
  { id: 3,  name: "Jake Sovilla",    distance: "0.4 mi", hasAddress: true  },
  { id: 4,  name: "Tyler Marsh",     distance: "1.1 mi", hasAddress: true  },
  { id: 11, name: "Owen Park",       distance: "1.8 mi", hasAddress: true  },
  { id: 12, name: "Liam Fitzgerald", distance: "2.3 mi", hasAddress: false },
  { id: 13, name: "Noah Birnbaum",   distance: "3.1 mi", hasAddress: true  },
];

function TeamLyftRequest({ game, onClose }) {
  const [sent, setSent] = useState(false);

  if (sent) return (
    <div style={{ padding: '10px 0 4px', borderTop: '1px solid var(--border)', marginTop: 8 }}>
      <div style={{ fontSize: 12, color: 'var(--primary)' }}>
        Ride request sent to nearby families.
      </div>
      <button onClick={onClose} style={{ background:'none', border:'none', color:'var(--muted)', fontSize:11, cursor:'pointer', padding:'4px 0' }}>dismiss</button>
    </div>
  );

  return (
    <div style={{ padding: '10px 0 4px', borderTop: '1px solid var(--border)', marginTop: 8 }}>
      <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 10 }}>
        Families near you (address shared):
      </div>
      {NEARBY_PLAYERS.filter(p => p.hasAddress).map(p => (
        <div key={p.id} style={{ display:'flex', justifyContent:'space-between', padding:'5px 0', borderBottom:'1px solid var(--border)', fontSize: 12 }}>
          <span>{p.name}</span>
          <span style={{ color: 'var(--muted)' }}>{p.distance}</span>
        </div>
      ))}
      <div style={{ display:'flex', gap:8, marginTop:10 }}>
        <button onClick={() => setSent(true)} style={{
          flex:1, padding:'7px', borderRadius:8, fontSize:12, fontWeight:700,
          background:'var(--primary)', border:'none', color:'var(--bg)',
          cursor:'pointer', fontFamily:'inherit',
        }}>Request a Ride</button>
        <button onClick={onClose} style={{
          padding:'7px 12px', borderRadius:8, fontSize:12,
          background:'transparent', border:'1px solid var(--border)',
          color:'var(--muted)', cursor:'pointer', fontFamily:'inherit',
        }}>Cancel</button>
      </div>
    </div>
  );
}

export default function ParentHome() {
  const { rsvp, updateRsvp } = useApp();
  const player = getPlayerById(MY_PLAYER_ID);
  const [activeSection, setActiveSection]   = useState('upcoming');
  const [teamLyftGame, setTeamLyftGame]     = useState(null);

  const upcoming = SCHEDULE.filter(g => !g.result).sort((a,b) => new Date(a.date)-new Date(b.date));
  const past     = SCHEDULE.filter(g =>  g.result).sort((a,b) => new Date(b.date)-new Date(a.date));
  const getRsvp  = (gameId) => rsvp[`${gameId}-${MY_PLAYER_ID}`] || null;

  const handleRsvp = (gameId, status, game) => {
    updateRsvp(gameId, MY_PLAYER_ID, status);
    // Maybe or No on away game → show TeamLyft prompt
    if ((status === 'maybe' || status === 'no') && !game.home) {
      setTeamLyftGame(gameId);
    } else {
      setTeamLyftGame(null);
    }
  };

  return (
    <div style={{ padding:'70px 16px 80px' }} className="animate-fadein">

      {/* Player card */}
      <div className="card" style={{ padding:16, marginBottom:16, borderColor:'var(--primary)40' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{
            width:52, height:52, borderRadius:'50%',
            background:'var(--primary-dim)', border:'2px solid var(--primary)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:22, fontWeight:900, color:'var(--primary)',
            fontFamily:"'Bebas Neue', sans-serif",
          }}>#{player?.number}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:17, fontWeight:700 }}>{player?.name}</div>
            <div style={{ fontSize:12, color:'var(--muted)' }}>{player?.pos} · Biggby Coffee 14U AA</div>
          </div>
          {player?.captain && <span className="pill pill-warning">CAPTAIN</span>}
        </div>
        <div style={{ display:'flex', gap:12, marginTop:14, paddingTop:12, borderTop:'1px solid var(--border)' }}>
          {[['Points',player?.pts||0,'stats'],['Goals',player?.g||0,'primary'],['Assists',player?.a||0,'text'],['GP',player?.gp||0,'muted']].map(([label,val,color]) => (
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
            textTransform:'uppercase', cursor:'pointer', fontFamily:'inherit',
            background: activeSection===s ? 'var(--primary-dim)' : 'transparent',
            border: `1px solid ${activeSection===s ? 'var(--primary)' : 'var(--border)'}`,
            color: activeSection===s ? 'var(--primary)' : 'var(--muted)',
          }}>{s}</button>
        ))}
      </div>

      {/* Upcoming games */}
      {activeSection === 'upcoming' && upcoming.map(game => {
        const status = getRsvp(game.id);
        const date   = new Date(game.date);
        const showLyft = teamLyftGame === game.id;

        return (
          <div key={game.id} className="card" style={{ padding:16, marginBottom:10 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
              <div>
                <div style={{ fontSize:14, fontWeight:700 }}>vs {game.opponent}</div>
                <div style={{ fontSize:12, color:'var(--muted)', marginTop:2 }}>
                  {date.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})} · {game.time}
                </div>
                <div style={{ fontSize:11, color:'var(--muted)' }}>{game.rink}</div>
                {!game.home && <div style={{ fontSize:11, color:'var(--muted)', marginTop:2 }}>📍 {game.address}</div>}
              </div>
              <div style={{ textAlign:'right', display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6 }}>
                <span className={`pill ${game.home ? 'pill-primary' : 'pill-muted'}`}>
                  {game.home ? 'HOME' : 'AWAY'}
                </span>
                {/* TeamLyft direct access button — always visible on away games */}
                {!game.home && (
                  <button onClick={() => setTeamLyftGame(teamLyftGame === game.id ? null : game.id)} style={{
                    fontSize:10, padding:'3px 8px', borderRadius:6,
                    background: showLyft ? 'var(--primary-dim)' : 'transparent',
                    border:`1px solid ${showLyft ? 'var(--primary)' : 'var(--border)'}`,
                    color: showLyft ? 'var(--primary)' : 'var(--muted)',
                    cursor:'pointer', fontFamily:'inherit', fontWeight:600,
                  }}>🚗 TeamLyft</button>
                )}
              </div>
            </div>

            {/* RSVP — Yes / Maybe / No. No confirmation. No TeamLyft on Yes. */}
            <div style={{ display:'flex', gap:6, paddingTop:8, borderTop:'1px solid var(--border)' }}>
              {['yes','maybe','no'].map(s => (
                <button key={s} onClick={() => handleRsvp(game.id, s, game)} style={{
                  flex:1, padding:'7px', borderRadius:6, fontSize:11, fontWeight:700,
                  textTransform:'uppercase', cursor:'pointer', fontFamily:'inherit',
                  background: status===s
                    ? s==='yes' ? 'var(--success-dim)' : s==='no' ? 'var(--danger-dim)' : 'var(--warning-dim)'
                    : 'transparent',
                  border: `1px solid ${status===s
                    ? s==='yes' ? 'var(--success)' : s==='no' ? 'var(--danger)' : 'var(--warning)'
                    : 'var(--border)'}`,
                  color: status===s
                    ? s==='yes' ? 'var(--success)' : s==='no' ? 'var(--danger)' : 'var(--warning)'
                    : 'var(--muted)',
                }}>{s==='yes'?'✓ Yes':s==='maybe'?'? Maybe':'✕ No'}</button>
              ))}
            </div>

            {/* TeamLyft — shown on Maybe/No away games, or via direct button tap */}
            {showLyft && !game.home && (
              <TeamLyftRequest game={game} onClose={() => setTeamLyftGame(null)} />
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
            <span className={`pill ${won?'pill-success':'pill-danger'}`}>{game.result}</span>
          </div>
        );
      })}

      {/* Practices — RSVP only, no ride info */}
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
            {/* Practice RSVP — attendance only, no ride info */}
            <div style={{ display:'flex', gap:6, marginTop:10, paddingTop:8, borderTop:'1px solid var(--border)' }}>
              {['yes','maybe','no'].map(s => (
                <button key={s} style={{
                  flex:1, padding:'6px', borderRadius:6, fontSize:11, fontWeight:700,
                  textTransform:'uppercase', cursor:'pointer', fontFamily:'inherit',
                  background:'transparent', border:'1px solid var(--border)', color:'var(--muted)',
                }}>{s==='yes'?'✓ Yes':s==='maybe'?'? Maybe':'✕ No'}</button>
              ))}
            </div>
          </div>
        );
      })}

      {/* Carpool — away games only, no practice ride info */}
      {activeSection === 'carpool' && (
        <div>
          <div style={{ fontSize:12, color:'var(--muted)', marginBottom:12 }}>
            Away game rides — April 12, Little Caesars Arena
          </div>
          {CARPOOL.map(c => (
            <div key={c.id} className="card" style={{ padding:14, marginBottom:10 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <div style={{ fontSize:14, fontWeight:600 }}>{c.driver}</div>
                <span className={`pill ${c.seats-c.players.length>0?'pill-success':'pill-muted'}`}>
                  {c.seats-c.players.length>0?`${c.seats-c.players.length} open`:'Full'}
                </span>
              </div>
              <div style={{ fontSize:12, color:'var(--muted)' }}>From: {c.from} · {c.departure}</div>
              <div style={{ display:'flex', gap:6, marginTop:8, flexWrap:'wrap' }}>
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
