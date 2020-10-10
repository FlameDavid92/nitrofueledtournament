import React, { useEffect } from 'react';

export default function MyImgs({ favoriteTracksImgs }) {
    useEffect(() => {
        favoriteTracksImgs.forEach((picture) => {
            const img = new Image();
            img.src = picture.fileName;
        });
    }, []);
    return (
        <div className="preftracks mb-2 shadow">
            <div className="row m-0 justify-content-center">
                {favoriteTracksImgs.map((src, i) => {
                    return (
                        <div key={i} className="col-6 w-100 h-100 p-2">
                            <img className={"img-fluid trackimg "+((i===0)?'b-blue':((i===1)?'b-red':((i===2)?'b-green':'b-purple')))} src={src} alt={"Logo pista preferita del giocatore "+(i+1)}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}