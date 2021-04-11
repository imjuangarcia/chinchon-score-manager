// Global Imports
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Style Import
import '../styles/Globals.module.css';
import ScreenStyles from '../styles/Players.module.css';

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
    <section className={ScreenStyles.Container}>
      <div className={ScreenStyles.TitleContainer}>
        <span className={ScreenStyles.Icon}>🃏</span>
        <h1 className={ScreenStyles.Title}>
          Chinch&oacute;n
        </h1>
        <span className={ScreenStyles.Subtitle}>Anotador</span>
      </div>
      <div className={ScreenStyles.FormContainer}>
        <p>¿Qui&eacute;nes juegan?</p>
        <form onSubmit={savePlayer}>
          <input type="text" placeholder="Nombre aquí" onChange={setPlayerName} required />
          <input type="submit" value="Agregar Jugador" />
        </form>
      </div>
      {players.length > 0 ?
        <div className={ScreenStyles.PlayersContainer}>
          <h2>Jugadores:</h2>
          <ul>
            {
              players.map((player, key) => <li key={key}><h3><span>#{key + 1}</span> {player.name}</h3><p>{player.points} Puntos</p></li>)
            }
          </ul>
          <Link to='/score' onClick={saveToLocalStorage} className={ScreenStyles.StartButton}>Comenzar Juego</Link>
        </div> : ''
      }
    </section>
  );
};

export default Players;