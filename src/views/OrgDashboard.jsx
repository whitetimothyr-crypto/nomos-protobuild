import { useState } from 'react';
import { TEAM, PLAYERS, SCHEDULE } from '../data/teamData';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const ORG_TEAMS = [
  { id: 1, name: "14U AA",  coach: "Tim White",       record: "18-7-2", pulse: 84, level: "AA", active: true, players: 18 },
  { id: 2, name: "14U A",   coach: "Dave Kolb",       record: "12-12-1", pulse: 71, level: "A",  active: true, players: 16 },
  { id: 3, name: "12U AA",  coach: "Mike Peters",     record: "15-9-3",  pulse: 79, level: "AA", active: true, players: 17 },
  { id: 4, name: "16U AA",  coach: "Chris Barlow",    record: "9-14-2",  pulse: 63, level: "AA", active: true, players: 18 },
  { id: 5, name: "Mites",   coach: "Tom Selby",       record: "N/A",     pulse: 91, level: "8U", active: true, players: 22 },
];

const COMPLIANCE = [
  { name: "SafeSport Certified", status: "compliant",   count: "5/5 coaches" },
  { name: "Background Checks",  status: "compliant",   count: "All current" },
  { name: "Coaching Evals",     status: "attention",   count: "3 pending" },
  { name: "Parent Agreements",  status: "compliant",   count: "89/91 signed" },
  { name: "Insurance",          status: "compliant",   count: "Current" },
];

export default function OrgDashboard() {
  const [tab, setTab] = useState('overview');

  const totalPlayers = ORG_TEAMS.reduce((sum, t) => sum + t.players, 0);
  const avgPulse = Math.round(ORG_TEAMS.reduce((sum, t) => sum + t.pulse, 0) / ORG_TEAMS.length);

  const pulseData = ORG_TEAMS.map(t => ({ name: t.name, pulse: t.pulse }));

  return (
    <div style={{ padding: '70px 16px 80px' }} className="animate-fadein">
      {/* Org header */}
      <div className="card" style={{ padding: 16, marginBottom: 16, borderColor: 'var(--primary)40' }}>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>ORG ADMIN</div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>{TEAM.org}</div>
        <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
          <div><div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>{ORG_TEAMS.length}</div><div style={{ fontSize: 10, color: 'var(--muted)' }}>Teams</div></div>
          <div><div style={{ fontSize: 22, fontWeight: 800, color: 'var(--stats)' }}>{totalPlayers}</div><div style={{ fontSize: 10, color: 'var(--muted)' }}>Athletes</div></div>
          <div><div style={{ fontSize: 22, fontWeight: 800, color: 'var(--success)' }}>{avgPulse}</div><div style={{ fontSize: 10, color: 'var(--muted)' }}>Avg Pulse</div></div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['overview', 'teams', 'compliance', 'finance'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: '7px 2px', borderRadius: 8, fontSize: 10, fontWeight: 700,
            textTransform: 'uppercase', cursor: 'pointer',
            background: tab === t ? 'var(--danger-dim)' : 'transparent',
            border: `1px solid ${tab === t ? 'var(--danger)' : 'var(--border)'}`,
            color: tab === t ? 'var(--danger)' : 'var(--muted)',
          }}>{t}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <div>
          <div className="card" style={{ padding: 16, marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Team Pulse Comparison</div>
            <div style={{ height: 160 }}>
              <ResponsiveContainer>
                <BarChart data={pulseData}>
                  <XAxis dataKey="name" tick={{ fill: 'var(--muted)', fontSize: 10 }} axisLine={false} />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }} />
                  <Bar dataKey="pulse" fill="var(--primary)" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="card" style={{ padding: 16, marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>PARA Org Alerts</div>
            <div style={{ padding: 10, background: 'var(--warning-dim)', borderRadius: 8, marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: 'var(--warning)', fontWeight: 700, marginBottom: 2 }}>16U AA Engagement Dip</div>
              <div style={{ fontSize: 12, color: 'var(--text)' }}>Pulse dropped 12 points over 2 weeks. Coach Barlow flagged. Review recommended.</div>
            </div>
            <div style={{ padding: 10, background: 'var(--primary-dim)', borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700, marginBottom: 2 }}>Mites Team Thriving</div>
              <div style={{ fontSize: 12, color: 'var(--text)' }}>Highest pulse in the org at 91. Coach Selby's engagement approach worth sharing org-wide.</div>
            </div>
          </div>
        </div>
      )}

      {tab === 'teams' && (
        <div>
          {ORG_TEAMS.map(team => (
            <div key={team.id} className="card" style={{ padding: 14, marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{team.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>HC: {team.coach} · {team.players} players</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--stats)' }}>{team.record}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>{team.level}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 10, color: 'var(--muted)' }}>Pulse</div>
                <div style={{ flex: 1, height: 4, background: 'var(--border)', borderRadius: 2 }}>
                  <div style={{ height: '100%', width: `${team.pulse}%`, background: team.pulse >= 80 ? 'var(--success)' : team.pulse >= 65 ? 'var(--warning)' : 'var(--danger)', borderRadius: 2 }} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: team.pulse >= 80 ? 'var(--success)' : team.pulse >= 65 ? 'var(--warning)' : 'var(--danger)' }}>{team.pulse}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'compliance' && (
        <div>
          <div className="card" style={{ padding: 16, marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Compliance Status</div>
            {COMPLIANCE.map((c, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < COMPLIANCE.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{c.count}</div>
                </div>
                <span className={`pill ${c.status === 'compliant' ? 'pill-success' : 'pill-warning'}`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>SafeSport</div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>
              All 5 head coaches current. 3 assistant coaching certifications expire within 60 days. PARA will notify coaches at 45-day mark.
            </div>
          </div>
        </div>
      )}

      {tab === 'finance' && (
        <div>
          <div className="card" style={{ padding: 16, marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Org Financial Summary</div>
            {[
              { team: "14U AA",  dues: 3200, collected: 2880, pct: 90 },
              { team: "14U A",   dues: 2800, collected: 2800, pct: 100 },
              { team: "12U AA",  dues: 3000, collected: 2400, pct: 80 },
              { team: "16U AA",  dues: 3200, collected: 2560, pct: 80 },
              { team: "Mites",   dues: 2000, collected: 2000, pct: 100 },
            ].map((row, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{row.team}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: row.pct === 100 ? 'var(--success)' : row.pct >= 85 ? 'var(--warning)' : 'var(--danger)' }}>
                    ${row.collected.toLocaleString()} / ${row.dues.toLocaleString()}
                  </span>
                </div>
                <div style={{ height: 3, background: 'var(--border)', borderRadius: 2 }}>
                  <div style={{ height: '100%', width: `${row.pct}%`, background: row.pct === 100 ? 'var(--success)' : row.pct >= 85 ? 'var(--warning)' : 'var(--danger)', borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
