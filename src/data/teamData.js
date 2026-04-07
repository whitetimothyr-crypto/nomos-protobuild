export const TEAM = {
  name: "Biggby Coffee 14U AA",
  org: "Biggby Coffee Hockey Club",
  league: "MGHL",
  season: "2025-26",
  level: "14U AA",
  rink: "Biggby Ice Cube",
  record: { w: 18, l: 7, otl: 2, pts: 38 },
  standing: "3rd - MGHL Central",
};

export const PLAYERS = [
  { id: 1,  number: 1,  name: "Marcus Chen",      pos: "G",  shoots: "L", dob: "2011-03-14", active: true,  gp:27, g:0,  a:0,  pts:0,  pim:4,  svPct:0.921, gaa:2.41, line:1, status:"active", parent: "Linda Chen", parentEmail: "linda.chen@email.com" },
  { id: 2,  number: 30, name: "Eli Torrance",     pos: "G",  shoots: "L", dob: "2011-07-22", active: true,  gp:8,  g:0,  a:0,  pts:0,  pim:0,  svPct:0.908, gaa:2.89, line:1, status:"active", parent: "Rob Torrance", parentEmail: "rob.t@email.com" },
  { id: 3,  number: 4,  name: "Jake Sovilla",     pos: "D",  shoots: "R", dob: "2011-01-09", active: true,  gp:27, g:4,  a:11, pts:15, pim:22, plus:8,  line:1, status:"active", parent: "Mike Sovilla", parentEmail: "msovilla@email.com" },
  { id: 4,  number: 7,  name: "Tyler Marsh",      pos: "D",  shoots: "L", dob: "2011-05-30", active: true,  gp:27, g:2,  a:8,  pts:10, pim:14, plus:5,  line:1, status:"active", parent: "Kris Marsh", parentEmail: "kmarsh@email.com" },
  { id: 5,  number: 12, name: "Connor Abelski",   pos: "D",  shoots: "R", dob: "2011-09-04", active: true,  gp:25, g:1,  a:6,  pts:7,  pim:18, plus:3,  line:2, status:"active", parent: "Dave Abelski", parentEmail: "dabelski@email.com" },
  { id: 6,  number: 22, name: "Danny Purcell",    pos: "D",  shoots: "L", dob: "2012-02-11", active: true,  gp:22, g:0,  a:4,  pts:4,  pim:8,  plus:-1, line:2, status:"active", parent: "Tom Purcell", parentEmail: "tpurcell@email.com" },
  { id: 7,  number: 29, name: "Felix White",      pos: "G",  shoots: "L", dob: "2011-11-17", active: true,  gp:5,  g:0,  a:0,  pts:0,  pim:0,  svPct:0.899, gaa:3.12, line:1, status:"active", parent: "Tim White", parentEmail: "tim@nomosschema.com" },
  { id: 8,  number: 11, name: "Aidan Kowalski",   pos: "LW", shoots: "L", dob: "2011-04-03", active: true,  gp:27, g:14, a:18, pts:32, pim:10, plus:12, line:1, status:"active", captain: true, parent: "Jennifer Kowalski", parentEmail: "jkowalski@email.com" },
  { id: 9,  number: 16, name: "Brody Nystrom",    pos: "C",  shoots: "R", dob: "2011-08-19", active: true,  gp:27, g:18, a:21, pts:39, pim:6,  plus:15, line:1, status:"active", parent: "Mark Nystrom", parentEmail: "mnystrom@email.com" },
  { id: 10, number: 21, name: "Sam Deluca",       pos: "RW", shoots: "R", dob: "2011-06-27", active: true,  gp:26, g:9,  a:14, pts:23, pim:12, plus:7,  line:1, status:"active", parent: "Gary Deluca", parentEmail: "gdeluca@email.com" },
  { id: 11, number: 9,  name: "Owen Park",        pos: "LW", shoots: "L", dob: "2011-12-01", active: true,  gp:27, g:7,  a:10, pts:17, pim:8,  plus:4,  line:2, status:"active", parent: "Amy Park", parentEmail: "apark@email.com" },
  { id: 12, number: 14, name: "Liam Fitzgerald",  pos: "C",  shoots: "L", dob: "2012-01-14", active: true,  gp:25, g:5,  a:9,  pts:14, pim:14, plus:2,  line:2, status:"active", parent: "Pat Fitzgerald", parentEmail: "pfitz@email.com" },
  { id: 13, number: 19, name: "Noah Birnbaum",    pos: "RW", shoots: "R", dob: "2011-10-08", active: true,  gp:24, g:6,  a:7,  pts:13, pim:6,  plus:1,  line:2, status:"active", parent: "Lisa Birnbaum", parentEmail: "lbirnbaum@email.com" },
  { id: 14, number: 6,  name: "Jake Hendricks",   pos: "LW", shoots: "L", dob: "2011-07-07", active: true,  gp:27, g:3,  a:5,  pts:8,  pim:20, plus:-2, line:3, status:"active", parent: "Scott Hendricks", parentEmail: "shendricks@email.com" },
  { id: 15, number: 17, name: "Tyler Osei",       pos: "C",  shoots: "R", dob: "2012-03-22", active: true,  gp:20, g:2,  a:4,  pts:6,  pim:4,  plus:-1, line:3, status:"active", parent: "Eric Osei", parentEmail: "eosei@email.com" },
  { id: 16, number: 23, name: "Cam Lafferty",     pos: "RW", shoots: "R", dob: "2011-11-30", active: true,  gp:18, g:1,  a:3,  pts:4,  pim:6,  plus:-3, line:3, status:"active", parent: "Beth Lafferty", parentEmail: "blafferty@email.com" },
  { id: 17, number: 3,  name: "Marcus Webb",      pos: "D",  shoots: "R", dob: "2012-04-05", active: true,  gp:15, g:0,  a:2,  pts:2,  pim:10, plus:-4, line:3, status:"active", parent: "Don Webb", parentEmail: "dwebb@email.com" },
  { id: 18, number: 25, name: "Eli Sorenson",     pos: "D",  shoots: "L", dob: "2011-09-15", active: true,  gp:12, g:0,  a:1,  pts:1,  pim:6,  plus:-2, line:3, status:"active", parent: "Jan Sorenson", parentEmail: "jsorenson@email.com" },
];

export const STAFF = [
  { id: 101, name: "Tim White",      role: "head_coach",  email: "tim@nomosschema.com",      phone: "734-555-0101" },
  { id: 102, name: "Nick Jordan",    role: "asst_coach",  email: "entropy42@gmail.com",       phone: "734-834-6585" },
  { id: 103, name: "Sarah Mitchell", role: "manager",     email: "sarah.m@biggbyhockey.com", phone: "734-555-0103" },
];

export const SCHEDULE = [
  { id: 1,  date: "2026-04-08", time: "19:00", opponent: "Detroit Honeybaked",     home: true,  type: "regular",  result: null,    rink: "Biggby Ice Cube",        address: "4150 Ann Arbor Rd, Chelsea MI" },
  { id: 2,  date: "2026-04-12", time: "14:00", opponent: "Little Caesars 14U",     home: false, type: "regular",  result: null,    rink: "Little Caesars Arena",   address: "2645 Woodward Ave, Detroit MI" },
  { id: 3,  date: "2026-04-15", time: "18:30", opponent: "Compuware 14U AA",        home: true,  type: "regular",  result: null,    rink: "Biggby Ice Cube",        address: "4150 Ann Arbor Rd, Chelsea MI" },
  { id: 4,  date: "2026-04-19", time: "11:00", opponent: "USNTDP U14",              home: false, type: "showcase", result: null,    rink: "USA Hockey Arena",       address: "14900 Beck Rd, Plymouth MI" },
  { id: 5,  date: "2026-04-05", time: "16:00", opponent: "Oakland Jr Grizzlies",    home: true,  type: "regular",  result: "W 5-2", rink: "Biggby Ice Cube",        address: "4150 Ann Arbor Rd, Chelsea MI" },
  { id: 6,  date: "2026-03-29", time: "13:00", opponent: "Honeybaked 14U",          home: false, type: "regular",  result: "L 2-4", rink: "Troy Sports Center",     address: "3200 E Maple Rd, Troy MI" },
  { id: 7,  date: "2026-03-22", time: "17:00", opponent: "Michigan Wolverines 14U", home: true,  type: "regular",  result: "W 4-1", rink: "Biggby Ice Cube",        address: "4150 Ann Arbor Rd, Chelsea MI" },
  { id: 8,  date: "2026-05-02", time: "09:00", opponent: "MGHL Championship",       home: false, type: "playoff",  result: null,    rink: "Suburban Ice Macomb",    address: "34400 Utica Rd, Fraser MI" },
];

export const PRACTICES = [
  { id: 1, date: "2026-04-07", time: "06:00", duration: 60, rink: "Biggby Ice Cube", focus: "Power Play",              notes: "PP units 1 and 2. Entry patterns. Bring extra pucks." },
  { id: 2, date: "2026-04-09", time: "17:30", duration: 75, rink: "Biggby Ice Cube", focus: "Defensive Zone Coverage", notes: "Battle drills. Full-contact. Dress full." },
  { id: 3, date: "2026-04-14", time: "06:00", duration: 60, rink: "Biggby Ice Cube", focus: "Compete Drills",          notes: "1v1 battles. High intensity." },
];

export const WAVES = [
  { id: 1, from: "Tim White",      role: "head_coach", type: "announcement", content: "Game vs Detroit Honeybaked Tuesday 7pm. Arrive 5:30 for pre-skate prep. Full dress.", ts: "2026-04-06T14:30:00", read: false, priority: true },
  { id: 2, from: "Sarah Mitchell", role: "manager",    type: "logistics",    content: "Jersey numbers 29 and 11 need to pick up sweaters before Tuesday. I'll be at the rink Monday 4-6pm.", ts: "2026-04-06T11:15:00", read: false },
  { id: 3, from: "Tim White",      role: "head_coach", type: "coach",        content: "Practice Monday 6am. Power play focus. Extra sticks on the bench. D-men watch the video I shared.", ts: "2026-04-05T20:00:00", read: true },
  { id: 4, from: "Nick Jordan",    role: "asst_coach", type: "coach",        content: "Film review tonight optional 8pm Zoom. Sending link to all players. Focus on Detroit systems.", ts: "2026-04-05T16:00:00", read: true },
  { id: 5, from: "PARA",           role: "para",       type: "intelligence", content: "Team Pulse: 84/100. Momentum trending up after 5-2 win. 2 players showing fatigue markers. Recommend reduced intensity Monday.", ts: "2026-04-06T08:00:00", read: false },
  { id: 6, from: "Sarah Mitchell", role: "manager",    type: "logistics",    content: "Bus departs for Little Caesars at 11:30am Saturday. Confirm attendance by Thursday.", ts: "2026-04-04T09:00:00", read: true },
  { id: 7, from: "PARA",           role: "para",       type: "intelligence", content: "EMW Moment: Brody Nystrom hit 39 points today. Team high. Great season for #16.", ts: "2026-04-05T21:00:00", read: true },
];

export const STEMS_DATA = {
  sentiment: 78,
  tempo: 85,
  engagement: 82,
  momentum: 91,
  synergy: 74,
};

export const LINES_CONFIG = {
  forwards: [
    { line: 1, lw: 8,  c: 9,  rw: 10 },
    { line: 2, lw: 11, c: 12, rw: 13 },
    { line: 3, lw: 14, c: 15, rw: 16 },
  ],
  defense: [
    { pair: 1, ld: 3,  rd: 4 },
    { pair: 2, ld: 6,  rd: 5 },
    { pair: 3, ld: 18, rd: 17 },
  ],
  goalies: [1, 7],
  pp1: { lw: 8,  c: 9,  rw: 10, ld: 3, rd: 4 },
  pp2: { lw: 11, c: 12, rw: 13, ld: 5, rd: 6 },
  pk1: { f1: 9,  f2: 8,  ld: 3, rd: 4 },
  pk2: { f1: 12, f2: 11, ld: 5, rd: 6 },
};

export const EVALS = {
  9: { skating: 88, compete: 91, hockey_iq: 85, puck_skills: 87, compete_level: 90, strengths: "Elite compete level. Never quits on a play. Strong in battles along the boards.", development: "Work on backdoor reads on PP. Footspeed gap closing in neutral zone.", archetype: "Power Forward", published: true },
  8: { skating: 92, compete: 88, hockey_iq: 90, puck_skills: 94, compete_level: 86, strengths: "Best hands on the team. PP quarterback. Reads plays early. Elite edgework.", development: "Defensive zone positioning. Needs to use speed more consistently in all three zones.", archetype: "Sniper", published: true },
  3: { skating: 80, compete: 85, hockey_iq: 88, puck_skills: 79, compete_level: 87, strengths: "IQ is above his age group. Good first pass. Physical in front of the net.", development: "Skating efficiency. Crossovers. Lateral agility needs dedicated work.", archetype: "Two-Way Defender", published: false },
};

export const FUNDRAISING = {
  goal: 12000,
  raised: 7840,
  campaigns: [
    { id: 1, name: "Spring Tournament Fund",   goal: 5000, raised: 5000, status: "complete" },
    { id: 2, name: "Equipment and Jersey Fund", goal: 4000, raised: 2840, status: "active" },
    { id: 3, name: "Ice Time Reserve",          goal: 3000, raised: 0,    status: "upcoming" },
  ],
};

export const CARPOOL = [
  { id: 1, driver: "Jennifer Kowalski", seats: 3, from: "Plymouth",   to: "Little Caesars Arena", departure: "11:15am", players: [8, 11],    contact: "734-555-0201" },
  { id: 2, driver: "Mark Nystrom",      seats: 2, from: "Ann Arbor",  to: "Little Caesars Arena", departure: "11:30am", players: [9],         contact: "734-555-0202" },
  { id: 3, driver: "Sarah Mitchell",    seats: 4, from: "Canton",     to: "Little Caesars Arena", departure: "11:00am", players: [10, 12, 13], contact: "734-555-0103" },
];

export const getPlayerById    = (id)  => PLAYERS.find(p => p.id === id);
export const getPlayerByNumber = (num) => PLAYERS.find(p => p.number === num);
export const getSkaters = () => PLAYERS.filter(p => p.pos !== "G");
export const getGoalies = () => PLAYERS.filter(p => p.pos === "G");
