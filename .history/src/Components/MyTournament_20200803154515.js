import React, { useEffect, useState } from 'react';
import PointsManager from './Pointsmanager';
import { getRandomInt, shuffle } from '../utils';
import './mytournament.css';

export default function MyTournament({ tipo, numGioc, battles, tracks, players }) {
    //in base al tipo crea il torneo...
    //il numero di preferite è la lunghezza di pref
    //il numero di battaglie è dato dal tipo
    //il numero di gare è dato dal tipo
    const [myTournament, setMyTournament] = useState(null);
    const [currentGameId, setCurrentGameId] = useState(0);

    useEffect(() => {
        const numPref = numGioc;
        const numBattles = (tipo === 'small') ? 2 : ((tipo === 'medium') ? 3 : 4);
        const numTracks = (tipo === 'small') ? 3 : ((tipo === 'medium') ? 6 : 9);
        let temp = numPref + numBattles + numTracks;
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

        setMyTournament(Array(temp).fill(null).map((el, i) => {
            if (tipo === 'small') {
                if (i === 0) {
                    return addBattle(tempBattles, i);
                } else if (i > 0 && i <= 3) {
                    return addTrack(tempTracks, i);
                } else if (i > 3 && i <= 3 + numPref) {
                    return addPref(randomPref, i);
                } else {
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
                        return addBattle(tempBattles, i);
                    }
                }
            };
            return null;
        }));
    }, [players, tipo, numGioc, battles, tracks]);

    return (
        <>
            <div className="row">
                <div className="col-7">
                    {myTournament && (
                        <ul>
                            {myTournament.map((el, i) => <li className={"mytext "+el.type + " " + el.state + ((currentGameId === i) ? ' current' : '')} key={'tm-' + i}>{el.index + ". " + el.name + " (" + el.num + ")"}
                                <span className="nomobile">{" - "+ ((el.type === 'battle') ? 'BATTAGLIA' : ((el.type === 'favorite') ? 'PREFERITA' : 'GARA'))}</span></li>)}
                        </ul>
                    )}
                </div>
                <div className="col-5">
                    <PointsManager players={players} currentGameId={currentGameId} setCurrentGameId={setCurrentGameId}></PointsManager>
                </div>
            </div>

        </>
    )
}