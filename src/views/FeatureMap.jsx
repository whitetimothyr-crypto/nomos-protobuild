const DATA = [
  {
    role: "Head Coach", icon: "🏒", color: "#1D9E75",
    features: [
      { name: "Coach's Corner dashboard", status: "built", note: "STEMS radar, record, next game, top scorers, PARA alerts" },
      { name: "Line Builder", status: "built", note: "Even/PP/PK/Goalies — coaches only lock enforced" },
      { name: "Roster with eval cards", status: "built", note: "All 18 players, expandable, radar charts, archetypes" },
      { name: "GameDay scoreboard", status: "built", note: "Live score, period tracking, goal logging" },
      { name: "Shot tracking For/Against", status: "built", note: "+/- buttons, ratio bar, differential" },
      { name: "Zone time OZ/DZ timers", status: "built", note: "Mutually exclusive start/stop, live split" },
      { name: "Pregame checklist", status: "built", note: "7 items, progress bar" },
      { name: "PARA live intelligence", status: "built", note: "Full Claude API, team context injected, suggestions" },
      { name: "HC Command Center (5 sections)", status: "spec", note: "Attention, Development, Performance, Practice, App Metrics" },
      { name: "Living evaluations (20 subcategories)", status: "spec", note: "Skating(5), Puck(4), IQ(4), Compete(4), Character(3)" },
      { name: "AC upgrade suggestion workflow", status: "spec", note: "HC approve/defer/dismiss on AC eval suggestions" },
      { name: "Projection tools", status: "spec", note: "HC/AC only. Next-level readiness. Not visible to parents/players" },
      { name: "Scouting reports", status: "spec", note: "NEVER negative. What makes them dangerous + how to prepare" },
      { name: "Delta Engine (year-over-year)", status: "spec", note: "Requires org tier + historical data. Free teams reset Sept" },
      { name: "Scheduling Assist", status: "spec", note: "Mutual availability at 0 taps, cross-team conflict detection" },
      { name: "Practice plan builder", status: "spec", note: "Drill library integration, AI progression suggestions" },
      { name: "Drill feedback system", status: "spec", note: "Thumbs/emoji/140-char. HC configures anonymity and timing" },
      { name: "Seasonal pulse surveys", status: "spec", note: "Coach-directed micro-surveys disguised as activities" },
      { name: "Game film / video integration", status: "spec", note: "Hudl integration specced. Phase 2 timeline" },
      { name: "Cross-team HC-to-HC messaging", status: "spec", note: "League-level only. Phase 2" },
      { name: "Coaching climate PARA detection", status: "spec", note: "Ego vs task-involving climate signals. Never accusatory" },
      { name: "Rename: Command Center → Coach's Corner", status: "flag", note: "LOCKED. Old name persists in some files — must be cleaned" },
    ]
  },
  {
    role: "Assistant Coach", icon: "🏒", color: "#378ADD",
    features: [
      { name: "Coach's Corner access", status: "built", note: "Same view as HC, lines lock respected" },
      { name: "Eval write access", status: "spec", note: "Can write evals. HC approves before publishing" },
      { name: "AC sub-roles", status: "spec", note: "Skills, Goalie, Trainer, Equipment — configurable by HC" },
      { name: "3 assignment modes", status: "spec", note: "Skill-specific / player-specific / all coaches — HC sets" },
      { name: "Upgrade suggestion (eval)", status: "spec", note: "AC flags; HC gets approve/defer/dismiss card" },
      { name: "Practice support tools", status: "spec", note: "Drill feedback, GameDay roles, line suggestions" },
    ]
  },
  {
    role: "Manager", icon: "📋", color: "#BA7517",
    features: [
      { name: "Manager Hub", status: "built", note: "Tasks, RSVP tracking, finance, carpool coordination" },
      { name: "RSVP status tracker", status: "built", note: "Confirmed/pending/declined counts, send reminder" },
      { name: "Outstanding dues list", status: "built", note: "Amount, days overdue. Max 3 automated messages then human" },
      { name: "Fundraising tracker", status: "built", note: "Campaign progress bars, goal vs raised" },
      { name: "Carpool coordination view", status: "built", note: "Driver list, open seats, needs-ride list" },
      { name: "Full schedule management", status: "built", note: "Games + practices, past results" },
      { name: "PARA live intelligence", status: "built", note: "Full Claude API access — manager queries supported" },
      { name: "Ops Hub (7 sections)", status: "spec", note: "Readiness, Logistics, Activities, Fundraising, Comms, Team Status, GameDay Monitor" },
      { name: "Equipment tracking", status: "spec", note: "Jersey inventory, equipment logs" },
      { name: "Request Line approval", status: "spec", note: "Song requests from players go through manager filter" },
      { name: "One-touch invoicing", status: "spec", note: "Financial backend via Plaid. Phase 2" },
      { name: "Vendor bill pay", status: "spec", note: "Integrated with financial ledger. Phase 2" },
    ]
  },
  {
    role: "Parent", icon: "👨‍👩‍👦", color: "#9FE1CB",
    features: [
      { name: "My player card + season stats", status: "built", note: "Points, goals, assists, GP. Captain badge" },
      { name: "RSVP (yes/maybe/no)", status: "built", note: "Three buttons. No confirmation modals. Tap = done" },
      { name: "TeamLyft inline (away + YES)", status: "built", note: "Need a Ride / Can Drive / Skip. Inline, no modal" },
      { name: "Past results", status: "built", note: "W/L with score, date, opponent" },
      { name: "Practice schedule with notes", status: "built", note: "Focus area, rink, duration, coach notes" },
      { name: "Carpool tab", status: "built", note: "Driver list, seats open, players in each car" },
      { name: "EMW (Every Moment Witnessed)", status: "built", note: "Timeline of goals, milestones, hat tricks, evals, captain" },
      { name: "PARA pushed content", status: "built", note: "Read-only cards triggered by actions. No live API. No query" },
      { name: "Feed access (read + participate)", status: "built", note: "Group threads, parent-safe. No coaching staff thread" },
      { name: "Eval reading (published only)", status: "built", note: "Strengths + development. Private notes never surface" },
      { name: "PARA action triggers", status: "gap", note: "RSVP YES → passive transport prompt. Mapped but not fully built" },
      { name: "Contact privacy presets", status: "spec", note: "Open / Balanced / Private. Share My Address case-by-case" },
      { name: "Parental controls (Apple Family model)", status: "spec", note: "Usage reports, PARA-aware. No false flags if parent restricts" },
      { name: "Academic drip messages", status: "spec", note: "Max 1/week, contextual, no grade data collected" },
      { name: "Financial dashboard (parent)", status: "spec", note: "My Payments, outstanding balance, tax receipt, payment plan" },
      { name: "TeamLyft live offer list", status: "flag", note: "CONFLICT: Old spec shows live populating list. Current build doesn't. Decide: static vs live" },
      { name: "Roster visibility scope", status: "flag", note: "DECISION: Parent sees player names + attendance. NOT other parent contact info. Must enforce at data layer" },
      { name: "Stat tracking / crowdsource", status: "gap", note: "Parents submit stats. Consensus engine validates. Not built" },
    ]
  },
  {
    role: "Player", icon: "⛸️", color: "#C08CFF",
    features: [
      { name: "Player hero card + stats", status: "built", note: "Number, pts/G/A/GP, position, team" },
      { name: "Points per game bar chart", status: "built", note: "Last 9 games trend" },
      { name: "Published eval radar + feedback", status: "built", note: "Strengths + development. Private notes stripped" },
      { name: "Music hub", status: "built", note: "Playlist voting, Spotify connect, hype songs, billboard" },
      { name: "PARA pushed content", status: "built", note: "Action-triggered cards. No live API access. No query" },
      { name: "Feed access", status: "built", note: "Team / Line threads. No coaching staff thread" },
      { name: "RSVP", status: "built", note: "Yes/maybe/no. No TeamLyft (14U — no driving)" },
      { name: "Character Build", status: "spec", note: "9 archetypes, coaching quadrants, correction style, bench personality" },
      { name: "Buddy Handshake", status: "spec", note: "Mutual team connections. No unilateral follow" },
      { name: "Training log", status: "spec", note: "Player logs reps. Feeds STEMS Engagement" },
      { name: "Drill feedback (from practice)", status: "spec", note: "Thumbs/emoji/140-char after practice drill" },
      { name: "Badge system", status: "spec", note: "Effort, Growth, Team, Character (coach-awarded)" },
      { name: "Challenges", status: "spec", note: "Development challenges linked to eval goals" },
      { name: "Hype song / Now Vibing", status: "spec", note: "Player sets personal hype song. Team sees Now Vibing status" },
      { name: "Season Soundtrack", status: "spec", note: "Biggby Top 20 weekly chart, Game Queue by slot" },
      { name: "Age-appropriate eval depth", status: "spec", note: "8U = 5 fun categories. 14U = full 20 subcategories" },
      { name: "PARA action triggers", status: "gap", note: "YES RSVP, eval view, music open → passive cards. Mapped, not wired" },
      { name: "Captain sub-role", status: "gap", note: "Leadership tasks, peer accountability, captain badges. Not in prototype" },
      { name: "Player photo upload", status: "gap", note: "Mentioned but never fully specced" },
    ]
  },
  {
    role: "Org Admin", icon: "🏢", color: "#E24B4A",
    features: [
      { name: "Org dashboard (5 teams)", status: "built", note: "Pulse comparison, total athletes, avg pulse" },
      { name: "Team pulse with color coding", status: "built", note: "Green ≥80, yellow ≥65, red <65" },
      { name: "Compliance status", status: "built", note: "SafeSport, background checks, coaching evals, parent agreements" },
      { name: "Per-team dues collection", status: "built", note: "Progress bars per team" },
      { name: "PARA org-level alerts", status: "built", note: "Engagement dips, thriving teams surfaced" },
      { name: "Multi-team management", status: "spec", note: "Player dev pipeline, tryout support, org-wide comms" },
      { name: "Coaching certification tracking", status: "spec", note: "USAH, SafeSport, background checks. 60-day expiry alerts" },
      { name: "Parent + player coaching evals (anonymous)", status: "spec", note: "Orgs track these. Never shown to coaches individually" },
      { name: "Conflict metrics", status: "spec", note: "Dispute patterns flagged at org level" },
      { name: "Tryout governance", status: "spec", note: "Org schedules ice. HC runs tryout. League controls eval visibility" },
      { name: "Day 0 CSV import", status: "spec", note: "Bulk roster import at launch" },
      { name: "Community Shield + Sponsorship Offset", status: "spec", note: "Org-controlled toggle. Hides financial strain from families" },
      { name: "Financial ledger + bank connectivity", status: "spec", note: "Plaid integration. Phase 2. PARA projections" },
      { name: "Fundraising at scale", status: "spec", note: "In-app fundraising, no advertising" },
    ]
  },
  {
    role: "League Admin", icon: "🏆", color: "#534AB7",
    features: [
      { name: "Schedule matrix", status: "spec", note: "One-click generation. Auto-conflict detection. Phase 2" },
      { name: "Standings / rankings", status: "spec", note: "Auto-calculated from GameSheet. Dynamic divisions. Phase 2" },
      { name: "Tryout eval visibility control", status: "spec", note: "LOCKED: League controls this as universal default" },
      { name: "Compliance dashboard", status: "spec", note: "Cross-org SafeSport, cert tracking. Phase 2" },
      { name: "Around the League recap (AI)", status: "spec", note: "Weekly AI-generated, positive framing, equity rotation" },
      { name: "Dispute resolution tools", status: "spec", note: "Crowdsourced media auto-available per TOS" },
      { name: "P8 Nomoi governance pipeline", status: "spec", note: "8th of 8 Lines. Governance layer. Phase 3" },
      { name: "Annual subscription model", status: "spec", note: "$15K-$50K/yr. Not implemented" },
    ]
  },
  {
    role: "Rink Admin", icon: "🏟️", color: "#888780",
    features: [
      { name: "Smart notifications (3 tiers)", status: "spec", note: "Emergency / Urgent / Informational. AI routing by sheet time. Phase 2" },
      { name: "AI locker room assignment", status: "spec", note: "Conflict avoidance, schedule-aware. Phase 2" },
      { name: "Ice time exchange marketplace", status: "spec", note: "Buy/sell/swap. $3-5 transaction fee Phase 3" },
      { name: "Rink Trending", status: "gap", note: "Red/yellow/green flagging. Internal + external review aggregation. HIGH PRIORITY — not built" },
      { name: "Rink Pulse metrics", status: "spec", note: "Anonymous crowdsourced conditions. Phase 2" },
      { name: "Event broadcasting", status: "spec", note: "Public skate, clinics, off-season engagement. Phase 2" },
    ]
  },
  {
    role: "Referee", icon: "🦓", color: "#B4B2A9",
    features: [
      { name: "Schedule / availability", status: "spec", note: "4 USA Hockey cert levels. Replaces HorizonWebRef. Phase 2" },
      { name: "Rulebook (searchable, mobile)", status: "spec", note: "Phase 2" },
      { name: "Performance development", status: "spec", note: "Training, cert tracking, game management prep. Phase 2" },
      { name: "Referee-rink communication", status: "spec", note: "Game needs, clock/scorer availability. Phase 2" },
    ]
  },
  {
    role: "Assignor", icon: "📎", color: "#B4B2A9",
    features: [
      { name: "Referee assignment dashboard", status: "spec", note: "Level + location matching. Web + desktop. Phase 2" },
      { name: "Payment tracking", status: "spec", note: "Phase 2" },
      { name: "Referee evaluation access", status: "spec", note: "Phase 2" },
      { name: "Referee-in-Chief (RIC) elevated role", status: "spec", note: "Elevated Assignor. Multi-league capable. Phase 2" },
    ]
  },
  {
    role: "Vendor", icon: "🏷️", color: "#5F5E5A",
    features: [
      { name: "Free web-only portal", status: "spec", note: "LOCKED: 12th role. No mobile app. Free tier only" },
      { name: "Drip team store integration", status: "spec", note: "B2B order templates, exclusives, limited drops" },
      { name: "Retail integration", status: "spec", note: "Pure Hockey, Perani's. Phase 2" },
    ]
  },
  {
    role: "All Roles (Cross-cutting)", icon: "🔁", color: "#1D9E75",
    features: [
      { name: "Feed / group threads", status: "built", note: "Team, Coaching Staff, Parents, Line 1, PARA Intel, DMs" },
      { name: "Safe Report (5 categories)", status: "built", note: "Anonymous toggle default, immutable, reference ID, shield FAB" },
      { name: "Safe Report child-facing language", status: "gap", note: "DECISION: Current labels are compliance language. Two-layer routing matrix done. UI redesign not built" },
      { name: "Calendar sync (.ics export)", status: "built", note: "Apple, Google, Outlook. Subscribe links. Floating FAB" },
      { name: "PARA intelligence layer", status: "built", note: "Live API for HC/AC/Manager/OrgAdmin. Pushed cards for Player/Parent" },
      { name: "Screenshot prevention", status: "spec", note: "LOCKED: Global, non-configurable. Branded shareable cards as social path" },
      { name: "Waves / Feed architecture", status: "built", note: "Nav says Feed. Architecture term stays Waves. Locked" },
      { name: "STEMS diagnostics (radar)", status: "built", note: "Radar chart in prototype. Donut ring version not yet built" },
      { name: "8 Lines (P1-P8) diagnostic scores", status: "spec", note: "Pulse, Velocity, Bond, Anchor, Flux, Equity, Ascension, Nomoi. Not rendered in prototype" },
      { name: "Offline-first (predictive cache)", status: "spec", note: "Calendar-driven. Phase 2" },
      { name: "Consensus stat aggregator", status: "spec", note: "Multi-parent tracking, trust scoring, calibration, HC approval" },
      { name: "GameSheet integration", status: "spec", note: "Top prospect 9.3 composite. Not built. Primary stats data source" },
      { name: "Tournament Discovery Board", status: "spec", note: "MHR data feed. Phase 1 target" },
      { name: "Music integration", status: "built", note: "Playlist voting, Spotify connect, hype songs, billboard" },
      { name: "Badge / awards system", status: "spec", note: "Effort, Growth, Team, Character. Not built" },
      { name: "Dropout prevention (7 pathways)", status: "spec", note: "All 7 mapped to STEMS roots. Not surfaced in prototype" },
      { name: "AI trend language system", status: "spec", note: "PARA learns teen language from feed. Lifecycle-aware. Phase 2" },
      { name: "September 27 Gabby celebration", status: "spec", note: "LOCKED: Annual. Tone-on-tone lymphoma ribbon, quilted texture. Permanent" },
      { name: "Relative Age Effect detection", status: "spec", note: "Birth quarter tracking. PARA adjusts sensitivity for Q3/Q4 athletes" },
      { name: "Drip team store", status: "spec", note: "No 'The'. Merch, gear, exclusives, limited drops. Phase 1" },
      { name: "Past-due messaging rules", status: "spec", note: "LOCKED: Max 3 automated, then human. Never aggravate" },
      { name: "No advertising", status: "spec", note: "LOCKED: No banner ads, no pay-to-play. Revenue from subscriptions only" },
      { name: "Data export buried 6+ taps", status: "spec", note: "LOCKED: Financial export only exception. Multiple exports = departure red flag" },
      { name: "Player/parent crossover detection", status: "spec", note: "1.5x weighted disengagement signal. Parent takes over player RSVP = pre-dropout" },
      { name: "CHIRPS (quick reactions)", status: "gap", note: "TBD. Hockey-native. Not locked. Focus group needed" },
    ]
  }
];

export default function FeatureMap() {
  const [filter, setFilter] = React.useState('all');
  const [collapsed, setCollapsed] = React.useState({});

  const toggle = (i) => setCollapsed(c => ({ ...c, [i]: !c[i] }));

  const statusLabel = { built: 'Built', spec: 'Specced', gap: 'Needs decision', flag: 'Flagged' };
  const statusCls   = { built: 'feat-built', spec: 'feat-spec', gap: 'feat-gap', flag: 'feat-flag' };

  const totals = DATA.reduce((acc, r) => {
    r.features.forEach(f => { acc[f.status] = (acc[f.status] || 0) + 1; });
    return acc;
  }, {});

  return (
    <div style={{ padding: '70px 0 80px', fontFamily: 'inherit' }}>
      <style>{`
        .fm-legend { display:flex; flex-wrap:wrap; gap:12px; padding:12px 16px; font-size:11px; color:var(--muted); border-bottom:1px solid var(--border); }
        .fm-dot { width:8px; height:8px; border-radius:50%; display:inline-block; margin-right:4px; vertical-align:middle; }
        .d-built{background:#1D9E75} .d-spec{background:#378ADD} .d-gap{background:#BA7517} .d-flag{background:#E24B4A}
        .fm-filters { display:flex; flex-wrap:wrap; gap:8px; padding:12px 16px; border-bottom:1px solid var(--border); }
        .fm-btn { font-size:11px; padding:4px 12px; border-radius:20px; border:1px solid var(--border); background:transparent; color:var(--muted); cursor:pointer; font-family:inherit; }
        .fm-btn.active { background:var(--primary-dim); color:var(--primary); border-color:var(--primary); }
        .fm-totals { display:flex; gap:16px; padding:10px 16px; font-size:11px; border-bottom:1px solid var(--border); }
        .fm-role { border-bottom:1px solid var(--border); }
        .fm-role-hdr { display:flex; justify-content:space-between; align-items:center; padding:12px 16px; cursor:pointer; }
        .fm-role-title { font-size:14px; font-weight:600; display:flex; align-items:center; gap:8px; }
        .fm-role-count { font-size:11px; color:var(--muted); }
        .fm-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:6px; padding:8px 12px 12px; }
        .fm-card { border:1px solid var(--border); border-radius:8px; padding:8px 10px; background:var(--surface2); }
        .fm-card-top { display:flex; align-items:flex-start; justify-content:space-between; gap:6px; margin-bottom:3px; }
        .fm-card-name { font-size:12px; font-weight:600; line-height:1.3; }
        .fm-card-note { font-size:10px; color:var(--muted); line-height:1.4; }
        .fm-pill { font-size:9px; padding:1px 6px; border-radius:10px; white-space:nowrap; flex-shrink:0; }
        .feat-built { background:rgba(13,110,84,0.15); color:#4CAF88; }
        .feat-spec  { background:rgba(24,95,165,0.15); color:#3AAEAC; }
        .feat-gap   { background:rgba(133,79,11,0.15);  color:#C9A84C; }
        .feat-flag  { background:rgba(163,45,45,0.15);  color:#A0364E; }
        .fm-sum { display:flex; flex-wrap:wrap; gap:6px; padding:6px 12px 10px; }
        .fm-sum-pill { font-size:10px; padding:2px 8px; border-radius:10px; border:1px solid var(--border); color:var(--muted); }
      `}</style>

      <div className="fm-legend">
        <span><span className="fm-dot d-built"/>Built in prototype</span>
        <span><span className="fm-dot d-spec"/>Specced, not built</span>
        <span><span className="fm-dot d-gap"/>Needs decision</span>
        <span><span className="fm-dot d-flag"/>Conflict / flagged</span>
      </div>

      <div className="fm-totals">
        {Object.entries(totals).map(([s, n]) => (
          <span key={s} style={{ color: s==='built'?'var(--success)':s==='spec'?'var(--primary)':s==='gap'?'var(--warning)':'var(--danger)' }}>
            {n} {statusLabel[s].toLowerCase()}
          </span>
        ))}
      </div>

      <div className="fm-filters">
        {['all','built','spec','gap','flag'].map(f => (
          <button key={f} className={`fm-btn${filter===f?' active':''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? 'All' : statusLabel[f] || f}
          </button>
        ))}
      </div>

      {DATA.map((role, ri) => {
        const visible = role.features.filter(f => filter==='all' || f.status===filter);
        if (visible.length === 0) return null;
        const isOpen = !collapsed[ri];
        const counts = ['built','spec','gap','flag'].map(s => ({ s, n: role.features.filter(f=>f.status===s).length })).filter(x=>x.n>0);
        return (
          <div key={ri} className="fm-role">
            <div className="fm-role-hdr" onClick={() => toggle(ri)}>
              <span className="fm-role-title">
                <span>{role.icon}</span>
                <span style={{ color: role.color }}>{role.role}</span>
              </span>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span className="fm-role-count">{visible.length} features</span>
                <span style={{ fontSize:10, color:'var(--muted)', transform: isOpen?'rotate(90deg)':'none', display:'inline-block', transition:'transform 0.2s' }}>▶</span>
              </div>
            </div>
            {isOpen && (
              <>
                <div className="fm-grid">
                  {visible.map((feat, fi) => (
                    <div key={fi} className="fm-card">
                      <div className="fm-card-top">
                        <span className="fm-card-name">{feat.name}</span>
                        <span className={`fm-pill ${statusCls[feat.status]}`}>{statusLabel[feat.status]}</span>
                      </div>
                      <div className="fm-card-note">{feat.note}</div>
                    </div>
                  ))}
                </div>
                <div className="fm-sum">
                  {counts.map(({s,n}) => (
                    <span key={s} className="fm-sum-pill">
                      <span className={`fm-dot d-${s}`} style={{width:6,height:6,borderRadius:'50%',display:'inline-block',marginRight:3,verticalAlign:'middle',background:s==='built'?'#1D9E75':s==='spec'?'#378ADD':s==='gap'?'#BA7517':'#E24B4A'}}/>
                      {n} {statusLabel[s].toLowerCase()}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

import React from 'react';
