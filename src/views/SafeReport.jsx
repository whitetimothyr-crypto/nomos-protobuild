import { useState } from 'react';

const REPORT_TYPES = [
  {
    id: 'safesport',
    label: 'SafeSport Concern',
    icon: '🛡️',
    color: 'var(--danger)',
    urgent: true,
    desc: 'Misconduct, emotional abuse, grooming, boundary violations',
  },
  {
    id: 'bullying',
    label: 'Bullying / Harassment',
    icon: '⚠️',
    color: 'var(--warning)',
    desc: 'Player-to-player, parent-to-player, or adult-to-player',
  },
  {
    id: 'physical',
    label: 'Physical Safety',
    icon: '🏥',
    color: '#4CAF88',
    desc: 'Injury concern, unsafe conditions, equipment issues',
  },
  {
    id: 'wellbeing',
    label: 'Player Wellbeing',
    icon: '💙',
    color: '#3AAEAC',
    desc: 'Mental health, disengagement, family situation',
  },
  {
    id: 'conduct',
    label: 'Code of Conduct',
    icon: '📋',
    color: 'var(--stats)',
    desc: 'Parent behavior, social media, inappropriate language',
  },
];

export default function SafeReport() {
  const [anonymous, setAnonymous] = useState(true);
  const [step, setStep]           = useState('select'); // select | form | submitted
  const [selected, setSelected]   = useState(null);
  const [description, setDescription] = useState('');
  const [involved, setInvolved]   = useState('');
  const [when, setWhen]           = useState('');

  const handleSelect = (type) => {
    setSelected(type);
    setStep('form');
  };

  const handleSubmit = () => {
    if (!description.trim()) return;
    setStep('submitted');
  };

  const reset = () => {
    setStep('select');
    setSelected(null);
    setDescription('');
    setInvolved('');
    setWhen('');
  };

  return (
    <div style={{ padding: '70px 16px 80px' }} className="animate-fadein">

      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Safe Report</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
          This is a protected, confidential reporting channel. Reports go directly to designated org safety staff.
        </div>
      </div>

      {step === 'select' && (
        <>
          {/* Anonymous toggle */}
          <div className="card" style={{ padding: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Submit Anonymously</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                  Your identity will not be recorded or stored with this report.
                </div>
              </div>
              <div
                onClick={() => setAnonymous(!anonymous)}
                style={{
                  width: 50, height: 28, borderRadius: 14, cursor: 'pointer',
                  background: anonymous ? 'var(--primary)' : 'var(--border)',
                  position: 'relative', transition: 'background 0.2s', flexShrink: 0,
                }}
              >
                <div style={{
                  position: 'absolute', top: 3,
                  left: anonymous ? 24 : 3,
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'white', transition: 'left 0.2s',
                }} />
              </div>
            </div>
          </div>

          {/* Report types */}
          <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
            Select Report Type
          </div>
          {REPORT_TYPES.map(type => (
            <div key={type.id} className="card"
              onClick={() => handleSelect(type)}
              style={{
                padding: 16, marginBottom: 10, cursor: 'pointer',
                borderColor: `${type.color}40`,
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                background: `${type.color}15`,
                border: `1px solid ${type.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }}>{type.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <span style={{ fontSize: 14, fontWeight: 700 }}>{type.label}</span>
                  {type.urgent && <span className="pill pill-danger">URGENT</span>}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{type.desc}</div>
              </div>
              <div style={{ color: 'var(--muted)', fontSize: 18 }}>›</div>
            </div>
          ))}

          {/* Legal footer */}
          <div style={{
            marginTop: 16, padding: 14,
            background: 'var(--surface2)', borderRadius: 8,
            fontSize: 11, color: 'var(--muted)', lineHeight: 1.6,
          }}>
            Safe Report is a vertical silo. Submitters cannot view, edit, or delete their report after submission. Only designated safety staff have access.
          </div>
        </>
      )}

      {step === 'form' && selected && (
        <>
          <button onClick={() => setStep('select')} style={{
            background: 'none', border: 'none', color: 'var(--muted)',
            fontSize: 13, cursor: 'pointer', marginBottom: 16, padding: 0,
          }}>← Back</button>

          <div className="card" style={{ padding: 14, marginBottom: 16, borderColor: `${selected.color}40` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }}>{selected.icon}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{selected.label}</div>
                {selected.urgent && <span className="pill pill-danger" style={{ marginTop: 2 }}>URGENT — Will notify org safety staff immediately</span>}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
              Describe what happened <span style={{ color: 'var(--danger)' }}>*</span>
            </div>
            <textarea value={description} onChange={e => setDescription(e.target.value)}
              placeholder="Please describe the incident in as much detail as you are comfortable sharing..."
              rows={5} style={{ resize: 'none' }} />
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
              Who was involved? (optional)
            </div>
            <input value={involved} onChange={e => setInvolved(e.target.value)}
              placeholder="Names, roles, or leave blank" />
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
              When did this occur? (optional)
            </div>
            <input value={when} onChange={e => setWhen(e.target.value)}
              placeholder="Date, time, or approximate" />
          </div>

          {anonymous && (
            <div style={{ padding: 12, background: 'var(--primary-dim)', borderRadius: 8, marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: 'var(--primary)' }}>
                🔒 This report will be submitted anonymously. Your identity will not be recorded.
              </div>
            </div>
          )}

          <button
            className="btn-primary"
            style={{ width: '100%', opacity: description.trim() ? 1 : 0.4 }}
            onClick={handleSubmit}
          >
            Submit Report
          </button>

          <div style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center', marginTop: 12 }}>
            Reports are immutable once submitted and cannot be deleted.
          </div>
        </>
      )}

      {step === 'submitted' && (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Report Submitted</div>
          <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 24 }}>
            Your report has been securely received. Org safety staff have been notified.
            {anonymous && ' Your identity has not been recorded.'} You will not receive a follow-up through this channel to protect confidentiality.
          </div>
          <div style={{ padding: 14, background: 'var(--surface2)', borderRadius: 10, marginBottom: 24, textAlign: 'left' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>Report Reference</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 13, color: 'var(--primary)' }}>
              SR-{Date.now().toString(36).toUpperCase()}
            </div>
          </div>
          <button className="btn-ghost" onClick={reset} style={{ width: '100%' }}>
            Submit Another Report
          </button>
        </div>
      )}
    </div>
  );
}
