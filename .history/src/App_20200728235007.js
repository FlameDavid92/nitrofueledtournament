import React, { useState } from 'react';
import GameHelps from './Components/GameHelps';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Player{
  constructor(name, battlePoints, racePoints, favoriteRace){
    this.name = name;
    this.battlePoints = battlePoints;
    this.racePoints = racePoints;
    this.favoriteRace = favoriteRace;
  }
  setName(inputName){
    this.name = inputName;
  }
}


function App() {
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
    setPlayers(Array(parseInt(numGioc)).fill(Player("",0,0,0)));
    return;
  }

  const setNomiPref = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    /*
    let temp = [...players];
    temp.forEach((player,i)=>{
      player.setName();
    });*/
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
                  {players.map((pl, i) => {
                    return (
                      <div key={"input-"+(i+1)} className="mt-2">
                        <input type="text" name={"playerName-" + (i+1)} id={"playerName-" + (i+1)} placeholder={"Nome giocatore " + (i+1)} required></input>
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
        <GameHelps numGioc={numGioc} tipo={tipo}></GameHelps>
      )}

    </div >
  );
}

export default App;
