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
    checkScore();
  }

  // Function to reduce score by ten
  const reducePointsByTen = (e) => {
    e.preventDefault();
    
    const previousElement = e.target.previousElementSibling;
    // Simulate focus and blur events to trigger the change
    previousElement.focus();
    previousElement.value = -10;
    previousElement.blur();
  }

  // Function to check if the score reached 100
  const checkScore = () => {

    // Check if any of the players reached 100 points
    players.map(player => {
      if(player.points >= 100) {
        // If so, show an alert and trigger a new game
        const isGameFinished = window.confirm(`El jugador ${player.name} ha perdido! Jugar la revancha?`)
        
        if(isGameFinished) {
          // Reset points
          setPlayers(prev => prev.map(selectedPlayer => {
            return {
              name: selectedPlayer.name,
              points: 0
            }
          }));
        } else {
          // If they didn't want to play a new game
          window.localStorage.removeItem('players');
          window.location.href = '/';
        }
      }
    });
  }

  // Function to run when someone does chinchon
  const setWinner = (e) => {
    e.preventDefault();

    // Get the winner
    const winner = e.target.dataset.player;
    const isGameFinished = window.confirm(`El jugador ${winner} ha ganado! Jugar la revancha?`);

    if(isGameFinished) {
      // Reset points
      setPlayers(prev => prev.map(selectedPlayer => {
        return {
          name: selectedPlayer.name,
          points: 0
        }
      }));
      
      setIsScoreVisible(false);
    } else {
      // If they didn't want to play a new game
      window.localStorage.removeItem('players');
      window.location.href = '/';
    }
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
                <button onClick={reducePointsByTen} data-player={player.name}>-10</button>
                <button onClick={setWinner} data-player={player.name}>Chinch&oacute;n</button>
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