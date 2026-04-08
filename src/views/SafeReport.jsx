import { useState } from 'react';

// Who is submitting — determines routing on backend
const SUBMITTERS = [
  { id: 'parent',  label: 'Parent',       icon: '👨‍👩‍👦', color: '#3AAEAC' },
  { id: 'player',  label: 'Player',       icon: '⛸️',     color: '#C08CFF' },
  { id: 'coach',   label: 'Coach / Staff',icon: '🏒',     color: '#C9A84C' },
  { id: 'anon',    label: 'Prefer not to say', icon: '🔒', color: '#666680' },
];

// Child-facing entry paths — map invisibly to SafeSport categories
const PATHS = [
  {
    id: 'me',
    emoji: '🙋',
    label: 'Something happened to me',
    sub: 'You can share as much or as little as you want.',
    color: '#C08CFF',
  },
  {
    id: 'someone',
    emoji: '👀',
    label: 'I saw something happen to someone else',
    sub: 'You noticed. That matters.',
    color: '#3AAEAC',
  },
  {
    id: 'talk',
    emoji: '💬',
    label: 'I just need to talk to someone',
    sub: 'You don\'t have to have it all figured out.',
    color: '#C9A84C',
  },
];

export default function SafeReport() {
  const [step, setStep]         = useState('who');   // who → what → write → done
  const [submitter, setSubmitter] = useState(null);
  const [path, setPath]         = useState(null);
  const [text, setText]         = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => setSubmitted(true);

  if (submitted) {
    return (
      <div style={{ padding: '70px 24px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', gap: 20 }}>
        <div style={{ fontSize: 48 }}>🛡</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--primary)', textAlign: 'center' }}>
          You did the right thing.
        </div>
        <div style={{ fontSize: 14, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.7, maxWidth: 300 }}>
          Your message has been received. The right person will see it. You are not in trouble. Nothing you shared will be used against you.
        </div>
        <div style={{ fontSize: 11, color: 'var(--muted2)', marginTop: 8, textAlign: 'center' }}>
          Reference ID: NMS-{Math.random().toString(36).slice(2,8).toUpperCase()}
        </div>
        <button onClick={() => { setSubmitted(false); setStep('who'); setSubmitter(null); setPath(null); setText(''); }}
          style={{ marginTop: 16, padding: '10px 24px', borderRadius: 8, background: 'transparent', border: '1px solid var(--border)', color: 'var(--muted)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
          Done
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '70px 0 80px' }} className="animate-fadein">

      {/* Header */}
      <div style={{ padding: '0 20px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 22 }}>🛡</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>Safe space</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
          You are not in trouble. Nothing you share here can be seen by your coach or teammates.
        </div>
      </div>

      {/* STEP 1 — Who is sharing */}
      {step === 'who' && (
        <div style={{ padding: '24px 20px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1, fontSize: 11 }}>
            Who is sharing?
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {SUBMITTERS.map(s => (
              <button key={s.id} onClick={() => { setSubmitter(s); setStep('what'); }} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px', borderRadius: 10, cursor: 'pointer',
                background: 'var(--surface2)', border: '1px solid var(--border)',
                textAlign: 'left', fontFamily: 'inherit', transition: 'border-color 0.15s',
              }}>
                <span style={{ fontSize: 22, width: 30, textAlign: 'center' }}>{s.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{s.label}</div>
                  {s.id === 'anon' && (
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                      Your message still reaches the right person
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2 — What's going on */}
      {step === 'what' && (
        <div style={{ padding: '24px 20px' }}>
          <button onClick={() => setStep('who')} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 12, cursor: 'pointer', marginBottom: 16, padding: 0, fontFamily: 'inherit' }}>
            ← back
          </button>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>
            What's going on?
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PATHS.map(p => (
              <button key={p.id} onClick={() => { setPath(p); setStep('write'); }} style={{
                display: 'flex', alignItems: 'flex-start', gap: 14,
                padding: '16px 16px', borderRadius: 10, cursor: 'pointer',
                background: 'var(--surface2)',
                border: `1px solid ${p.color}30`,
                textAlign: 'left', fontFamily: 'inherit',
              }}>
                <span style={{ fontSize: 26, width: 34, textAlign: 'center', flexShrink: 0 }}>{p.emoji}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', lineHeight: 1.4, marginBottom: 4 }}>{p.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{p.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3 — Write it out */}
      {step === 'write' && (
        <div style={{ padding: '24px 20px' }}>
          <button onClick={() => setStep('what')} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 12, cursor: 'pointer', marginBottom: 16, padding: 0, fontFamily: 'inherit' }}>
            ← back
          </button>

          {/* Path context */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 14px', borderRadius: 8, marginBottom: 20,
            background: `${path?.color}15`, border: `1px solid ${path?.color}30`,
          }}>
            <span style={{ fontSize: 20 }}>{path?.emoji}</span>
            <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{path?.label}</span>
          </div>

          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12, lineHeight: 1.6 }}>
            You can share as much or as little as you want. There are no wrong answers. You can even just say "I don't know how to explain it."
          </div>

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Take your time. Write whatever feels right."
            style={{
              width: '100%', minHeight: 140, padding: 14,
              background: 'var(--surface2)', border: '1px solid var(--border)',
              borderRadius: 10, color: 'var(--text)', fontSize: 13,
              fontFamily: 'inherit', resize: 'none', lineHeight: 1.6,
              outline: 'none',
            }}
          />

          {/* Who sees this */}
          <div style={{
            marginTop: 14, padding: '10px 14px', borderRadius: 8,
            background: 'var(--surface)', border: '1px solid var(--border)',
            fontSize: 11, color: 'var(--muted)', lineHeight: 1.7,
          }}>
            {submitter?.id === 'anon'
              ? '🔒 This goes directly to the org\'s SafeSport representative. Nobody else.'
              : `🔒 This goes directly to the org's SafeSport representative. Your coach will not see it.`
            }
          </div>

          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            style={{
              width: '100%', marginTop: 16, padding: '14px',
              borderRadius: 10, fontSize: 14, fontWeight: 700,
              cursor: text.trim() ? 'pointer' : 'default',
              fontFamily: 'inherit',
              background: text.trim() ? 'var(--primary)' : 'var(--surface2)',
              border: `1px solid ${text.trim() ? 'var(--primary)' : 'var(--border)'}`,
              color: text.trim() ? 'var(--bg)' : 'var(--muted)',
              transition: 'all 0.15s',
            }}>
            Send it
          </button>

          <div style={{ marginTop: 10, fontSize: 11, color: 'var(--muted)', textAlign: 'center' }}>
            You can also just close this. Coming here was enough.
          </div>
        </div>
      )}
    </div>
  );
}
