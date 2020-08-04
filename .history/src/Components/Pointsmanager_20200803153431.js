import React from 'react';

export default function PointsManager({ players, currentGameId, setCurrentGameId }) {

    const inserisciPunti = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <div className="row justify-content-center">
                <div className="col-12 col-md-4">
                    <form onSubmit={inserisciPunti}>
                        <div className="form-row text-center">
                            <div className="form-group col-12">
                                {
                                    players.map((pl, i) => {
                                        return(
                                        <div key={"pt-pl-"+i}>
                                            <label htmlFor={"pt-pl-"+i}>Punti {pl.name}:</label>
                                            <select name="tipo" id={"pt-pl-"+i} className="form-control text-center" defaultValue="" required>
                                                <option disabled hidden value="">Inserisci il punteggio</option>
                                                {[1,2,3,4,5,6,7,8].map(el=><option value={el}>{el}</option>)}
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
        </>
    )
}