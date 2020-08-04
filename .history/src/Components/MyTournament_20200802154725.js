import React, { useEffect, useState } from 'react';

export default function MyTournament({ tipo, battles, tracks, pref }) {
    //in base al tipo crea il torneo...
    //il numero di preferite è la lunghezza di pref
    //il numero di battaglie è dato dal tipo
    //il numero di gare è dato dal tipo
    const [myTournament, setMyTournament] = useState([]);

    useEffect(() => {
        const numPref = pref.length;
        const numBattles = (tipo === 'small') ? 2 : ((tipo === 'medium') ? 3 : 4);
        const numTracks = (tipo === 'small') ? 3 : ((tipo === 'medium') ? 6 : 9);
        setMyTournament(Array(numPref + numBattles + numTracks).fill(null).map((el, i) => {
            return { [i]: el, state: 'uncomplete' };
        }));
        let temp = numPref + numBattles + numTracks
    }, [tipo,pref]);

    return (
        <>
            <ul>
                <li>Ok</li>
            </ul>
        </>
    )

}