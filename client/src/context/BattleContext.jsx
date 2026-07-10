import React, { createContext, useContext, useState, useEffect } from "react";

const BattleContext = createContext(null);

export function BattleProvider({ children }) {
  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    // Read the active live session cached from the socket pool handler
    const stored = sessionStorage.getItem("activeMatchRoom");
    if (stored) {
      setMatchData(JSON.parse(stored));
    }
  }, []);

  return (
    <BattleContext.Provider value={{ matchData, setMatchData }}>
      {children}
    </BattleContext.Provider>
  );
}

export const useBattle = () => useContext(BattleContext);