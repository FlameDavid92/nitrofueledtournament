import React, { useState } from 'react';
import InitForm from './Components/InitForm';
import InitForm2 from './Components/InitForm2';
import MyTournament from './Components/MyTournament';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import nitroFueled from './nitrofueled.json';
import smoothscroll from 'smoothscroll-polyfill';


function App() {
  const [initForm, setInitForm] = useState(true);
  const [initForm2, setInitForm2] = useState(true);
  const [tournamentName, setTournamentName] = useState("");
  const [load, setLoad] = useState(false);
  const [numGioc, setNumGioc] = useState(-1);
  const [tipo, setTipo] = useState('');
  const [players, setPlayers] = useState([]);
  const [audio, setAudio] = useState(false);

  const goToHome = () => {
        setLoad(false);
        setInitForm(true);
        setInitForm2(true);
        setAudio(false);
        setTournamentName("");
  }
  
  // kick off the polyfill!
  smoothscroll.polyfill();

  return (
    <>
      <div id="divModale" />
      <div className="container">
        {audio && <audio src="./audio/theme.mp3" autoPlay loop/>}
        {<button onClick={() => setAudio((prevAudio) => !prevAudio)} className={"btn btn-sm " + (audio ? "btn-danger my-btn-audio-off" : "btn-success my-btn-audio-on")}>{audio ? "Audio OFF" : "Audio ON"}</button>}
        {(tournamentName !== "") && <span className="ml-2">{tournamentName}</span>}
        {initForm && (
          <InitForm setLoad={setLoad} setTournamentName={setTournamentName} setNumGioc={setNumGioc} setTipo={setTipo} setInitForm={setInitForm} setInitForm2={setInitForm2} setAudio={setAudio}></InitForm>
        )}
        {(!initForm && initForm2) && (
          <InitForm2 tracks={nitroFueled.tracks} numGioc={numGioc} setPlayers={setPlayers} setInitForm2={setInitForm2}></InitForm2>
        )}
        {!initForm2 && (
          <>
            <MyTournament goToHome={goToHome} setAudio={setAudio} setInitForm={setInitForm} setInitForm2={setInitForm2} setTournamentName={setTournamentName} setNumGioc={setNumGioc} setTipo={setTipo} tournamentName={tournamentName} load={load} tipo={tipo} numGioc={numGioc} battles={nitroFueled.battles} tracks={nitroFueled.tracks} setPlayers={setPlayers} players={players}></MyTournament>
          </>
        )}
      </div >
    </>
  );
}

export default App;
