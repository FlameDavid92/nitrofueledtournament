import React, { useState, useEffect } from 'react';
import MyModal from './MyModal.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faAngleDoubleLeft, faRedoAlt, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { getRandomInt } from '../utils';

export default function GameHelps({ saveToLocalStorage, arrayRiavviaSwitch, setArrayRiavviaSwitch, names, numGioc, tipo, myTournament, setMyTournament, switchTracks, setSwitchTracks, currentGameId }) {
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

    const decrementSwitch = (i, nswitch) => {
        if (nswitch !== 0) {
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
                    setClicksModal((prev) => prev + 1);
                    setTextModal("Non è possibile effettuare Switch su una battaglia o su una gara preferita.");
                    //alert("Non è possibile effettuare Switch su una battaglia o su una gara preferita.")
                }
            } else {
                //Per i tipi di torneo previsti finora questo non può accadere.
                alert("Errore durante lo switch, non è possibile effettuare lo switch");
            }
        }

    }
    const transformSwitch = (i, nswitch) => {
        if (nswitch !== 0) {
            if (arrayRiavviaSwitch[i].switch > 0) {
                const temp = [...arrayRiavviaSwitch];
                temp[i].switch -= 1;
                temp[i].riavvia += 2;
                setArrayRiavviaSwitch(temp);
            }
        }
    }
    const decrementRiavvia = (i, nriavvia) => {
        if (nriavvia !== 0) {
            if (myTournament[currentGameId].type === 'track' || myTournament[currentGameId].type === 'favorite') {
                if (arrayRiavviaSwitch[i].riavvia > 0) {
                    const temp = [...arrayRiavviaSwitch];
                    temp[i].riavvia -= 1;
                    setArrayRiavviaSwitch(temp);
                }
            } else {
                setClicksModal((prev) => prev + 1);
                setTextModal("Non è possibile effettuare Riavvia su una battaglia.");
                //alert("Non è possibile effettuare Riavvia su una battaglia.")
            }
        }
    }

    const superRiavvia = (i, nriavvia) => {
        if ((nriavvia - 2) >= 0) {
            if (myTournament[currentGameId].type === 'track' || myTournament[currentGameId].type === 'favorite') {
                if (arrayRiavviaSwitch[i].riavvia > 0) {
                    const temp = [...arrayRiavviaSwitch];
                    temp[i].riavvia -= 2;
                    setArrayRiavviaSwitch(temp);
                }
            } else {
                setClicksModal((prev) => prev + 1);
                setTextModal("Non è possibile effettuare SuperRiavvia su una battaglia.");
                //alert("Non è possibile effettuare SuperRiavvia su una battaglia.")
            }
        }

    }
    return (<>
        <div className="row">
            {arrayRiavviaSwitch && arrayRiavviaSwitch.map((pl, i) => {
                return (
                    <div key={'gHelp-' + i} className="col-6 col-md-3">
                        <div key={'player-' + i} className="row">
                            <div className={"col-12 h4 m-0 player" + (i + 1) + "-italic"}>{names[i]}</div>

                            <div className="col-12 col-xl-6 my-label-sm">
                                <div className="row align-items-center m-0">
                                    <div className="col-6 p-0">
                                        Riavvia: {pl.riavvia}
                                    </div>
                                    <div className="col-3 p-0">
                                        <span className="my-icon-medium">
                                            <FontAwesomeIcon
                                                title="Riavvia"
                                                className={(pl.riavvia === 0) ? "my-icon-disabled" : "my-icon"}
                                                onClick={() => decrementRiavvia(i, pl.riavvia)}
                                                icon={faRedoAlt} />
                                        </span>
                                    </div>
                                    <div className="col-3 p-0">
                                        <span className="my-icon-medium">
                                            <FontAwesomeIcon
                                                title="SuperRiavvia"
                                                className={((pl.riavvia - 2) < 0) ? " my-icon-disabled" : " my-icon"}
                                                onClick={() => superRiavvia(i, pl.riavvia)}
                                                icon={faSyncAlt} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-xl-6 my-label-sm">
                                <div className="row align-items-center m-0">
                                    <div className="col-6 p-0">
                                        Switch: {pl.switch}
                                    </div>
                                    <div className="col-3 p-0">
                                        <span className="my-icon-medium">
                                            <FontAwesomeIcon
                                                title="Switch"
                                                className={(pl.switch === 0) ? "my-icon-disabled" : "my-icon"}
                                                onClick={() => decrementSwitch(i, pl.switch)}
                                                icon={faExchangeAlt} />
                                        </span>
                                    </div>
                                    <div className="col-3 p-0">
                                        <span className="my-icon-medium">
                                            <FontAwesomeIcon
                                                title="1 Switch => 2 Riavvia"
                                                className={(pl.switch === 0) ? " my-icon-disabled" : " my-icon"}
                                                onClick={() => transformSwitch(i, pl.switch)}
                                                icon={faAngleDoubleLeft} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        <MyModal clicksModal={clicksModal} text={textModal} title="ATTENZIONE"></MyModal>
    </>)
}