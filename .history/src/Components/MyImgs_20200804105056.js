import React,{useState} from 'react';

export default function MyImgs({favoriteTracksImgs}){
    const [checkLoad, setCheckLoad] = useState(true);
    return(
        <div className="row">
            {favoriteTracksImgs.map((src, i)=>{
                return(
                    <>
                    <div key={"t-"+i} className="col-6">
                        <img className={"img-fluid "+"d-none"} onLoad={()=>{setCheckLoad(false);}} src={src} alt={"Immagine della gara preferita del giocatore"+(i+1)}/>
                    </div>
                    </>
                )
            })}
        </div>
    )
}