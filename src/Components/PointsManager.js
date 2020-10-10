import React from 'react';
import * as util from '../utils.js';

export default function PointsManager({end, players, setPlayers, currentGameId, setCurrentGameId, myTournament, setMyTournament, endGame, setEndGame, openModalTempoPoints }) {
    const inserisciPunti = (e) => {
        e.preventDefault();
        let tempPlayers = [...players];
        let temp = myTournament.map((pl, i) => {
            return (parseInt(pl.index) === (parseInt(currentGameId) + 1)) ? { ...myTournament[currentGameId], state: "complete", points: tempPlayers.map((pl, i) => (parseInt(e.target[i].value))) } : pl
        });
        setMyTournament(temp);

        tempPlayers.forEach((pl, i) => {
            if (myTournament[currentGameId].type === 'battle') {
                pl.addBattlePoints(parseInt(e.target[i].value));
            } else {
                pl.addTrackPoints(parseInt(e.target[i].value));
            }
        });

        setPlayers(tempPlayers);
        if (currentGameId === (end - 1)) {
            setEndGame(true);
        }
        setCurrentGameId(currentGameId + 1);
        e.target.reset();
    }
    return (
        <div className="row justify-content-center">
            <div className="col-12">
                {!endGame ? (
                    <>
                        <form onSubmit={inserisciPunti}>
                            <div className="form-row text-center">
                                {
                                    players.map((pl, i) => {
                                        return (
                                            <div key={pl.name} className="form-group col-6 mb-0">
                                                <div key={"pt-pl-" + i}>
                                                    <label htmlFor={"pt-pl-" + i} className="player">{pl.name}:</label>
                                                    <select name="tipo" id={"pt-pl-" + i} className="form-control text-center" defaultValue="" required>
                                                        <option disabled hidden value="">---Posizione---</option>
                                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((el, i) => <option key={"opt-" + i} value={el}>{el}&#x2090;</option>)}
                                                    </select>
                                                </div>
                                            </div>)
                                    })
                                }
                                <div className="form-group col-12 w-75 mt-2">
                                    <input className={"btn w-100" + ((currentGameId === (end - 1)) ? " btn-danger" : " btn-secondary")} type="submit" value={(currentGameId === (end - 1)) ? "Concludi partita" : "Inserisci punti"} />
                                </div>
                            </div>
                        </form>
                    </>
                ) : <>
                        <div className="row align-items-center">
                            {
                                util.getWinner(players).split(';').map((el, i) => <div className="col-12 col-md-6 mb-2" key={'w' + i}><h4 className="my-color-black">{el}</h4></div>)
                            }
                        </div>
                        <div className="row align-items-center">
                            {
                                util.getBtWinner(players).split(';').map((el, i) => <div className="col-12 col-md-6 mb-2" key={'wb' + i}><h4 className="my-color-black">{el}</h4></div>)
                            }
                        </div>
                        <div className="row align-items-center">
                            {
                                util.getTrWinner(players).split(';').map((el, i) => <div className="col-12 col-md-6 mb-2" key={'wt' + i}><h4 className="my-color-black">{el}</h4></div>)
                            }
                        </div>
                    </>
                }
                <div className="">
                    <button onClick={openModalTempoPoints} className={"btn w-100 mb-3" + ((end === currentGameId) ? " btn-success" : " btn-secondary")}>{(end === currentGameId) ? "Punteggi finali" : "Punteggi parziali"}</button>
                </div>
            </div>
        </div>
    )
}