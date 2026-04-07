import { useState } from 'react';
import { PLAYERS, EVALS } from '../data/teamData';
import { useApp } from '../context/AppContext';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';

const posOrder = { G: 0, D: 1, LW: 2, C: 3, RW: 4 };

export default function Roster() {
  const { role } = useApp();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const canViewEvals = ['head_coach', 'asst_coach'].includes(role);
  const canViewPrivate = role === 'head_coach';

  const sorted = [...PLAYERS].sort((a, b) => posOrder[a.pos] - posOrder[b.pos]);
  const filtered = filter === 'all' ? sorted : sorted.filter(p => p.pos === filter);

  return (
    <div style={{ padding: '70px 16px 80px' }} className="animate-fadein">
      {/* Filter */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, overflowX: 'auto' }}>
        {['all', 'G', 'D', 'LW', 'C', 'RW'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: 'pointer',
            background: filter === f ? 'var(--primary-dim)' : 'transparent',
            border: filter === f ? '1px solid var(--primary)' : '1px solid var(--border)',
            color: filter === f ? 'var(--primary)' : 'var(--muted)',
            flexShrink: 0,
          }}>{f}</button>
        ))}
      </div>

      {/* Player list */}
      {filtered.map(player => (
        <div key={player.id} className="card" style={{ marginBottom: 8, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
            onClick={() => setSelected(selected?.id === player.id ? null : player)}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'var(--surface2)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 800, color: 'var(--primary)',
              fontFamily: "'Bebas Neue'", letterSpacing: 1,
            }}>{player.number}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{player.name}</span>
                {player.captain && <span style={{ fontSize: 12 }}>©</span>}
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 1 }}>
                {player.pos} · {player.shoots}H · {player.gp} GP
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              {player.pos === 'G' ? (
                <>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--stats)' }}>{player.svPct}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>{player.gaa} GAA</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--stats)' }}>{player.pts || 0} pts</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>{player.g || 0}G {player.a || 0}A</div>
                </>
              )}
            </div>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>{selected?.id === player.id ? '▲' : '▼'}</div>
          </div>

          {selected?.id === player.id && (
            <div style={{ padding: '0 16px 16px', borderTop: '1px solid var(--border)', background: 'var(--surface2)' }}>
              <div style={{ paddingTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                <div className="card2" style={{ padding: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>Games</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>{player.gp}</div>
                </div>
                <div className="card2" style={{ padding: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: 10, color: 'var(--muted)' }}>PIM</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--warning)' }}>{player.pim || 0}</div>
                </div>
                {player.pos !== 'G' && <>
                  <div className="card2" style={{ padding: 10, textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: 'var(--muted)' }}>Goals</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary)' }}>{player.g || 0}</div>
                  </div>
                  <div className="card2" style={{ padding: 10, textAlign: 'center' }}>
                    <div style={{ fontSize: 10, color: 'var(--muted)' }}>+/-</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: player.plus >= 0 ? 'var(--success)' : 'var(--danger)' }}>
                      {player.plus >= 0 ? '+' : ''}{player.plus || 0}
                    </div>
                  </div>
                </>}
              </div>

              {canViewEvals && EVALS[player.id] && (
                <div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
                    Evaluation
                    {!EVALS[player.id].published && <span className="pill pill-warning" style={{ marginLeft: 8 }}>Draft</span>}
                  </div>
                  <div style={{ height: 140 }}>
                    <ResponsiveContainer>
                      <RadarChart data={[
                        { subject: 'Skating',  value: EVALS[player.id].skating },
                        { subject: 'Compete',  value: EVALS[player.id].compete },
                        { subject: 'IQ',       value: EVALS[player.id].hockey_iq },
                        { subject: 'Puck',     value: EVALS[player.id].puck_skills },
                        { subject: 'Level',    value: EVALS[player.id].compete_level },
                      ]}>
                        <PolarGrid stroke="var(--border)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--muted)', fontSize: 9 }} />
                        <Radar dataKey="value" stroke="var(--stats)" fill="var(--stats)" fillOpacity={0.2} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ padding: 10, background: 'var(--primary-dim)', borderRadius: 8, marginTop: 8 }}>
                    <div style={{ fontSize: 10, color: 'var(--primary)', fontWeight: 700, marginBottom: 4 }}>STRENGTHS</div>
                    <div style={{ fontSize: 12, color: 'var(--text)' }}>{EVALS[player.id].strengths}</div>
                  </div>
                  {canViewPrivate && (
                    <div style={{ padding: 10, background: 'var(--warning-dim)', borderRadius: 8, marginTop: 8 }}>
                      <div style={{ fontSize: 10, color: 'var(--warning)', fontWeight: 700, marginBottom: 4 }}>DEVELOPMENT</div>
                      <div style={{ fontSize: 12, color: 'var(--text)' }}>{EVALS[player.id].development}</div>
                    </div>
                  )}
                  <div style={{ marginTop: 8 }}>
                    <span className="pill pill-stats">Archetype: {EVALS[player.id].archetype}</span>
                  </div>
                </div>
              )}

              {canViewEvals && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>Parent Contact</div>
                  <div style={{ fontSize: 13 }}>{player.parent} · <span style={{ color: 'var(--primary)' }}>{player.parentEmail}</span></div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
