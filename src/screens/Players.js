// Global Imports
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Players = () => {
  // State
  const [name, setName] = useState('');
  const [players, setPlayers] = useState([]);

  // Use Effect call to check for existent players
  useEffect(() => {
    const data = window.localStorage.getItem('players');
    
    if(data !== null) {
      const retrieveOldPlayers = window.confirm(`Hemos encontrado un juego en curso: ${JSON.parse(data).map(player => `${player.name}: ${player.points} puntos`)}. ¿Quieres seguir jugándolo?`);
      
      if(retrieveOldPlayers) {
        window.location.href = '/score';
      } else {
        window.localStorage.removeItem('players');
      }
    }
  }, []);

  // Store the player name on input change
  const setPlayerName = (e) => {
    setName(e.target.value);
  }

  // Function to save the player
  const savePlayer = (e) => {
    e.preventDefault();
    
    setPlayers([...players, {
      name,
      points: 0,
    }]);

    e.target.reset();
  }

  // Function to save data to localStorage
  const saveToLocalStorage = () => {
    window.localStorage.setItem('players', JSON.stringify(players));
  }

  return (
    <section>
      <h1>Chinch&oacute;n Score</h1>
      <p>¿Qui&eacute;nes juegan?</p>
      <form onSubmit={savePlayer}>
        <input type="text" placeholder="Nombre aquí" onChange={setPlayerName} required />
        <input type="submit" value="Agregar" />
      </form>
      <div>
        <h2>Jugadores:</h2>
        <ul>
          {players &&
            players.map((player, key) => <li key={key}><h3>{player.name}</h3><p>Puntos: {player.points}</p></li>)
          }
        </ul>
      </div>
      <Link to='/score' onClick={saveToLocalStorage}>Comenzar Juego</Link>
    </section>
  );
};

export default Players;