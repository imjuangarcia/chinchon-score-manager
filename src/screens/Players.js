// Global Imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Players = () => {
  // State
  const [name, setName] = useState('');
  const [players, setPlayers] = useState([]);

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
        <input type="text" placeholder="Nombre aquí" onChange={setPlayerName} />
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