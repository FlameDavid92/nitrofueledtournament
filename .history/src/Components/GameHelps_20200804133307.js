import React, { useState, useEffect } from 'react';
import { getRandomInt } from '../utils';

export default function GameHelps({ names, numGioc, tipo, myTournament, setMyTournament, switchTracks, setSwitchTracks, currentGameId }) {
    const [arrayRiavviaSwitch, setArrayRiavviaSwitch] = useState(null);
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
            }else{
                alert("Non è possibile effettuare lo switch su una battaglia o su una gara preferita.")
            }
        } else {
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
        if (arrayRiavviaSwitch[i].riavvia > 0) {
            const temp = [...arrayRiavviaSwitch];
            temp[i].riavvia -= 1;
            setArrayRiavviaSwitch(temp);
        }
    }

    const superRiavvia = (i) => {
        if (arrayRiavviaSwitch[i].riavvia > 0) {
            const temp = [...arrayRiavviaSwitch];
            temp[i].riavvia -= 2;
            setArrayRiavviaSwitch(temp);
        }
    }
    return (<>
        <div className="row">
            {arrayRiavviaSwitch && arrayRiavviaSwitch.map((pl, i) => {
                return (
                    <div key={'gHelp-' + i} className={"col-" + ((numGioc === 2) ? "6" : ((numGioc === 3) ? "4" : "3"))}>
                        <div key={'player-' + i} className="row">
                            <div className="col-12 h4">{names[i]}</div>
                            <div className="col-12 col-md-3"><p>Riavvia: {pl.riavvia}</p></div>
                            <div className="col-12 col-md-9 mb-2">
                                <div className="row">
                                    <div className="col-12 col-md-6 pd-2 mb-1">
                                        <button className="btn btn-sm btn-primary w-100" onClick={() => superRiavvia(i)} disabled={(pl.riavvia - 2) < 0}>SuperRiavvia</button>
                                    </div>
                                    <div className="col-12 col-md-6 pd-2">
                                        <button className="btn btn-sm btn-primary w-100" onClick={() => decrementRiavvia(i)} disabled={pl.riavvia === 0}>Riavvia</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-3"><p>Switch: {pl.switch}</p></div>
                            <div className="col-12 col-md-9 mb-2">
                                <div className="row">
                                    <div className="col-12 col-md-6 pd-2 mb-1">
                                        <button className="btn btn-sm btn-primary w-100 small" onClick={() => transformSwitch(i)} disabled={pl.switch === 0}>1 Switch => 2 Riavvia</button>
                                    </div>
                                    <div className="col-12 col-md-6 pd-2">
                                        <button className="btn btn-sm btn-primary w-100" onClick={() => decrementSwitch(i)} disabled={pl.switch === 0}>Switch</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </>)
}