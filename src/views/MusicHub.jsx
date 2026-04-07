import { useState } from 'react';

const TEAM_PLAYLIST = [
  { id: 1, title: "Superhero",          artist: "Metro Boomin & Future", duration: "2:59", vibe: "Hype",  votes: 14, playing: true  },
  { id: 2, title: "God's Plan",          artist: "Drake",                 duration: "3:18", vibe: "Focus", votes: 11, playing: false },
  { id: 3, title: "SICKO MODE",          artist: "Travis Scott",          duration: "5:13", vibe: "Hype",  votes: 9,  playing: false },
  { id: 4, title: "Bad Guy",             artist: "Billie Eilish",         duration: "3:14", vibe: "Focus", votes: 8,  playing: false },
  { id: 5, title: "Levitating",          artist: "Dua Lipa",              duration: "3:23", vibe: "Energy",votes: 7,  playing: false },
  { id: 6, title: "HUMBLE.",             artist: "Kendrick Lamar",        duration: "2:57", vibe: "Hype",  votes: 6,  playing: false },
  { id: 7, title: "Industry Baby",       artist: "Lil Nas X",             duration: "3:32", vibe: "Energy",votes: 5,  playing: false },
];

const HYPE_SONGS = [
  { id: 8,  title: "Eye of the Tiger",   artist: "Survivor",   duration: "4:04", isHype: true  },
  { id: 9,  title: "Thunderstruck",      artist: "AC/DC",      duration: "4:52", isHype: true  },
  { id: 10, title: "Jump Around",        artist: "House of Pain", duration: "3:35", isHype: true },
];

const vibeColors = {
  Hype:   'var(--danger)',
  Focus:  'var(--primary)',
  Energy: 'var(--stats)',
};

export default function MusicHub() {
  const [playing,   setPlaying]   = useState(1);
  const [playlist,  setPlaylist]  = useState(TEAM_PLAYLIST);
  const [tab,       setTab]       = useState('team');
  const [connected, setConnected] = useState(false);
  const [searchQ,   setSearchQ]   = useState('');
  const [billboard, setBillboard] = useState("Let's get it tonight. We know what we can do. Trust each other. Play for the name on the front.");

  const currentSong = playlist.find(s => s.id === playing) || HYPE_SONGS.find(s => s.id === playing);

  const vote = (id) => {
    setPlaylist(prev => prev.map(s => s.id === id ? { ...s, votes: s.votes + 1 } : s)
      .sort((a, b) => b.votes - a.votes));
  };

  return (
    <div style={{ padding: '70px 16px 80px' }} className="animate-fadein">

      {/* Now Playing */}
      <div style={{
        background: 'linear-gradient(135deg, var(--surface) 0%, rgba(192,140,255,0.1) 100%)',
        border: '1px solid var(--stats)30',
        borderRadius: 16, padding: 20, marginBottom: 16,
      }}>
        <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
          Now Playing
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 10, flexShrink: 0,
            background: 'var(--stats-dim)', border: '1px solid var(--stats)40',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
          }}>🎵</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{currentSong?.title}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>{currentSong?.artist}</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 28, marginTop: 16 }}>
          <button style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: 'var(--muted)' }}>⏮</button>
          <button style={{ background: 'none', border: 'none', fontSize: 32, cursor: 'pointer', color: 'var(--primary)' }}>⏸</button>
          <button style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: 'var(--muted)' }}>⏭</button>
        </div>
      </div>

      {/* Spotify connect */}
      {!connected && (
        <div className="card" style={{ padding: 16, marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1DB95420', border: '1px solid #1DB954', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
              🎧
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Connect Spotify</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Sync team playlist to your Spotify account</div>
            </div>
            <button onClick={() => setConnected(true)}
              style={{ background: '#1DB954', border: 'none', borderRadius: 20, padding: '7px 14px', color: 'black', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
              Connect
            </button>
          </div>
        </div>
      )}
      {connected && (
        <div style={{ padding: '8px 12px', background: '#1DB95415', borderRadius: 8, border: '1px solid #1DB95440', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#1DB954', fontSize: 12, fontWeight: 600 }}>✓ Spotify Connected</span>
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>— Playlist syncing to your library</span>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        {['team', 'hype', 'billboard'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: 8, borderRadius: 8, fontSize: 11, fontWeight: 700,
            textTransform: 'uppercase', cursor: 'pointer',
            background: tab === t ? 'var(--stats-dim)' : 'transparent',
            border: `1px solid ${tab === t ? 'var(--stats)' : 'var(--border)'}`,
            color: tab === t ? 'var(--stats)' : 'var(--muted)',
          }}>{t}</button>
        ))}
      </div>

      {/* Team playlist with voting */}
      {tab === 'team' && (
        <div>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 10 }}>Vote to move songs up the queue</div>
          {playlist.map((song, i) => (
            <div key={song.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 0', borderBottom: '1px solid var(--border)',
                cursor: 'pointer',
              }}
              onClick={() => setPlaying(song.id)}>
              <div style={{ width: 20, fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>{i + 1}</div>
              <div style={{
                width: 38, height: 38, borderRadius: 8, flexShrink: 0,
                background: playing === song.id ? 'var(--stats-dim)' : 'var(--surface2)',
                border: `1px solid ${playing === song.id ? 'var(--stats)' : 'var(--border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: playing === song.id ? 16 : 12, color: playing === song.id ? 'var(--stats)' : 'var(--muted)',
              }}>{playing === song.id ? '▶' : '♪'}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: playing === song.id ? 700 : 400, color: playing === song.id ? 'var(--stats)' : 'var(--text)' }}>{song.title}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{song.artist}</div>
              </div>
              <span className="pill" style={{ background: `${vibeColors[song.vibe]}15`, color: vibeColors[song.vibe] }}>{song.vibe}</span>
              <button onClick={e => { e.stopPropagation(); vote(song.id); }} style={{
                background: 'var(--surface2)', border: '1px solid var(--border)',
                borderRadius: 8, padding: '4px 8px', fontSize: 11, color: 'var(--muted)', cursor: 'pointer',
              }}>▲ {song.votes}</button>
            </div>
          ))}
          <button className="btn-ghost" style={{ width: '100%', marginTop: 12 }}>+ Suggest a Song</button>
        </div>
      )}

      {/* Hype songs - coach controlled */}
      {tab === 'hype' && (
        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12, lineHeight: 1.6 }}>
            Coach-curated hype songs. Plays in locker room before warmup.
          </div>
          {HYPE_SONGS.map(song => (
            <div key={song.id} onClick={() => setPlaying(song.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}>
              <div style={{
                width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                background: playing === song.id ? 'var(--danger-dim)' : 'var(--surface2)',
                border: `1px solid ${playing === song.id ? 'var(--danger)' : 'var(--border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
              }}>{playing === song.id ? '▶' : '🔥'}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{song.title}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{song.artist}</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{song.duration}</div>
            </div>
          ))}
        </div>
      )}

      {/* Billboard */}
      {tab === 'billboard' && (
        <div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>
            Coach message displayed before games and practices
          </div>
          <div style={{ padding: 20, background: 'var(--surface2)', borderRadius: 12, border: '1px solid var(--border)', marginBottom: 14 }}>
            <div style={{ fontSize: 15, color: 'var(--primary)', fontStyle: 'italic', lineHeight: 1.7 }}>
              "{billboard}"
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 10 }}>— Coach Tim</div>
          </div>
          <textarea value={billboard} onChange={e => setBillboard(e.target.value)}
            rows={3} placeholder="Write a message for the team..."
            style={{ marginBottom: 10 }} />
          <button className="btn-primary" style={{ width: '100%' }}>Update Billboard</button>
        </div>
      )}
    </div>
  );
}
