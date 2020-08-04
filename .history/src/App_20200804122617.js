import React, { useState } from 'react';
import InitForm from './Components/InitForm';
import InitForm2 from './Components/InitForm2';
import GameHelps from './Components/GameHelps';
import MyTournament from './Components/MyTournament';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import nitroFueled from './nitrofueled.json';
import AudioPlayer from './Components/AudioPlayer';

function App() {
  const [initForm, setInitForm] = useState(true);
  const [initForm2, setInitForm2] = useState(true);
  const [numGioc, setNumGioc] = useState(-1);
  const [switchTracks, setSwitchTracks] = useState([]);
  const [tipo, setTipo] = useState('');
  const [players, setPlayers] = useState([]);
  const [audio, setAudio] = useState(false);

  return (
    <div className="container-fluid mt-2">
      {audio && <AudioPlayer />}
      <button onClick={()=>setAudio((prevAudio)=>!prevAudio)} className={"btn btn-sm " + (audio ? "btn-danger" : "btn-success")}>{audio ? "Audio OFF" : "Audio ON"}</button>
      {initForm && (
        <InitForm setNumGioc={setNumGioc} setTipo={setTipo} setInitForm={setInitForm}></InitForm>
      )}
      {(!initForm && initForm2) && (
        <InitForm2 tracks={nitroFueled.tracks} numGioc={numGioc} setPlayers={setPlayers} setInitForm2={setInitForm2}></InitForm2>
      )}
      {!initForm2 && (
        <>
          <GameHelps names={players.map((pl) => pl.name)} numGioc={numGioc} tipo={tipo}></GameHelps>
          <MyTournament tipo={tipo} numGioc={numGioc} battles={nitroFueled.battles} tracks={nitroFueled.tracks} setPlayers={setPlayers} players={players} setSwitchTracks={setSwitchTracks}></MyTournament>
        </>
      )}

    </div >
  );
}

export default App;
