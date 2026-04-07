import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Nav from './components/Nav';
import PARAOverlay from './components/PARAOverlay';
import Waves from './components/Waves';
import CoachCorner from './views/CoachCorner';
import LineBuilder from './views/LineBuilder';
import Roster from './views/Roster';
import GameDay from './views/GameDay';
import ParentHome from './views/ParentHome';
import EMW from './views/EMW';
import PlayerHome from './views/PlayerHome';
import ManagerHub from './views/ManagerHub';
import OrgDashboard from './views/OrgDashboard';

const ROLE_DEFAULTS = {
  head_coach: 'corner',
  asst_coach: 'corner',
  manager: 'hub',
  parent: 'home',
  player: 'home',
  org_admin: 'dashboard',
};

const TAB_TITLES = {
  corner: "Coach's Corner", lines: 'Line Builder', waves: 'Waves',
  roster: 'Roster', gameday: 'GameDay', hub: 'Manager Hub',
  home: 'Home', stats: 'My Stats', music: 'Music', evals: 'My Evals',
  emw: 'Every Moment Witnessed', dashboard: 'Org Dashboard',
  schedule: 'Schedule', carpool: 'Carpool', finance: 'Finance',
};

function AppContent() {
  const { role, setRole } = useApp();
  const [tab, setTab] = useState(ROLE_DEFAULTS[role]);

  const handleTabChange = (newTab) => setTab(newTab);

  const renderView = () => {
    if (tab === 'waves') return <Waves />;
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

  // When role changes via Header, reset tab
  const wrappedSetRole = (newRole) => {
    setRole(newRole);
    setTab(ROLE_DEFAULTS[newRole] || 'corner');
  };

  return (
    <div style={{ maxWidth: 430, margin: '0 auto', minHeight: '100vh', background: 'var(--bg)' }}>
      <Header title={TAB_TITLES[tab] || ''} onRoleChange={wrappedSetRole} />
      <main>{renderView()}</main>
      <Nav activeTab={tab} setActiveTab={handleTabChange} />
      <PARAOverlay />
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
