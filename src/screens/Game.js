// Global Imports
import React, { useState, useEffect } from 'react';

const Game = () => {
  const [players, setPlayers] = useState([]);

  // Use Effect call to retrieve players
  useEffect(() => {
    const data = window.localStorage.getItem('players');
    setPlayers(JSON.parse(data));
  }, []);

  // Function to start a new game
  const startNewGame = () => {
    const isNewGame = window.confirm('¿Seguro que deseas comenzar un nuevo partido? Perderás la información guardada hasta el momento.');

    if(isNewGame) {
      window.localStorage.removeItem('players');
      window.location.href = '/';
    }
  }

  // Function to add points
  const addPoints = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    setPlayers(prev => prev.map(selectedPlayer => {
      if(selectedPlayer.name === name) {
        return {
          name: selectedPlayer.name,
          points: parseInt(selectedPlayer.points) + parseInt(value)
        }
      }

      return selectedPlayer;
    }));

    e.target.value = 0;
  }

  return (
    <section>
      <h1>Puntaje:</h1>
      <ul>
        {players && players.map((player, key) => <li key={key}><h2>{player.name}</h2><p>{player.points}</p></li>)}
      </ul>
      <div>
        <h3>Anotar Puntos</h3>
        <form>
          {players.map((player, key) =>
            <fieldset key={key}>
              <label htmlFor={player.name}>¿Cu&aacute;ntos puntos sum&oacute; {player.name}?</label>
              <input type="number" name={player.name} onBlur={addPoints} defaultValue="0" />
            </fieldset>
          )}
        </form>
      </div>
      <button onClick={startNewGame}>Nuevo Juego</button>
    </section>
  );
};

export default Game;