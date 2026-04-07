import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Nav from './components/Nav';
import PARAOverlay from './components/PARAOverlay';
import Feed from './views/Feed';
import CoachCorner from './views/CoachCorner';
import LineBuilder from './views/LineBuilder';
import Roster from './views/Roster';
import GameDay from './views/GameDay';
import ParentHome from './views/ParentHome';
import EMW from './views/EMW';
import PlayerHome from './views/PlayerHome';
import ManagerHub from './views/ManagerHub';
import OrgDashboard from './views/OrgDashboard';
import SafeReport from './views/SafeReport';
import CalendarSync from './views/CalendarSync';
import MusicHub from './views/MusicHub';

const ROLE_DEFAULTS = {
  head_coach: 'corner', asst_coach: 'corner',
  manager: 'hub', parent: 'home',
  player: 'home', org_admin: 'dashboard',
};

const TAB_TITLES = {
  corner: "Coach's Corner", lines: 'Line Builder', feed: 'Feed',
  roster: 'Roster', gameday: 'GameDay', hub: 'Manager Hub',
  home: 'Home', stats: 'My Stats', music: 'Music', evals: 'My Evals',
  emw: 'Every Moment Witnessed', dashboard: 'Org Dashboard',
  schedule: 'Schedule', carpool: 'Carpool', finance: 'Finance',
  safe_report: 'Safe Report', calendar: 'Calendar Sync',
};

function AppContent() {
  const { role, setRole } = useApp();
  const [tab, setTab] = useState(ROLE_DEFAULTS[role]);

  const wrappedSetRole = (newRole) => {
    setRole(newRole);
    setTab(ROLE_DEFAULTS[newRole] || 'corner');
  };

  const renderView = () => {
    if (tab === 'feed')        return <Feed />;
    if (tab === 'safe_report') return <SafeReport />;
    if (tab === 'calendar')    return <CalendarSync />;
    if (tab === 'music')       return <MusicHub />;

    switch (role) {
      case 'head_coach':
      case 'asst_coach':
        if (tab === 'lines')   return <LineBuilder />;
        if (tab === 'roster')  return <Roster />;
        if (tab === 'gameday') return <GameDay />;
        return <CoachCorner />;
      case 'manager':
        return <ManagerHub />;
      case 'parent':
        if (tab === 'emw') return <EMW />;
        return <ParentHome />;
      case 'player':
        return <PlayerHome />;
      case 'org_admin':
        return <OrgDashboard />;
      default:
        return <CoachCorner />;
    }
  };

  return (
    <div style={{ maxWidth: 430, margin: '0 auto', minHeight: '100vh', background: 'var(--bg)' }}>
      <Header title={TAB_TITLES[tab] || ''} onRoleChange={wrappedSetRole} />
      <main>{renderView()}</main>
      <Nav activeTab={tab} setActiveTab={setTab} />
      <PARAOverlay />

      {/* Global safe report access - bottom left FAB */}
      <button
        onClick={() => setTab('safe_report')}
        title="Safe Report"
        style={{
          position: 'fixed', bottom: 90, left: 16,
          width: 40, height: 40, borderRadius: '50%',
          background: 'var(--danger-dim)', border: '1px solid var(--danger)40',
          fontSize: 16, cursor: 'pointer', zIndex: 99,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>🛡️</button>

      {/* Calendar sync access */}
      <button
        onClick={() => setTab('calendar')}
        title="Calendar Sync"
        style={{
          position: 'fixed', bottom: 140, left: 16,
          width: 40, height: 40, borderRadius: '50%',
          background: 'var(--surface2)', border: '1px solid var(--border)',
          fontSize: 16, cursor: 'pointer', zIndex: 99,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>📅</button>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
