import React, { useEffect, useState } from 'react';
import PointsManager from './PointsManager';
import { getRandomInt, shuffle } from '../utils';
import './mytournament.css';

export default function MyTournament({ tipo, numGioc, battles, tracks, players, setPlayers, setSwitchTracks}) {
    const [currentGameId, setCurrentGameId] = useState(0);
    const numPref = numGioc;
    const numBattles = (tipo === 'small') ? 2 : ((tipo === 'medium') ? 3 : 4);
    const numTracks = (tipo === 'small') ? 3 : ((tipo === 'medium') ? 6 : 9);
    const end = numPref + numBattles + numTracks;

    const getWinner = () => {
        let tempWinners = [];
        let tempPts = Number.POSITIVE_INFINITY;
        players.forEach(pl=>{
            let plTot = pl.getTotalPoints();
            if( plTot < tempPts ){
                tempPts = pl.getTotalPoints();
                tempWinners = [pl.name];
            }else if( plTot === tempPts){
                tempWinners.push(pl.name);
            }
        });
        if(tempWinners.length > 1){
            let winners = "";
            tempWinners.forEach(w=>winners+= (w+" "));
            return "Torneo concluso in parità, i vincitori sono: "+winners;
        }else{
            return "Vince il torneo: "+tempWinners[0];
        }
    };
    const getBtWinner = () => {
        let tempWinners = [];
        let tempPts = Number.POSITIVE_INFINITY;
        players.forEach(pl=>{
            let plTot = pl.battlePoints;
            if( plTot < tempPts ){
                tempPts = pl.battlePoints;
                tempWinners = [pl.name];
            }else if( plTot === tempPts){
                tempWinners.push(pl.name);
            }
        });
        if(tempWinners.length > 1){
            let winners = "";
            tempWinners.forEach(w=>winners+= (w+" "));
            return "Premio battaglia in parità, i vincitori sono: "+winners;
        }else{
            return "Vince il premio battaglia: "+tempWinners[0];
        }
    };
    const getTrWinner = () => {
        let tempWinners = [];
        let tempPts = Number.POSITIVE_INFINITY;
        players.forEach(pl=>{
            let plTot = pl.trackPoints;
            if( plTot < tempPts ){
                tempPts = pl.trackPoints;
                tempWinners = [pl.name];
            }else if( plTot === tempPts){
                tempWinners.push(pl.name);
            }
        });
        if(tempWinners.length > 1){
            let winners = "";
            tempWinners.forEach(w=>winners+= (w+" "));
            return "Premio gara in parità, i vincitori sono: "+winners;
        }else{
            return "Vince il premio gara: "+tempWinners[0];
        }
    };

    useEffect(() => {
        let tempBattles = [...battles];
        tempBattles.shift();
        console.log(tempBattles);
        let tempTracks = [...tracks];
        tempTracks.shift();
        let randomPref = players.map(pl => { return { num: pl.favoriteTrack.id, name: pl.favoriteTrack.name, player: pl.name } });
        shuffle(randomPref);

        const addBattle = (battles, i) => {
            console.log("battaglia random - " + tipo);
            let intBattle = getRandomInt(0, battles.length);
            let choice = battles[intBattle];
            battles.splice(intBattle, 1);
            return { index: i + 1, num: choice.id, name: choice.name, type: 'battle', state: 'uncomplete', points: Array(numGioc).fill(null) };
        }

        const addTrack = (tracks, i) => {
            console.log("gara random - " + tipo);
            let intTrack = getRandomInt(0, tracks.length);
            let choice = tracks[intTrack];
            tracks.splice(intTrack, 1);
            return { index: i + 1, num: choice.id, name: choice.name, type: 'track', state: 'uncomplete', points: Array(numGioc).fill(null) };
        }

        const addPref = (randomPref, i) => {
            console.log("preferita - " + tipo);
            const pref = randomPref.pop();
            return { index: i + 1, num: pref.num, name: pref.name + " [" + pref.player + "]", type: 'favorite', state: 'uncomplete', points: Array(numGioc).fill(null) };
        }

        setMyTournament(Array(end).fill(null).map((el, i) => {
            if (tipo === 'small') {
                if (i === 0) {
                    return addBattle(tempBattles, i);
                } else if (i > 0 && i <= 3) {
                    return addTrack(tempTracks, i);
                } else if (i > 3 && i <= 3 + numPref) {
                    return addPref(randomPref, i);
                } else {
                    setSwitchTracks(tempTracks);
                    return addBattle(tempBattles, i);
                }
            } else if (tipo === 'medium') {
                if (i === 0) {
                    return addBattle(tempBattles, i);
                } else if (i > 0 && i <= 3) {
                    return addTrack(tempTracks, i);
                } else if (numPref === 2 || numPref === 3) {
                    if (i === 4) {
                        return addPref(randomPref, i);
                    } else if (i === 5) {
                        return addBattle(tempBattles, i);
                    } else if (i > 5 && i <= 8) {
                        return addTrack(tempTracks, i);
                    } else if (i > 8 && i <= (8 + (numPref - 1))) {
                        return addPref(randomPref, i);
                    } else {
                        setSwitchTracks(tempTracks);
                        return addBattle(tempBattles, i);
                    }
                } else if (numGioc === 4) {
                    if (i > 3 && i <= 5) {
                        return addPref(randomPref, i);
                    } else if (i === 6) {
                        return addBattle(tempBattles, i);
                    } else if (i > 6 && i <= 9) {
                        return addTrack(tempTracks, i);
                    } else if (i > 9 && i <= (9 + (numPref - 2))) {
                        return addPref(randomPref, i);
                    } else {
                        setSwitchTracks(tempTracks);
                        return addBattle(tempBattles, i);
                    }
                }
            } else {
                //tipo big
                if (i === 0) {
                    return addBattle(tempBattles, i);
                } else if (i > 0 && i <= 3) {
                    return addTrack(tempTracks, i);
                } else if (numPref === 3 || numPref === 4) {
                    if (i === 4) {
                        return addPref(randomPref, i);
                    } else if (i === 5) {
                        return addBattle(tempBattles, i);
                    } else if (i > 5 && i <= 8) {
                        return addTrack(tempTracks, i);
                    } else if (i === 9) {
                        return addPref(randomPref, i);
                    } else if (i === 10) {
                        return addBattle(tempBattles, i);
                    } else if (i > 10 && i <= 13) {
                        return addTrack(tempTracks, i);
                    } else if (i > 13 && i <= (13 + (numPref - 2))) {
                        return addPref(randomPref, i);
                    } else {
                        setSwitchTracks(tempTracks);
                        return addBattle(tempBattles, i);
                    }
                } else {
                    if (i === 4) {
                        return addBattle(tempBattles, i);
                    } else if (i > 4 && i <= 7) {
                        return addTrack(tempTracks, i);
                    } else if (i === 8) {
                        return addPref(randomPref, i);
                    } else if (i === 9) {
                        return addBattle(tempBattles, i);
                    } else if (i > 9 && i <= 12) {
                        return addTrack(tempTracks, i);
                    } else if (i === 13) {
                        return addPref(randomPref, i);
                    } else {
                        setSwitchTracks(tempTracks);
                        return addBattle(tempBattles, i);
                    }
                }
            };
            return null;
        }));
    }, [tipo, numGioc, battles, tracks]);

    return (
        <>
            <div className="row mt-2">
                <div className="col-6">
                    {myTournament && (
                        <ul className="p-1">
                            {myTournament.map((el, i) => <li className={"mytext " + el.type + " " + el.state + ((currentGameId === i) ? ' current' : '')} key={'tm-' + i}>{el.index + ". " + el.name + " (" + el.num + ")"}
                                <span>{" - " + ((el.type === 'battle') ? 'BATTAGLIA' : ((el.type === 'favorite') ? 'PREFERITA' : 'GARA'))}</span></li>)}
                        </ul>
                    )}
                </div>
                <div className="col-6">
                    <PointsManager end={end} players={players} setPlayers={setPlayers} myTournament={myTournament} currentGameId={currentGameId} setCurrentGameId={setCurrentGameId}></PointsManager>
                </div>
            </div>

            {((end) === (currentGameId)) && (
                <div className="col-12">
                    <p className="h5">{getWinner()}</p>
                    <p className="h5">{getBtWinner()}</p>
                    <p className="h5">{getTrWinner()}</p>
                </div>
            )}
        </>
    )
}