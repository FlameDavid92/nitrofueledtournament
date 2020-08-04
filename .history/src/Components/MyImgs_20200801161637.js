import React from 'react';

export default function MyImgs(favoriteTracks){

    return(
        <div className="row">
            {favoriteTracks.map((track)=>{
                return(
                    <div className="col-6"></div>
                )
            })}
        </div>
    )
}