import React, { useState, useEffect } from 'react';
import MyModal from './MyModal.js';
import { getRandomInt } from '../utils';

export default function GameHelps({ names, numGioc, tipo, myTournament, setMyTournament, switchTracks, setSwitchTracks, currentGameId }) {
    const [arrayRiavviaSwitch, setArrayRiavviaSwitch] = useState(null);
    const [textModal, setTextModal] = useState("");
    const [clicksModal, setClicksModal] = useState(0);

    useEffect(() => {
        /*Scelta del numero di riavvia e switch per ogni tipo di torneo*/
        const tipoBig = { 'riavvia': 2, 'switch': 2 };
        const tipoMedium = { 'riavvia': 2, 'switch': 1 };
        const tipoSmall = { 'riavvia': 1, 'switch': 1 };
        const arrayNumGioc = [];
        names.forEach(() => {
            arrayNumGioc.push({
                riavvia: ((tipo === 'small') ? tipoSmall.riavvia :
                    ((tipo === 'medium') ? tipoMedium.riavvia : tipoBig.riavvia)),
                switch: ((tipo === 'small') ? tipoSmall.switch :
                    ((tipo === 'medium') ? tipoMedium.switch : tipoBig.switch))
            })
        });
        setArrayRiavviaSwitch(arrayNumGioc);
    }, []);

    const decrementSwitch = (i) => {
        //Switch solo se type è track
        if (switchTracks.length > 0) {
            if (myTournament[currentGameId].type === 'track') {
                const tempSw = [...switchTracks];
                let intTrack = getRandomInt(0, tempSw.length);
                let choice = tempSw[intTrack];
                tempSw.splice(intTrack, 1);
                setSwitchTracks(tempSw);

                const tempTourn = [...myTournament];
                tempTourn[currentGameId] =
                    { index: (currentGameId + 1), num: choice.id, name: choice.name, type: 'track', state: 'uncomplete', points: Array(numGioc).fill(null) };
                setMyTournament(tempTourn);

                if (arrayRiavviaSwitch[i].switch > 0) {
                    const temp = [...arrayRiavviaSwitch];
                    temp[i].switch -= 1;
                    setArrayRiavviaSwitch(temp);
                }
            } else {
                setClicksModal((prev)=>prev+1);
                setTextModal("Non è possibile effettuare Switch su una battaglia o su una gara preferita.");
                //alert("Non è possibile effettuare Switch su una battaglia o su una gara preferita.")
            }
        } else {
            //Per i tipi di torneo previsti finora questo non può accadere.
            alert("Errore durante lo switch, non è possibile effettuare lo switch");
        }

    }
    const transformSwitch = (i) => {
        if (arrayRiavviaSwitch[i].switch > 0) {
            const temp = [...arrayRiavviaSwitch];
            temp[i].switch -= 1;
            temp[i].riavvia += 2;
            setArrayRiavviaSwitch(temp);
        }
    }
    const decrementRiavvia = (i) => {
        if (myTournament[currentGameId].type === 'track' || myTournament[currentGameId].type === 'favorite') {
            if (arrayRiavviaSwitch[i].riavvia > 0) {
                const temp = [...arrayRiavviaSwitch];
                temp[i].riavvia -= 1;
                setArrayRiavviaSwitch(temp);
            }
        } else {
            setClicksModal((prev)=>prev+1);
            setTextModal("Non è possibile effettuare Riavvia su una battaglia.");
            //alert("Non è possibile effettuare Riavvia su una battaglia.")
        }
    }

    const superRiavvia = (i) => {
        if (myTournament[currentGameId].type === 'track' || myTournament[currentGameId].type === 'favorite') {
            if (arrayRiavviaSwitch[i].riavvia > 0) {
                const temp = [...arrayRiavviaSwitch];
                temp[i].riavvia -= 2;
                setArrayRiavviaSwitch(temp);
            }
        } else {
            setClicksModal((prev)=>prev+1);
            setTextModal("Non è possibile effettuare SuperRiavvia su una battaglia.");
            //alert("Non è possibile effettuare SuperRiavvia su una battaglia.")
        }
    }
    return (<>
        <div className="row">
            {arrayRiavviaSwitch && arrayRiavviaSwitch.map((pl, i) => {
                return (
                    <div key={'gHelp-' + i} className={"col-6 col-md-" + ((numGioc === 2) ? "6" : ((numGioc === 3) ? "4" : "3"))}>
                        <div key={'player-' + i} className="row">
                            <div className="col-12 h4">{names[i]}</div>
                            <div className="col-12 col-md-3">Riavvia: {pl.riavvia}</div>
                            <div className="col-12 col-md-9 mb-2">
                                <div className="row">
                                    <div className="col-6 p-1 mb-1">
                                        <button className="btn btn-sm btn-primary w-100 p-0" onClick={() => superRiavvia(i)} disabled={(pl.riavvia - 2) < 0}>SuperRiavvia</button>
                                    </div>
                                    <div className="col-6 p-1">
                                        <button className="btn btn-sm btn-primary w-100 p-0" onClick={() => decrementRiavvia(i)} disabled={pl.riavvia === 0}>Riavvia</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-3">Switch: {pl.switch}</div>
                            <div className="col-12 col-md-9 mb-2">
                                <div className="row">
                                    <div className="col-6 p-1 mb-1">
                                        <button className="btn btn-sm btn-primary w-100 p-0" onClick={() => transformSwitch(i)} disabled={pl.switch === 0}>{"1S => 2R"}</button>
                                    </div>
                                    <div className="col-6 p-1">
                                        <button className="btn btn-sm btn-primary w-100 p-0" onClick={() => decrementSwitch(i)} disabled={pl.switch === 0}>Switch</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        <MyModal clicksModal={clicksModal} text={textModal}></MyModal>
    </>)
}