import React from 'react';

export default function MyImgs(favoriteTracks){

    return(
        <div className="row">
            {favoriteTracks.map((track, i)=>{
                return(
                    <div className="col-6">
                        <img className="img-fluid" src="" alt={"Immagine della gara preferita del giocatore"+(i+1)}/>
                    </div>
                )
            })}
        </div>
    )
}