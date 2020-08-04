import React, { useState } from 'react';
import InitForm from './Components/InitForm';
import InitForm2 from './Components/InitForm2';
import GameHelps from './Components/GameHelps';
import MyTournament from './Components/MyTournament';
import MyImgs from './Components/MyImgs';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import nitroFueled from './nitrofueled.json';

class Player {
  constructor(name, battlePoints, trackPoints) {
    this.name = name;
    this.battlePoints = battlePoints;
    this.trackPoints = trackPoints;
  }
  setName(inputName) {
    this.name = inputName;
  }
}


function App() {
  const [initForm, setInitForm] = useState(true);
  const [initForm2, setInitForm2] = useState(true);
  const [numGioc, setNumGioc] = useState("");
  const [tipo, setTipo] = useState('');
  const [players, setPlayers] = useState([]);
  const [favoriteTracks, setFavoriteTracks] = useState([]);

  const setNomiPref = (e) => {
    e.preventDefault();
    const tempPlayers = Array(numGioc).fill(null);
    const tempFavs = Array(numGioc).fill(null);
    tempPlayers.forEach((pl, i) => {
      tempPlayers[i] = new Player(e.target[i * 2].value, 0, 0, 0);
      tempFavs[i] = e.target[(i * 2) + 1].value;
    });
    setPlayers(tempPlayers);
    setFavoriteTracks(tempFavs);
    setInitForm2(false);
  }

  const changeFavorite = (e,index) => {
    favoriteTracks[index] = e.target.value;
    setFavoriteTracks([...favoriteTracks]);
  }

  return (
    <div className="container-fluid mt-2">
      {initForm && (
        <InitForm setNumGioc={setNumGioc} setTipo={setTipo} setFavoriteTracks={setFavoriteTracks} setInitForm={setInitForm}></InitForm>
      )}
      {(!initForm && initForm2) && (
        <InitForm2></InitForm2>
      )}
      {!initForm2 && (
        <>
          <GameHelps names={players.map((pl) => pl.name)} numGioc={numGioc} tipo={tipo}></GameHelps>
        </>
      )}

    </div >
  );
}

export default App;
