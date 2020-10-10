import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function MyModal2({ clicksModal2, title, players, setPlayers, myTournament, setMyTournament, pointsChangeId}) {
    const divModale = document.getElementById('divModale');
    const [opened, setOpened] = useState(false);

    const closeModal = () => {
        setOpened(false);
    }

    useEffect(() => {
        clicksModal2 && setOpened(true);
    }, [clicksModal2]);

    const cambiaPunti = (e) => {
        e.preventDefault();
        /*console.log("gameToChange", myTournament[pointsChangeId]);*/
        
        /*console.log("myTournament before:",myTournament);*/
        let prevPoints = myTournament[pointsChangeId].points;
        let newPoints = players.map((pl, i) => parseInt(e.target[i].value));
        /*console.log("newPoints",newPoints);*/
        setMyTournament([
            ...myTournament.slice(0, pointsChangeId),
            {...myTournament[pointsChangeId], points: newPoints, state: "complete"},
            ...myTournament.slice(pointsChangeId+1)
        ]);
        /*console.log("myTournament after:",myTournament);*/
        

        let tempPlayers = [...players];
        /*console.log("templPlayers before:",tempPlayers);*/
        tempPlayers.forEach((pl, i) => {
            if (myTournament[pointsChangeId].type === 'battle') {
                pl.battlePoints = (pl.battlePoints - prevPoints[i]) + newPoints[i];
            }else if (myTournament[pointsChangeId].type === 'track' || myTournament[pointsChangeId].type === 'favorite') {
                pl.trackPoints = (pl.trackPoints - prevPoints[i]) + newPoints[i];
            }
        })
        setPlayers(tempPlayers);
        /*console.log("templPlayers after:",tempPlayers);*/

        closeModal();
    }

    return createPortal(
        <>
            {opened && (
                <div className="containermodale">
                    <div className="shadow modale">
                        <div className="row justify-content-between m-0 p-1">
                            <div className="h3 text-uppercase">{title}</div>
                            <button onClick={closeModal} className="btn btn-sm btn-danger rounded p-1 h-50">X</button>
                        </div>
                        <hr className="separator m-0"></hr>
                        <div className="form-row justify-content-center w-100 m-0">
                            <div className="h6 text-uppercase">{`${myTournament[pointsChangeId].index}. ${myTournament[pointsChangeId].name} - ${((myTournament[pointsChangeId].type === 'battle') ? 'BATTAGLIA' : ((myTournament[pointsChangeId].type === 'favorite') ? 'PREFERITA' : 'GARA'))}`}</div>
                            <div className="col-12">
                                <form onSubmit={cambiaPunti}>
                                    <div className="form-group">
                                        {players.map((pl, i) => {
                                            return (
                                                <div key={"modal2-pt-pl-" + i}>
                                                    <label className="mb-1" htmlFor={"modal2-pt-pl-" + i}>{pl.name}:</label>
                                                    <select name="tipo" id={"modal2-pt-pl-" + i} className="form-control text-center mb-2" defaultValue="" required>
                                                        <option disabled hidden value="">---Posizione---</option>
                                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((el, i) => <option key={"modal2-opt-" + i} value={el}>{el}&#x2090;</option>)}
                                                    </select>
                                                </div>)
                                        })}
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control btn btn-outline-primary mt-2" type="submit" value="Inserisci punti" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>, divModale
    )
}