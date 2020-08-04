import React, { useState } from 'react';
import InitForm from './Components/InitForm';
import InitForm2 from './Components/InitForm2';
import GameHelps from './Components/GameHelps';
import MyTournament from './Components/MyTournament';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import nitroFueled from './nitrofueled.json';

function App() {
  const [initForm, setInitForm] = useState(true);
  const [initForm2, setInitForm2] = useState(true);
  const [numGioc, setNumGioc] = useState(-1);
  const [tipo, setTipo] = useState('');
  const [players, setPlayers] = useState([]);

  return (
    <div className="container-fluid mt-2">
      {initForm && (
        <InitForm setNumGioc={setNumGioc} setTipo={setTipo} setInitForm={setInitForm}></InitForm>
      )}
      {(!initForm && initForm2) && (
        <InitForm2 tracks={nitroFueled.tracks} numGioc={numGioc} setPlayers={setPlayers} setInitForm2={setInitForm2}></InitForm2>
      )}
      {!initForm2 && (
        <>
        <GameHelps names={players.map((pl) => pl.name)} numGioc={numGioc} tipo={tipo}></GameHelps>
        <MyTournament tipo={tipo} numGioc={numGioc} battles={nitroFueled.battles} tracks={nitroFueled.tracks} setPlayers={setPlayers} players={players}></MyTournament>
        </>
      )}

    </div >
  );
}

export default App;
