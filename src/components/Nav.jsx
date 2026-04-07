import { useApp, ROLES } from '../context/AppContext';

const navItems = {
  head_coach: [
    { key: "corner",   label: "Corner",   icon: "🏒" },
    { key: "lines",    label: "Lines",    icon: "📋" },
    { key: "waves",    label: "Waves",    icon: "〰️" },
    { key: "roster",   label: "Roster",   icon: "👥" },
    { key: "gameday",  label: "GameDay",  icon: "🎮" },
  ],
  asst_coach: [
    { key: "corner",   label: "Corner",   icon: "🏒" },
    { key: "lines",    label: "Lines",    icon: "📋" },
    { key: "waves",    label: "Waves",    icon: "〰️" },
    { key: "roster",   label: "Roster",   icon: "👥" },
  ],
  manager: [
    { key: "hub",      label: "Hub",      icon: "📋" },
    { key: "schedule", label: "Schedule", icon: "📅" },
    { key: "waves",    label: "Waves",    icon: "〰️" },
    { key: "carpool",  label: "Carpool",  icon: "🚗" },
    { key: "finance",  label: "Finance",  icon: "💰" },
  ],
  parent: [
    { key: "home",     label: "Home",     icon: "🏠" },
    { key: "schedule", label: "Schedule", icon: "📅" },
    { key: "waves",    label: "Waves",    icon: "〰️" },
    { key: "carpool",  label: "Carpool",  icon: "🚗" },
    { key: "emw",      label: "EMW",      icon: "✨" },
  ],
  player: [
    { key: "home",     label: "Home",     icon: "⛸️" },
    { key: "stats",    label: "Stats",    icon: "📊" },
    { key: "waves",    label: "Waves",    icon: "〰️" },
    { key: "music",    label: "Music",    icon: "🎵" },
    { key: "evals",    label: "Evals",    icon: "📈" },
  ],
  org_admin: [
    { key: "dashboard", label: "Dash",    icon: "🏢" },
    { key: "teams",     label: "Teams",   icon: "👥" },
    { key: "waves",     label: "Waves",   icon: "〰️" },
    { key: "finance",   label: "Finance", icon: "💰" },
    { key: "compliance",label: "Comply",  icon: "✅" },
  ],
};

export default function Nav({ activeTab, setActiveTab }) {
  const { role, unreadCount, setParaOpen } = useApp();
  const items = navItems[role] || navItems.head_coach;

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'rgba(8,8,16,0.95)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '4px 8px 8px',
      zIndex: 100,
      maxWidth: 430,
      margin: '0 auto',
    }}>
      {items.map(item => (
        <button
          key={item.key}
          className={`nav-tab ${activeTab === item.key ? 'active' : ''}`}
          onClick={() => setActiveTab(item.key)}
          style={{ position: 'relative' }}
        >
          <span style={{ fontSize: 20 }}>{item.icon}</span>
          <span>{item.label}</span>
          {item.key === 'waves' && unreadCount > 0 && (
            <span style={{
              position: 'absolute', top: 4, right: 8,
              background: 'var(--danger)',
              color: 'white', borderRadius: '50%',
              width: 16, height: 16,
              fontSize: 10, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{unreadCount}</span>
          )}
        </button>
      ))}
      <button
        className="nav-tab"
        onClick={() => setParaOpen(true)}
        style={{ color: 'var(--stats)' }}
      >
        <span style={{ fontSize: 20 }}>🤖</span>
        <span>PARA</span>
      </button>
    </nav>
  );
}
