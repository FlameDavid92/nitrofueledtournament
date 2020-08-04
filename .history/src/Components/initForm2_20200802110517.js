import React from 'react';

export default function InitForm2() {
    return (
        <>
            <div className="row justify-content-center">
                <div className="col-12 col-md-4">
                    <form onSubmit={setNomiPref}>
                        <div className="form-row text-center">
                            <div className="form-group col-12">
                                {Array(numGioc).fill(null).map((pl, i) => {
                                    return (
                                        <div key={"input-" + (i + 1)} className="mt-2">
                                            <input type="text" placeholder={"Nome giocatore " + (i + 1)} required></input>
                                            <select name={"inputStatePlayer-" + (i + 1)} id={"inputStatePlayer-" + (i + 1)}
                                                onChange={(e) => changeFavorite(e, i)} className="form-control text-center"
                                                defaultValue="" required>
                                                <option disabled hidden value="">{"Gara preferita del giocatore " + (i + 1)}</option>
                                                {nitroFueled.tracks.map(tr => {
                                                    return (<option key={"j-" + tr.id} value={tr.id}>{tr.id}. {tr.name}</option>)
                                                })}
                                            </select>
                                        </div>)
                                }
                                )}
                                <input className="btn btn-outline-primary mt-2" type="submit" value="Avanti" />
                            </div>
                        </div>
                    </form>
                    <MyImgs favoriteTracksImgs={favoriteTracks.map(idTrack => nitroFueled.tracks[idTrack].src)} />
                </div>
            </div>
        </>
    )
}