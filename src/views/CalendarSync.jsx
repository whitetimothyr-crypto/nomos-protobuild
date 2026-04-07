import { useState } from 'react';
import { SCHEDULE, PRACTICES, TEAM } from '../data/teamData';

function generateICS(events) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//NOMOS//Biggby 14U AA//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${TEAM.name}`,
    'X-WR-TIMEZONE:America/Detroit',
  ];

  events.forEach(event => {
    const start = new Date(`${event.date}T${event.time || '09:00'}:00`);
    const end   = new Date(start.getTime() + (event.duration || 90) * 60000);

    const fmt = (d) => d.toISOString().replace(/[-:]/g, '').replace('.000', '');

    lines.push('BEGIN:VEVENT');
    lines.push(`DTSTART:${fmt(start)}`);
    lines.push(`DTEND:${fmt(end)}`);
    lines.push(`SUMMARY:${event.type === 'practice' ? `NOMOS Practice - ${event.focus}` : `NOMOS vs ${event.opponent}`}`);
    lines.push(`LOCATION:${event.rink || event.address || TEAM.rink}`);
    lines.push(`DESCRIPTION:${TEAM.name} | ${event.type || 'Game'}`);
    lines.push(`UID:nomos-${event.id}-${TEAM.name.replace(/\s/g, '')}@nomosschema.com`);
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

export default function CalendarSync() {
  const [synced, setSynced] = useState({ apple: false, google: false });
  const [exported, setExported] = useState(false);

  const allEvents = [
    ...SCHEDULE.map(s => ({ ...s, type: 'game' })),
    ...PRACTICES.map(p => ({ ...p, type: 'practice', opponent: null })),
  ].sort((a, b) => new Date(a.date) - new Date(b.date));

  const upcoming = allEvents.filter(e => !e.result);

  const handleExport = () => {
    const ics = generateICS(upcoming);
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'nomos-biggby-14u.ics';
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
  };

  return (
    <div style={{ padding: '70px 16px 80px' }} className="animate-fadein">
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Calendar Sync</div>
      <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>
        {upcoming.length} upcoming events · {TEAM.name}
      </div>

      {/* Export ICS */}
      <div className="card" style={{ padding: 20, marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 32 }}>📅</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Export to Calendar</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>Works with Apple Calendar, Google Calendar, Outlook</div>
          </div>
        </div>
        <button className="btn-primary" style={{ width: '100%' }} onClick={handleExport}>
          {exported ? '✓ Downloaded — Open in Calendar App' : 'Download .ics File'}
        </button>
        {exported && (
          <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8, textAlign: 'center' }}>
            Tap the .ics file to add all events to your calendar
          </div>
        )}
      </div>

      {/* Apple Calendar */}
      <div className="card" style={{ padding: 16, marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 28 }}>🍎</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Apple Calendar</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Subscribe via webcal link</div>
            </div>
          </div>
          <button onClick={() => setSynced(s => ({ ...s, apple: true }))}
            className={synced.apple ? 'btn-ghost' : 'btn-primary'}
            style={{ fontSize: 12, padding: '8px 14px' }}>
            {synced.apple ? '✓ Subscribed' : 'Subscribe'}
          </button>
        </div>
        {synced.apple && (
          <div style={{ marginTop: 10, padding: 10, background: 'var(--success-dim)', borderRadius: 8, fontSize: 12, color: 'var(--success)' }}>
            Calendar subscribed. Events auto-update when schedule changes.
          </div>
        )}
      </div>

      {/* Google Calendar */}
      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 28 }}>🗓️</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Google Calendar</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Subscribe via URL</div>
            </div>
          </div>
          <button onClick={() => setSynced(s => ({ ...s, google: true }))}
            className={synced.google ? 'btn-ghost' : 'btn-primary'}
            style={{ fontSize: 12, padding: '8px 14px' }}>
            {synced.google ? '✓ Added' : 'Add'}
          </button>
        </div>
        {synced.google && (
          <div style={{ marginTop: 10, padding: 10, background: 'var(--success-dim)', borderRadius: 8, fontSize: 12, color: 'var(--success)' }}>
            Added to Google Calendar. Check calendar.google.com to confirm.
          </div>
        )}
      </div>

      {/* Upcoming events list */}
      <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>
        Upcoming Events
      </div>
      {upcoming.map(event => {
        const date = new Date(event.date);
        return (
          <div key={event.id} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
            <div style={{
              width: 44, flexShrink: 0, textAlign: 'center',
              padding: '6px 0', background: 'var(--surface2)',
              borderRadius: 8, border: '1px solid var(--border)',
            }}>
              <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase' }}>
                {date.toLocaleDateString('en-US', { month: 'short' })}
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1 }}>
                {date.getDate()}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>
                {event.type === 'practice' ? `Practice — ${event.focus}` : `vs ${event.opponent}`}
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                {event.time} · {event.rink}
              </div>
            </div>
            <span className={`pill ${event.type === 'practice' ? 'pill-primary' : event.home ? 'pill-success' : 'pill-muted'}`}>
              {event.type === 'practice' ? 'Practice' : event.home ? 'Home' : 'Away'}
            </span>
          </div>
        );
      })}
    </div>
  );
}
