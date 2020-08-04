import React from 'react';

export default function MyTournament({tipo, battles, tracks, pref}) {
    //in base al tipo crea il torneo...
    //il numero di preferite è la lunghezza di pref
    //il numero di battaglie è dato dal tipo
    //il numero di gare è dato dal tipo
    const numPref = pref.length;
    const numBattles = (tipo === 'small') ? 2 : ((tipo === 'medium') ? 3 : 4);
    const numTracks = (tipo === 'small') ? 3 : ((tipo === 'medium') ? 6 : 9);
    return(
        <>
            <ul>

            </ul>
        </>
    )

}