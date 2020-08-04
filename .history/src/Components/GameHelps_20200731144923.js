import React, { useState, useEffect } from 'react';

export default function GameHelps({names, numGioc, tipo }) {
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
        if (arrayRiavviaSwitch[i].switch > 0) {
            const temp = [...arrayRiavviaSwitch];
            temp[i].switch -= 1;
            setArrayRiavviaSwitch(temp);
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
                    <div className={"col-"+ ( (numGioc === "2") ? "6" : ( (numGioc==="3") ? "4":"3" ) )}>
                        <div key={'player-' + i} className="row">
                            <div className="col-12 h4">{names[i]}</div>
                            <div className="col-12 col-md-3"><p>Riavvia: {pl.riavvia}</p></div>
                            <div className="col-12 col-md-9 mb-2">
                                <div className="row">
                                    <div className="col-12 col-md-6 pd-2 mb-1">
                                        <button className="btn btn-sm btn-primary w-100" onClick={() => superRiavvia(i)} disabled={(pl.riavvia - 2) < 0}>SuperRiavvia</button>
                                    </div>
                                    <div className="col-12 col-md-6 pd-2">
                                        <button className="btn btn-sm btn-primary w-100" onClick={() => decrementRiavvia(i)} disabled={pl.riavvia === 0}>UsaRiavvia</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-3"><p>Switch: {pl.switch}</p></div>
                            <div className="col-12 col-md-9 mb-2">
                                <div className="row">
                                    <div className="col-12 col-md-6 pd-2 mb-1">
                                        <button className="btn btn-sm btn-primary w-100" onClick={() => transformSwitch(i)} disabled={pl.switch === 0}>Cambia</button>
                                    </div>
                                    <div className="col-12 col-md-6 pd-2">
                                        <button className="btn btn-sm btn-primary w-100" onClick={() => decrementSwitch(i)} disabled={pl.switch === 0}>UsaSwitch</button>
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