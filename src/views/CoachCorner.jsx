import { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { TEAM, PLAYERS, SCHEDULE, PRACTICES, STEMS_DATA, getPlayerById } from '../data/teamData';
import { useApp } from '../context/AppContext';

const stemColors = {
  sentiment: '#3AAEAC',
  tempo: '#C08CFF',
  engagement: '#C9A84C',
  momentum: '#4CAF88',
  synergy: '#A0364E',
};

function STEMSWidget({ stems }) {
  const data = Object.entries(stems).map(([key, val]) => ({
    subject: key.charAt(0).toUpperCase() + key.slice(1),
    value: val,
  }));

  return (
    <div className="card" style={{ padding: 16, marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--muted)' }}>
          S.T.E.M.S. Diagnostics
        </div>
        <span className="pill pill-success">84 Pulse</span>
      </div>
      <div style={{ height: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--muted)', fontSize: 10 }} />
            <Radar name="Team" dataKey="value" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.15} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
        {Object.entries(stems).map(([key, val]) => (
          <div key={key} style={{ flex: 1, minWidth: 60 }}>
            <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {key.charAt(0).toUpperCase()}
            </div>
            <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, margin: '4px 0' }}>
              <div style={{ height: '100%', width: `${val}%`, background: stemColors[key], borderRadius: 2 }} />
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: stemColors[key] }}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NextGame() {
  const upcoming = SCHEDULE.filter(g => !g.result).sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  if (!upcoming) return null;
  const date = new Date(upcoming.date);

  return (
    <div className="card" style={{ padding: 16, marginBottom: 12, borderColor: 'var(--primary)' }}>
      <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
        Next Game
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>vs {upcoming.opponent}</div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>
            {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · {upcoming.time}
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{upcoming.rink}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span className={`pill ${upcoming.home ? 'pill-primary' : 'pill-muted'}`}>
            {upcoming.home ? 'HOME' : 'AWAY'}
          </span>
          <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>{upcoming.type}</div>
        </div>
      </div>
      <div style={{ marginTop: 12, padding: '10px 0', borderTop: '1px solid var(--border)', display: 'flex', gap: 16 }}>
        <div style={{ fontSize: 12, color: 'var(--muted)' }}>
          🕐 Arrive: <span style={{ color: 'var(--text)' }}>5:30pm</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)' }}>
          📍 <span style={{ color: 'var(--text)' }}>{upcoming.address}</span>
        </div>
      </div>
    </div>
  );
}

function RecordBar() {
  const { w, l, otl, pts } = TEAM.record;
  const total = w + l + otl;
  return (
    <div className="card" style={{ padding: 16, marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1 }}>Season Record</div>
        <div style={{ fontSize: 11, color: 'var(--muted)' }}>{TEAM.standing}</div>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ fontSize: 32, fontFamily: "'Bebas Neue'", letterSpacing: 2, color: 'var(--primary)' }}>
          {w}-{l}-{otl}
        </div>
        <div>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>Points</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--stats)' }}>{pts}</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ width: `${(w/total)*100}%`, background: 'var(--success)' }} />
              <div style={{ width: `${(otl/total)*100}%`, background: 'var(--warning)' }} />
              <div style={{ width: `${(l/total)*100}%`, background: 'var(--danger)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 4, fontSize: 10, color: 'var(--muted)' }}>
            <span style={{ color: 'var(--success)' }}>{w}W</span>
            <span style={{ color: 'var(--warning)' }}>{otl}OTL</span>
            <span style={{ color: 'var(--danger)' }}>{l}L</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopPlayers() {
  const skaters = PLAYERS.filter(p => p.pos !== 'G' && p.pts > 0).sort((a, b) => b.pts - a.pts).slice(0, 5);
  return (
    <div className="card" style={{ padding: 16, marginBottom: 12 }}>
      <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
        Top Scorers
      </div>
      {skaters.map((p, i) => (
        <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: i < skaters.length - 1 ? 10 : 0 }}>
          <div style={{ fontSize: 11, color: 'var(--muted)', width: 12 }}>{i + 1}</div>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--surface2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--primary)' }}>
            {p.number}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>{p.pos} · {p.gp} GP</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--stats)' }}>{p.pts}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)' }}>{p.g}G {p.a}A</div>
          </div>
          {p.captain && <span style={{ fontSize: 14 }}>©</span>}
        </div>
      ))}
    </div>
  );
}

export default function CoachCorner() {
  const { stems } = useApp();

  return (
    <div style={{ padding: '80px 16px 80px' }} className="animate-fadein">
      <RecordBar />
      <NextGame />
      <STEMSWidget stems={stems} />
      <TopPlayers />
      <div className="card" style={{ padding: 16, marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
          PARA Alert
        </div>
        <div style={{ padding: 12, background: 'var(--stats-dim)', border: '1px solid var(--stats)40', borderRadius: 8 }}>
          <div style={{ fontSize: 12, color: 'var(--stats)', fontWeight: 600, marginBottom: 4 }}>Engagement Dip Detected</div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>
            2 players showing reduced engagement signals over the past 7 days. Recommend individual check-ins before Tuesday.
          </div>
        </div>
        <div style={{ marginTop: 10, padding: 12, background: 'var(--primary-dim)', border: '1px solid var(--primary)40', borderRadius: 8 }}>
          <div style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600, marginBottom: 4 }}>Practice Recommendation</div>
          <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>
            Monday PP session: Run 2-1-2 entries with Kowalski at the half-wall. Detroit Honeybaked gives up the weak side late.
          </div>
        </div>
      </div>
    </div>
  );
}
