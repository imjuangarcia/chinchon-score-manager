// Global Imports
import React, { useState, useEffect } from 'react';

const Game = () => {
  const [players, setPlayers] = useState([]);

  // Use Effect call to retrieve players
  useEffect(() => {
    const data = window.localStorage.getItem('players');
    setPlayers(JSON.parse(data));
  }, window.localStorage);

  return (
    <section>
      <aside>
        <ul>
          {players && players.map(player => <li><h2>{player.name}</h2><p>{player.points}</p></li>)}
        </ul>
      </aside>
    </section>
  );
};

export default Game;