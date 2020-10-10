import React, { useState } from 'react';
import { Player } from '../utils';
import MyImgs from './MyImgs';

export default function InitForm2({ tracks, numGioc, setPlayers, setInitForm2 }) {
    const [favoriteTracks, setFavoriteTracks] = useState(Array(numGioc).fill(0));
    const setNomiPref = (e) => {
        e.preventDefault();
        const tempPlayers = Array(numGioc).fill(null);
        const tempFavs = Array(numGioc).fill(null);
        tempPlayers.forEach((pl, i) => {
            const nickName = (e.target[i * 2].value).split(' ');
            const name = (nickName[0].length > 10) ? nickName[0].substr(0, 8) : nickName[0];
            const plus = (nickName[1]) ? nickName[1].toUpperCase().charAt(0) : '';
            tempPlayers[i] = new Player(name + plus, tracks[e.target[(i * 2) + 1].value], 0, 0, 0);
        });
        setPlayers(tempPlayers);
        setFavoriteTracks(tempFavs);
        setInitForm2(false);
    }

    const changeFavorite = (e, index) => {
        favoriteTracks[index] = parseInt(e.target.value);
        setFavoriteTracks([...favoriteTracks]);
    }

    return (
        <div className="row m-0 justify-content-center align-items-center h-75">
            <div className="col-12 col-md-4 p-0">
                <div className="row m-0">
                    <div className="col-12 p-0">
                        <form onSubmit={setNomiPref}>
                            <div className="form-row text-center justify-content-center">
                                {Array(numGioc).fill(null).map((pl, i) => {
                                    return (
                                        <div key={"newpl-"+i} className="form-group col-6">
                                            <div key={"input-" + (i + 1)} className="mt-2">
                                                <input className="form-control form-control-sm mb-1" type="text" placeholder={"Nome giocatore " + (i + 1)} required></input>
                                                <select name={"inputStatePlayer-" + (i + 1)} id={"inputStatePlayer-" + (i + 1)}
                                                    onChange={(e) => changeFavorite(e, i)} className="form-control form-control-sm text-center"
                                                    defaultValue="" required>
                                                    <option disabled hidden value="">{"Gara preferita del giocatore " + (i + 1)}</option>
                                                    {tracks.map(tr => {
                                                        if (tr.id === 0 || favoriteTracks.some((fvTr, fvInd) => (tr.id === fvTr && fvInd !== i))) return <React.Fragment key={"j-" + tr.id}></React.Fragment>;
                                                        else return (<option key={"j-" + tr.id} value={tr.id}>{tr.id}. {tr.name}</option>)
                                                    })}
                                                </select>
                                            </div>
                                        </div>)
                                })}
                                <input className="btn btn-secondary mt-1" type="submit" value="Avanti" />
                            </div>
                        </form>
                    </div>
                    <div className="col-12 mt-4 p-0">
                        <MyImgs favoriteTracksImgs={favoriteTracks.map(idTrack => tracks[idTrack].src)} />
                    </div>
                </div>
            </div>
        </div>
    )
}