import { useState } from 'react';
import { PLAYERS, SCHEDULE, EVALS } from '../data/teamData';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

const myId = 9; // Brody Nystrom demo

const PLAYLIST = [
  { id: 1, title: "Bad Guy",        artist: "Billie Eilish",  duration: "3:14", vibe: "Focus", playing: false },
  { id: 2, title: "Superhero",      artist: "Metro Boomin",   duration: "2:59", vibe: "Hype",  playing: true  },
  { id: 3, title: "SICKO MODE",     artist: "Travis Scott",   duration: "5:13", vibe: "Hype",  playing: false },
  { id: 4, title: "Levitating",     artist: "Dua Lipa",       duration: "3:23", vibe: "Energy",playing: false },
  { id: 5, title: "God's Plan",     artist: "Drake",          duration: "3:18", vibe: "Focus", playing: false },
];

export default function PlayerHome() {
  const player = PLAYERS.find(p => p.id === myId);
  const [tab, setTab]         = useState('home');
  const [playing, setPlaying] = useState(2);

  const eval_ = EVALS[myId];
  const upcoming = SCHEDULE.filter(g => !g.result).sort((a,b) => new Date(a.date) - new Date(b.date))[0];

  const pointsData = [
    { game: 'G1', pts: 2 }, { game: 'G2', pts: 0 }, { game: 'G3', pts: 3 },
    { game: 'G4', pts: 1 }, { game: 'G5', pts: 2 }, { game: 'G6', pts: 0 },
    { game: 'G7', pts: 3 }, { game: 'G8', pts: 1 }, { game: 'G9', pts: 2 },
  ];

  return (
    <div style={{ padding: '70px 16px 80px' }}>
      {/* Player card */}
      <div style={{
        background: 'linear-gradient(135deg, var(--surface) 0%, rgba(58,174,172,0.1) 100%)',
        border: '1px solid var(--primary)40',
        borderRadius: 16, padding: 20, marginBottom: 16,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 48, color: 'var(--primary)', lineHeight: 1, letterSpacing: 2 }}>
              #{player.number}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{player.name}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{player.pos} · Biggby Coffee 14U AA</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: 'var(--stats)' }}>{player.pts}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>Season Pts</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
          <div><div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>{player.g}</div><div style={{ fontSize: 10, color: 'var(--muted)' }}>G</div></div>
          <div><div style={{ fontSize: 22, fontWeight: 800 }}>{player.a}</div><div style={{ fontSize: 10, color: 'var(--muted)' }}>A</div></div>
          <div><div style={{ fontSize: 22, fontWeight: 800, color: 'var(--success)' }}>+{player.plus}</div><div style={{ fontSize: 10, color: 'var(--muted)' }}>+/-</div></div>
          <div><div style={{ fontSize: 22, fontWeight: 800 }}>{player.gp}</div><div style={{ fontSize: 10, color: 'var(--muted)' }}>GP</div></div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['home', 'stats', 'evals', 'music'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: 8, borderRadius: 8, fontSize: 11, fontWeight: 700,
            textTransform: 'uppercase', cursor: 'pointer',
            background: tab === t ? 'var(--primary-dim)' : 'transparent',
            border: `1px solid ${tab === t ? 'var(--primary)' : 'var(--border)'}`,
            color: tab === t ? 'var(--primary)' : 'var(--muted)',
          }}>{t}</button>
        ))}
      </div>

      {tab === 'home' && (
        <div>
          {upcoming && (
            <div className="card" style={{ padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Next Game</div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>vs {upcoming.opponent}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                {new Date(upcoming.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} · {upcoming.time}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{upcoming.rink} · {upcoming.home ? 'HOME' : 'AWAY'}</div>
            </div>
          )}
          <div className="card" style={{ padding: 16, marginBottom: 12, background: 'var(--stats-dim)', borderColor: 'var(--stats)40' }}>
            <div style={{ fontSize: 11, color: 'var(--stats)', fontWeight: 700, marginBottom: 4 }}>PARA Note</div>
            <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6 }}>
              You're having a great season. 39 points is a team high. Keep your compete level up in the third — you've had 6 third-period points in the last 4 games.
            </div>
          </div>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Now Vibing</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--surface2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🎵</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{PLAYLIST.find(p => p.id === playing)?.title}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{PLAYLIST.find(p => p.id === playing)?.artist}</div>
              </div>
              <div style={{ fontSize: 24 }}>⏸</div>
            </div>
          </div>
        </div>
      )}

      {tab === 'stats' && (
        <div>
          <div className="card" style={{ padding: 16, marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Points Per Game</div>
            <div style={{ height: 140 }}>
              <ResponsiveContainer>
                <BarChart data={pointsData}>
                  <XAxis dataKey="game" tick={{ fill: 'var(--muted)', fontSize: 10 }} axisLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }} />
                  <Bar dataKey="pts" fill="var(--primary)" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[['Goals', player.g, 'primary'], ['Assists', player.a, 'text'], ['Points', player.pts, 'stats'], ['+/-', `+${player.plus}`, 'success'], ['PIM', player.pim, 'warning'], ['GP', player.gp, 'muted']].map(([label, val, color]) => (
              <div key={label} className="card2" style={{ padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{label}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: `var(--${color})` }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'evals' && eval_ && eval_.published && (
        <div>
          <div style={{ marginBottom: 12 }}>
            <span className="pill pill-stats">Archetype: {eval_.archetype}</span>
          </div>
          <div style={{ height: 200 }}>
            <ResponsiveContainer>
              <RadarChart data={[
                { subject: 'Skating',  value: eval_.skating },
                { subject: 'Compete',  value: eval_.compete },
                { subject: 'IQ',       value: eval_.hockey_iq },
                { subject: 'Puck',     value: eval_.puck_skills },
                { subject: 'Level',    value: eval_.compete_level },
              ]}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--muted)', fontSize: 11 }} />
                <Radar dataKey="value" stroke="var(--stats)" fill="var(--stats)" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="card" style={{ padding: 14, marginTop: 8 }}>
            <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700, marginBottom: 6 }}>Strengths</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>{eval_.strengths}</div>
          </div>
          <div className="card" style={{ padding: 14, marginTop: 8 }}>
            <div style={{ fontSize: 11, color: 'var(--warning)', fontWeight: 700, marginBottom: 6 }}>Keep Working On</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>{eval_.development}</div>
          </div>
        </div>
      )}

      {tab === 'music' && (
        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>Team Pregame Playlist</div>
          {PLAYLIST.map(song => (
            <div key={song.id} className="wave-item" onClick={() => setPlaying(song.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{
                width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                background: playing === song.id ? 'var(--primary-dim)' : 'var(--surface2)',
                border: `1px solid ${playing === song.id ? 'var(--primary)' : 'var(--border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: playing === song.id ? 18 : 14,
              }}>{playing === song.id ? '🎵' : '▶'}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: playing === song.id ? 700 : 400, color: playing === song.id ? 'var(--primary)' : 'var(--text)' }}>{song.title}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{song.artist}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="pill pill-muted">{song.vibe}</span>
                <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 4 }}>{song.duration}</div>
              </div>
            </div>
          ))}
          <button className="btn-ghost" style={{ width: '100%', marginTop: 12 }}>+ Add Song</button>
        </div>
      )}
    </div>
  );
}
