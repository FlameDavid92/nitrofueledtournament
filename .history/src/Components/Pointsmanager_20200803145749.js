import React from 'react';

export default function PointsManager({ players, currentGameId, setCurrentGameId }) {

    const inserisciPunti = ()=>{
        
    }
    return (
        <>
            <div className="row justify-content-center">
                <div className="col-12 col-md-4">
                    <form onSubmit={inserisciPunti}>
                        <div className="form-row text-center">
                            <div className="form-group col-12">
                                <label htmlFor="inputState1">Tipologia torneo:</label>
                                <select name="tipo" id="inputState1" className="form-control text-center" defaultValue="" required>
                                    <option disabled hidden value="">Scegli il tipo di torneo</option>
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="big">Big</option>
                                </select>
                                <div className="mt-2">
                                    <label htmlFor="inputState2">Numero giocatori:</label>
                                    <select name="numGioc" id="inputState2" className="form-control text-center" defaultValue="" required>
                                        <option disabled hidden value="">Scegli il numero di giocatori</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <input className="btn btn-outline-primary mt-2" type="submit" value="Avanti" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}