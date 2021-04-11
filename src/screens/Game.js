// Global Imports
import React, { useState, useEffect } from 'react';

const Game = () => {
  const [players, setPlayers] = useState([]);
  const [isScoreVisible, setIsScoreVisible] = useState(false);

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
  }

  // Function to save the data to localStorage
  const updatePlayers = (e) => {
    e.preventDefault();
    window.localStorage.setItem('players', JSON.stringify(players));
    e.target.reset();
    setIsScoreVisible(false);
  }

  return (
    <section>
      <h1>Puntaje:</h1>
      <ul>
        {players && players.map((player, key) => <li key={key}><h2>{player.name}</h2><p>{player.points}</p></li>)}
      </ul>
      {isScoreVisible &&
        <div>
          <h3>Anotar Puntos</h3>
          <form onSubmit={updatePlayers}>
            {players.map((player, key) =>
              <fieldset key={key}>
                <label htmlFor={player.name}>¿Cu&aacute;ntos puntos sum&oacute; {player.name}?</label>
                <input type="number" name={player.name} onBlur={addPoints} defaultValue="0" />
              </fieldset>
            )}
            <input type="submit" value="Anotar" />
          </form>
        </div>
      }
      <div>
        <button onClick={() => setIsScoreVisible(true)}>Anotar Puntos</button>
        <button onClick={startNewGame}>Nuevo Juego</button>
      </div>
    </section>
  );
};

export default Game;