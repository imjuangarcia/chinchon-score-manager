// Global Imports
import React, { useState, useEffect } from 'react';

const Game = () => {
  const [players, setPlayers] = useState([]);

  // Use Effect call to retrieve players
  useEffect(() => {
    const data = window.localStorage.getItem('players');
    setPlayers(JSON.parse(data));
  }, [window.localStorage]);

  // Function to start a new game
  const startNewGame = () => {
    const isNewGame = window.confirm('¿Seguro que deseas comenzar un nuevo partido? Perderás la información guardada hasta el momento.');

    if(isNewGame) {
      window.localStorage.removeItem('players');
      window.location.href = '/';
    }
  }

  return (
    <section>
      <aside>
        <ul>
          {players && players.map((player, key) => <li key={key}><h2>{player.name}</h2><p>{player.points}</p></li>)}
        </ul>
      </aside>
      <article>
        <button onClick={startNewGame}>Start a new game</button>
      </article>
    </section>
  );
};

export default Game;