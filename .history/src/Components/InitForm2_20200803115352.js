import React,{useState} from 'react';
import { Player } from '../utils';
import MyImgs from './MyImgs';

export default function InitForm2({ tracks, numGioc, setPlayers, setInitForm2 }) {
    const [favoriteTracks, setFavoriteTracks] = useState(Array(numGioc).fill(0));
    const setNomiPref = (e) => {
        e.preventDefault();
        const tempPlayers = Array(numGioc).fill(null);
        const tempFavs = Array(numGioc).fill(null);
        tempPlayers.forEach((pl, i) => {
            tempPlayers[i] = new Player(e.target[i * 2].value, e.target[(i * 2) + 1].value, 0, 0, 0);
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
        <div className="row justify-content-center">
            <div className="col-12 col-md-4">
                <form onSubmit={setNomiPref}>
                    <div className="form-row text-center">
                        <div className="form-group col-12">
                            {Array(numGioc).fill(null).map((pl, i) => {
                                return (
                                    <div key={"input-" + (i + 1)} className="mt-2">
                                        <input className="mb-2" type="text" placeholder={"Nome giocatore " + (i + 1)} required></input>
                                        <select name={"inputStatePlayer-" + (i + 1)} id={"inputStatePlayer-" + (i + 1)}
                                            onChange={(e) => changeFavorite(e, i)} className="form-control text-center"
                                            defaultValue="" required>
                                            <option disabled hidden value="">{"Gara preferita del giocatore " + (i + 1)}</option>
                                            {tracks.map(tr => {
                                                if (tr.id === 0 || favoriteTracks.some((fvTr, fvInd) => (tr.id === fvTr && fvInd !== i))) return <React.Fragment key={"j-" + tr.id}></React.Fragment>;
                                                else return (<option key={"j-" + tr.id} value={tr.id}>{tr.id}. {tr.name}</option>)
                                            })}
                                        </select>
                                    </div>)
                            }
                            )}
                            <input className="btn btn-outline-primary mt-2" type="submit" value="Avanti" />
                        </div>
                    </div>
                </form>
                <MyImgs favoriteTracksImgs={favoriteTracks.map(idTrack => tracks[idTrack].src)} />
            </div>
        </div>
    )
}