import React, { useState } from 'react';

export default function PointsManager({end, players, setPlayers, currentGameId, setCurrentGameId, myTournament }) {
    const [endGame, setEndGame] = useState(false);
    const inserisciPunti = (e) => {
        e.preventDefault();
        let tempPlayers = [...players];
        tempPlayers.forEach((pl, i) => {
            if(myTournament[currentGameId].type === 'battle'){
                pl.addBattlePoints(parseInt(e.target[i].value));
                console.log(e.target[i].value);
            }else{
                pl.addTrackPoints(parseInt(e.target[i].value));
            }
        });
        myTournament[currentGameId].state = 'complete';
        setPlayers(tempPlayers);
        if (currentGameId === (end-1)) {
            setEndGame(true);
        }
        setCurrentGameId(currentGameId + 1);
        e.target.reset();
    }
    return (
        <>
            {!endGame ? (

                <div className="row">
                    <div className="col-12">
                        <form onSubmit={inserisciPunti}>
                            <div className="form-row text-center">
                                <div className="form-group col-12">
                                    {
                                        players.map((pl, i) => {
                                            return (
                                                <div key={"pt-pl-" + i}>
                                                    <label htmlFor={"pt-pl-" + i}>{pl.name}:</label>
                                                    <select name="tipo" id={"pt-pl-" + i} className="form-control text-center" defaultValue="" required>
                                                        <option disabled hidden value="">---Posizione---</option>
                                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((el,i) => <option key={"opt-"+i} value={el}>{el+sup(a)}</option>)}
                                                    </select>
                                                </div>)
                                        })
                                    }
                                    <input className="btn btn-outline-primary mt-2" type="submit" value="Inserisci punti" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            ):<>
            {players.map((pl,i)=>{
                return <p key={"end-"+i} className="h4">{pl.name +" => "}<span className="h5">TOT: {pl.getTotalPoints()}<br/>BT: {pl.battlePoints}<br/>GR: {pl.trackPoints}</span></p>
            })}
            </>}
        </>
    )
}