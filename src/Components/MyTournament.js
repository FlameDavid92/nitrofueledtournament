import React, { useEffect, useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faHistory } from '@fortawesome/free-solid-svg-icons';
import PointsManager from './PointsManager';
import MyModal from './MyModal.js';
import MyModal2 from './MyModal2.js';
import GameHelps from './GameHelps';
import { getRandomInt, Player, shuffle } from '../utils';
import { saveAs } from 'file-saver';

export default function MyTournament({goToHome, setAudio, setInitForm, setInitForm2, setTournamentName, setNumGioc, setTipo, setPlayers, tournamentName, load, tipo, numGioc, battles, tracks, players }) {
    const [currentGameId, setCurrentGameId] = useState(0);
    const [myTournament, setMyTournament] = useState(null);
    const [switchTracks, setSwitchTracks] = useState([]);
    const [pointsChangeId, setPointsChangeId] = useState(0);


    const [arrayRiavviaSwitch, setArrayRiavviaSwitch] = useState(null);

    const [endGame, setEndGame] = useState(false);

    const numPref = numGioc;
    const numBattles = (tipo === 'small') ? 2 : ((tipo === 'medium') ? 3 : 4);
    const numTracks = (tipo === 'small') ? 3 : ((tipo === 'medium') ? 6 : 9);
    const end = numPref + numBattles + numTracks;

    const [clicksModal, setClicksModal] = useState(0);
    const [clicksModal2, setClicksModal2] = useState(0);
    const [textModal, setTextModal] = useState("");

    const saveInFile = () => {
        var blob = new Blob([window.localStorage.getItem("nitrofueledtournament")],
                { type: "text/plain;charset=utf-8" });
            saveAs(blob, tournamentName+".txt");
    }

    const saveToLocalStorage = () => {
        window.localStorage.setItem("nitrofueledtournament",JSON.stringify({
            tournamentName: tournamentName,
            numGioc: numGioc,
            tipo: tipo,
            players: players,
            currentGameId: currentGameId,
            myTournament: myTournament,
            switchTracks: switchTracks,
            pointsChangeId: pointsChangeId,
            clicksModal: clicksModal,
            clicksModal2: clicksModal2,
            textModal: textModal,
            arrayRiavviaSwitch: arrayRiavviaSwitch,
            endGame: endGame
        }));
    }

    const modificaPunteggi = (i) => {
        setPointsChangeId(i);
        setClicksModal2((prev) => prev + 1);
    }

    const openModalTempoPoints = () => {
        let txt = "";
        players.forEach(pl => {
            txt += pl.name + "= tot:" + pl.getTotalPoints() + " battaglie:" + pl.battlePoints + " gare:" + pl.trackPoints + ";";
        });
        setTextModal(txt);
        setClicksModal((prev) => prev + 1);

        /*
        txt += util.getWinner(players) + ";";
            txt += util.getBtWinner(players) + ";";
            txt += util.getTrWinner(players) + ";";
        */
    };

    const playlistRef = useRef(null); 
    useEffect(()=>{
        if(playlistRef.current){
            let myElements = document.getElementsByClassName('prev-current');
            let topPos = myElements[0].offsetTop;
            playlistRef.current.scrollTop = topPos;
        };
        currentGameId && saveToLocalStorage();
    },[currentGameId])

    useEffect(()=>{
        arrayRiavviaSwitch && saveToLocalStorage();
    },[arrayRiavviaSwitch])

    useEffect(() => {
        myTournament && saveToLocalStorage();
    }, [myTournament])

    useEffect(() => {
        if(load){
            let loaded = JSON.parse(window.localStorage.getItem("nitrofueledtournament"));
            console.log("loaded: ",loaded);
            setTournamentName(loaded.tournamentName);
            setNumGioc(loaded.numGioc);
            setTipo(loaded.tipo);
            setEndGame(loaded.endGame);
            
            setPlayers(loaded.players.map(pl => new Player(pl.name, pl.favoriteTrack, pl.battlePoints, pl.trackPoints)));

            setCurrentGameId(loaded.currentGameId);
            setMyTournament(loaded.myTournament);
            setSwitchTracks(loaded.switchTracks);
            setPointsChangeId(loaded.pointsChangeId);

            setClicksModal(0);
            setClicksModal2(0);
            setTextModal("");

            setArrayRiavviaSwitch(loaded.arrayRiavviaSwitch);

            return;
        }

        let tempBattles = [...battles];
        tempBattles.shift();
        let tempTracks = [...tracks];
        tempTracks.shift();
        let randomPref = players.map(pl => { return { num: pl.favoriteTrack.id, name: pl.favoriteTrack.name, player: pl.name } });
        shuffle(randomPref);

        const addBattle = (battles, i) => {
            let intBattle = getRandomInt(0, battles.length);
            let choice = battles[intBattle];
            battles.splice(intBattle, 1);
            return { index: i + 1, num: choice.id, name: choice.name, type: 'battle', state: 'uncomplete', points: Array(numGioc).fill(null) };
        }

        const addTrack = (tracks, i) => {
            let intTrack = getRandomInt(0, tracks.length);
            let choice = tracks[intTrack];
            tracks.splice(intTrack, 1);
            return { index: i + 1, num: choice.id, name: choice.name, type: 'track', state: 'uncomplete', points: Array(numGioc).fill(null) };
        }

        const addPref = (randomPref, i) => {
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
    }, []);

    return (
        <>
            {!endGame && <GameHelps saveToLocalStorage={saveToLocalStorage} arrayRiavviaSwitch={arrayRiavviaSwitch} setArrayRiavviaSwitch={setArrayRiavviaSwitch} names={players.map((pl) => pl.name)} numGioc={numGioc} tipo={tipo} switchTracks={switchTracks} setSwitchTracks={setSwitchTracks} myTournament={myTournament} setMyTournament={setMyTournament} currentGameId={currentGameId}></GameHelps>}
            <div className="row mt-2">
                <div className="col-12 col-md-6 p-0">
                    {myTournament && (
                        <div ref={playlistRef} className="playlist">
                            <div className="row m-0">
                                <div className="col-12">
                                    <table className="table table-sm table-dark">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Nome</th>
                                                <th scope="col">Tipo</th>
                                                <th scope="col">Punti</th>
                                                <th scope="col"><FontAwesomeIcon icon={faHistory} /></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {myTournament.map((el, i) =>
                                                <tr className={el.type + " " + el.state + ((currentGameId === i) ? ' current' : (((currentGameId - 1) === i) ? ' prev-current' : ''))} key={'tm-' + el.index}>
                                                    <th className="align-middle" scope="row">{el.index}</th>
                                                    <td className="align-middle">{el.name/*+" (" + el.num + ")"*/}</td>
                                                    <td className="align-middle">{((el.type === 'battle') ? 'BATTAGLIA' : ((el.type === 'favorite') ? 'PREFERITA' : 'GARA'))}</td>
                                                    <td className="align-middle">{(el.points[0]) && <p className="mb-0">{players.map((p, indp) => " " + p.name.slice(0, 3) + " " + el.points[indp])}</p>}</td>
                                                    <td className="align-middle">{(el.points[0] && !endGame) && <FontAwesomeIcon className="my-icon" onClick={() => { modificaPunteggi(i) }} icon={faPencilAlt} />}</td>
                                                </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-12 col-md-6 mt-2">
                    <PointsManager openModalTempoPoints={openModalTempoPoints} end={end} players={players} setPlayers={setPlayers} myTournament={myTournament} setMyTournament={setMyTournament} currentGameId={currentGameId} setCurrentGameId={setCurrentGameId} endGame={endGame} setEndGame={setEndGame}></PointsManager>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <button onClick={goToHome} type="button" className="btn btn-secondary w-100 mt-5 mb-3">Nuovo torneo</button>
                </div>
                <div className="col-12 col-md-6">
                    <button onClick={saveInFile} type="button" className="btn btn-secondary w-100 mb-3 mt-md-5">Salva torneo</button>
                </div>
            </div>
            <MyModal clicksModal={clicksModal} text={textModal} title={((end === currentGameId) ? "Punteggi finali" : "Punteggi parziali")}></MyModal>
            <MyModal2 title="Modifica Punti" myTournament={myTournament ? myTournament : []} setMyTournament={setMyTournament} pointsChangeId={pointsChangeId} players={players} setPlayers={setPlayers} clicksModal2={clicksModal2}></MyModal2>
        </>
    )
}