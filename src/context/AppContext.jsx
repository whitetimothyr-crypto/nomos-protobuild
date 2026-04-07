import { createContext, useContext, useState } from 'react';
import { WAVES, STEMS_DATA, LINES_CONFIG, PLAYERS, SCHEDULE, PRACTICES, CARPOOL } from '../data/teamData';

const AppContext = createContext(null);

export const ROLES = {
  head_coach: { label: "Head Coach", short: "HC", color: "#3AAEAC", icon: "🏒" },
  asst_coach: { label: "Asst Coach", short: "AC", color: "#C08CFF", icon: "🏒" },
  manager:    { label: "Manager",    short: "MGR", color: "#C9A84C", icon: "📋" },
  parent:     { label: "Parent",     short: "PAR", color: "#4CAF88", icon: "👨‍👩‍👦" },
  player:     { label: "Player",     short: "PLY", color: "#E8E8E0", icon: "⛸️" },
  org_admin:  { label: "Org Admin",  short: "ORG", color: "#A0364E", icon: "🏢" },
};

export function AppProvider({ children }) {
  const [role, setRole]             = useState("head_coach");
  const [activePlayer, setActivePlayer] = useState(9); // Brody for player view
  const [waves, setWaves]           = useState(WAVES);
  const [stems, setStems]           = useState(STEMS_DATA);
  const [lines, setLines]           = useState(LINES_CONFIG);
  const [rsvp, setRsvp]             = useState({});
  const [paraOpen, setParaOpen]     = useState(false);
  const [notifications, setNotifications] = useState(3);

  const markWaveRead = (id) => {
    setWaves(prev => prev.map(w => w.id === id ? { ...w, read: true } : w));
  };

  const sendWave = (content, type = "announcement") => {
    const roleData = ROLES[role];
    const newWave = {
      id: Date.now(),
      from: role === "head_coach" ? "Tim White" : role === "manager" ? "Sarah Mitchell" : "Nick Jordan",
      role,
      type,
      content,
      ts: new Date().toISOString(),
      read: false,
    };
    setWaves(prev => [newWave, ...prev]);
  };

  const updateRsvp = (gameId, playerId, status) => {
    setRsvp(prev => ({ ...prev, [`${gameId}-${playerId}`]: status }));
  };

  const unreadCount = waves.filter(w => !w.read).length;

  return (
    <AppContext.Provider value={{
      role, setRole,
      activePlayer, setActivePlayer,
      waves, markWaveRead, sendWave, unreadCount,
      stems, setStems,
      lines, setLines,
      rsvp, updateRsvp,
      paraOpen, setParaOpen,
      notifications, setNotifications,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
