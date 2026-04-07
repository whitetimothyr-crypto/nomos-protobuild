import { useState } from 'react';
import { PLAYERS, getPlayerById } from '../data/teamData';
import { useApp } from '../context/AppContext';

const POS_COLORS = { LW: '#3AAEAC', C: '#C08CFF', RW: '#C9A84C', D: '#4CAF88', G: '#A0364E' };

function PlayerChip({ id, pos, onDrop }) {
  const player = getPlayerById(id);
  if (!player) return <EmptySlot pos={pos} onDrop={onDrop} />;
  return (
    <div draggable
      style={{
        padding: '6px 10px', borderRadius: 8,
        background: `${POS_COLORS[pos] || POS_COLORS[player.pos]}20`,
        border: `1px solid ${POS_COLORS[pos] || POS_COLORS[player.pos]}40`,
        cursor: 'grab', userSelect: 'none', minWidth: 80, textAlign: 'center',
      }}>
      <div style={{ fontSize: 10, color: POS_COLORS[pos] || POS_COLORS[player.pos], fontWeight: 700 }}>
        #{player.number} · {player.pos}
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginTop: 2 }}>
        {player.name.split(' ')[1]}
      </div>
      {player.captain && <div style={{ fontSize: 9, color: 'var(--warning)' }}>CAPTAIN</div>}
    </div>
  );
}

function EmptySlot({ pos, label }) {
  return (
    <div style={{
      padding: '6px 10px', borderRadius: 8, minWidth: 80, textAlign: 'center',
      background: 'var(--surface2)', border: '1px dashed var(--border)',
    }}>
      <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700 }}>{label || pos}</div>
      <div style={{ fontSize: 11, color: 'var(--border2)', marginTop: 2 }}>empty</div>
    </div>
  );
}

function LineRow({ label, players, positions }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
        {positions.map((pos, i) => (
          <PlayerChip key={i} id={players[i]} pos={pos} />
        ))}
      </div>
    </div>
  );
}

export default function LineBuilder() {
  const { lines, role } = useApp();
  const [activeView, setActiveView] = useState('even');

  if (!['head_coach', 'asst_coach'].includes(role)) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Coaches Only</div>
        <div style={{ fontSize: 13, color: 'var(--muted)' }}>Line configurations are restricted to coaching staff.</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '70px 16px 80px' }} className="animate-fadein">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['even', 'pp', 'pk', 'goalies'].map(v => (
          <button key={v} onClick={() => setActiveView(v)} style={{
            flex: 1, padding: '8px 4px', borderRadius: 8, fontSize: 11, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: 0.5, cursor: 'pointer',
            background: activeView === v ? 'var(--primary)' : 'var(--surface2)',
            border: `1px solid ${activeView === v ? 'var(--primary)' : 'var(--border)'}`,
            color: activeView === v ? 'var(--bg)' : 'var(--muted)',
          }}>{v}</button>
        ))}
      </div>

      <div className="card" style={{ padding: 16 }}>
        {activeView === 'even' && (
          <>
            <div style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
              Even Strength Lines
            </div>
            {lines.forwards.map((l, i) => (
              <LineRow key={i}
                label={`Line ${l.line}`}
                players={[l.lw, l.c, l.rw]}
                positions={['LW', 'C', 'RW']}
              />
            ))}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 4 }}>
              {lines.defense.map((d, i) => (
                <LineRow key={i}
                  label={`Pair ${d.pair}`}
                  players={[d.ld, d.rd]}
                  positions={['D', 'D']}
                />
              ))}
            </div>
          </>
        )}

        {activeView === 'pp' && (
          <>
            <div style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
              Power Play Units
            </div>
            <LineRow label="PP1"
              players={[lines.pp1.lw, lines.pp1.c, lines.pp1.rw, lines.pp1.ld, lines.pp1.rd]}
              positions={['LW', 'C', 'RW', 'D', 'D']}
            />
            <LineRow label="PP2"
              players={[lines.pp2.lw, lines.pp2.c, lines.pp2.rw, lines.pp2.ld, lines.pp2.rd]}
              positions={['LW', 'C', 'RW', 'D', 'D']}
            />
          </>
        )}

        {activeView === 'pk' && (
          <>
            <div style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
              Penalty Kill Units
            </div>
            <LineRow label="PK1"
              players={[lines.pk1.f1, lines.pk1.f2, lines.pk1.ld, lines.pk1.rd]}
              positions={['F', 'F', 'D', 'D']}
            />
            <LineRow label="PK2"
              players={[lines.pk2.f1, lines.pk2.f2, lines.pk2.ld, lines.pk2.rd]}
              positions={['F', 'F', 'D', 'D']}
            />
          </>
        )}

        {activeView === 'goalies' && (
          <>
            <div style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
              Goaltenders
            </div>
            {lines.goalies.map((gId, i) => {
              const g = getPlayerById(gId);
              if (!g) return null;
              return (
                <div key={gId} className="card2" style={{ padding: 12, marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>#{g.number} {g.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{g.gp} GP</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)' }}>{g.svPct}</div>
                      <div style={{ fontSize: 10, color: 'var(--muted)' }}>Sv% · {g.gaa} GAA</div>
                    </div>
                    {i === 0 && <span className="pill pill-primary">STARTER</span>}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      <div style={{ marginTop: 12, padding: 12, background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8 }}>
        <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>PARA Note</div>
        <div style={{ fontSize: 12, color: 'var(--text)' }}>
          Line 1 has produced 68% of team goals this season. Consider rolling 4 lines vs Honeybaked to keep tempo up in the third.
        </div>
      </div>
    </div>
  );
}
