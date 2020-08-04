import React, { useState } from 'react';
import GameHelps from './Components/GameHelps';
import MyTournament from './Components/MyTournament'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import nitroFueled from './nitrofueled.json';

class Player{
  constructor(name, battlePoints, racePoints, favoriteRace){
    this.name = name;
    this.battlePoints = battlePoints;
    this.trackPoints = trackPoints;
    this.favoriteRace = favoriteRace;
  }
  setName(inputName){
    this.name = inputName;
  }
}


function App() {
  console.log(nitroFueled.battles);
  const [initForm, setInitForm] = useState(true);
  const [initForm2, setInitForm2] = useState(true);
  const [numGioc, setNumGioc] = useState("");
  const [tipo, setTipo] = useState('');
  const [players, setPlayers] = useState([]); 

  const inizializzaTorneo = (e) => {
    e.preventDefault();
    setNumGioc(e.target.numGioc.value);
    setTipo(e.target.tipo.value);
    setInitForm(false);
    return;
  }

  const setNomiPref = (e) => {
    e.preventDefault();
    const temp = Array(parseInt(numGioc)).fill(null);
    temp.forEach((pl,i)=>{
      temp[i] = new Player(e.target[i*2].value,0,0,0);
    });
    setPlayers(temp);
    setInitForm2(false);
  }

  return (
    <div className="container-fluid mt-2">
      {initForm && (
        <div className="row justify-content-center">
          <div className="col-4">
            <form onSubmit={inizializzaTorneo}>
              <div className="form-row text-center">
                <div className="form-group col-12">
                  <label htmlFor="inputState1">Tipologia torneo:</label>
                  <select name="tipo" id="inputState1" className="form-control text-center" defaultValue="" required>
                    <option disabled hidden value="">Scegli il tipo di torneo</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="big">Big</option>
                  </select>
                  <div className="mt-2">
                    <label htmlFor="inputState2">Numero giocatori:</label>
                    <select name="numGioc" id="inputState2" className="form-control text-center" defaultValue="" required>
                      <option disabled hidden value="">Scegli il numero di giocatori</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                  <input className="btn btn-outline-primary mt-2" type="submit" value="Avanti" />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {(!initForm && initForm2) && (
        <div className="row justify-content-center">
          <div className="col-4">
            <form onSubmit={setNomiPref}>
              <div className="form-row text-center">
                <div className="form-group col-12">
                  {Array(parseInt(numGioc)).fill(null).map((pl, i) => {
                    return (
                      <div key={"input-"+(i+1)} className="mt-2">
                        <input type="text" placeholder={"Nome giocatore " + (i+1)} required></input>
                        {/* select da 1 a 40 con nomi gare e foto */}
                        <input type="text" placeholder={"Gara preferita del giocatore " + (i+1)} required></input>
                      </div>)}
                  )}
                  <input className="btn btn-outline-primary mt-2" type="submit" value="Avanti" />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {!initForm2 && (
        <>
        <GameHelps names={players.map((pl)=>pl.name)} numGioc={numGioc} tipo={tipo}></GameHelps>
        <MyTournament battles="" tracks="" prefs={["",""]}>

        </MyTournament>
        </>
      )}

    </div >
  );
}

export default App;
