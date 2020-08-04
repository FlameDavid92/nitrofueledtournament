import React, { useState } from 'react';
import InitForm from './Components/InitForm';
import InitForm2 from './Components/InitForm2';
import GameHelps from './Components/GameHelps';
import MyTournament from './Components/MyTournament';
import MyImgs from './Components/MyImgs';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import nitroFueled from './nitrofueled.json';

function App() {
  const [initForm, setInitForm] = useState(true);
  const [initForm2, setInitForm2] = useState(true);
  const [numGioc, setNumGioc] = useState("");
  const [tipo, setTipo] = useState('');
  const [players, setPlayers] = useState([]);
  const [favoriteTracks, setFavoriteTracks] = useState([]);

  return (
    <div className="container-fluid mt-2">
      {initForm && (
        <InitForm setNumGioc={setNumGioc} setTipo={setTipo} setFavoriteTracks={setFavoriteTracks} setInitForm={setInitForm}></InitForm>
      )}
      {(!initForm && initForm2) && (
        <InitForm2 tracks={nitroFueled.tracks} numGioc={numGioc} setPlayers={setPlayers} favoriteTracks={favoriteTracks} setFavoriteTracks={setFavoriteTracks} setInitForm2={setInitForm2}></InitForm2>
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
